"use client";

import { useState } from "react";
import { TamanhoCard } from "@/components/tamanho-card";
import { ComplementoCard } from "@/components/complemento-card";
import { CremeCard } from "@/components/creme-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface Tamanho {
  id: string;
  tamanho: string;
  preco: number;
  precoPromocional?: number | null;
  precoBase: number;
  imagemSrc: string;
}

interface AcaiBuilderProps {
  tamanhos: Tamanho[];
  cremes: string[];
  complementos: string[];
  onAddToCart: (acai: {
    tamanho: string;
    tamanhoLabel: string;
    preco: number;
    creme: string;
    complementos: string[];
    observacao: string;
  }) => void;
  promocaoAtiva: boolean;
}

export function AcaiBuilder({
  tamanhos,
  cremes,
  complementos,
  onAddToCart,
  promocaoAtiva,
}: AcaiBuilderProps) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("");
  const [cremeSelecionado, setCremeSelecionado] = useState<string>("");
  const [complementosSelecionados, setComplementosSelecionados] = useState<
    string[]
  >([]);
  const [observacao, setObservacao] = useState("");

  const qtdExtras = Math.max(0, complementosSelecionados.length - 3);
  const custoExtras = qtdExtras * 1.0;

  const tamanhoObj = tamanhos.find((t) => t.id === tamanhoSelecionado);
  const precoTamanho = tamanhoObj
    ? promocaoAtiva && tamanhoObj.precoPromocional
      ? tamanhoObj.precoPromocional
      : tamanhoObj.preco
    : 0;
  const precoTotalItem = precoTamanho + custoExtras;

  const handleComplementoToggle = (complemento: string) => {
    if (complementosSelecionados.includes(complemento)) {
      setComplementosSelecionados(
        complementosSelecionados.filter((c) => c !== complemento)
      );
    } else {
      setComplementosSelecionados([...complementosSelecionados, complemento]);
    }
  };

  const handleCremeToggle = (creme: string) => {
    setCremeSelecionado(cremeSelecionado === creme ? "" : creme);
  };

  const handleAddToCart = () => {
    if (!tamanhoSelecionado) return;

    onAddToCart({
      tamanho: tamanhoObj!.id,
      tamanhoLabel: tamanhoObj!.tamanho,
      preco: precoTamanho,
      creme: cremeSelecionado,
      complementos: complementosSelecionados,
      observacao,
    });

    setTamanhoSelecionado("");
    setCremeSelecionado("");
    setComplementosSelecionados([]);
    setObservacao("");
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-5">
        <div className="mb-4 pb-3 border-b border-white/10">
          <h2 className="text-lg font-bold text-yellow-400">
            Escolha o tamanho
          </h2>
          <p className="text-white/60 text-sm">
            Selecione o tamanho do seu açaí
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tamanhos.map((tamanho) => {
            const isPromo = promocaoAtiva && tamanho.precoPromocional;
            return (
              <TamanhoCard
                key={tamanho.id}
                tamanho={tamanho.tamanho}
                preco={isPromo ? tamanho.precoPromocional! : tamanho.preco}
                precoOriginal={
                  isPromo && tamanho.precoPromocional
                    ? tamanho.precoBase
                    : undefined
                }
                selecionado={tamanhoSelecionado === tamanho.id}
                onClick={() => setTamanhoSelecionado(tamanho.id)}
                imagemSrc={tamanho.imagemSrc}
              />
            );
          })}
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="mb-4 pb-3 border-b border-white/10">
          <h2 className="text-lg font-bold text-yellow-400">Escolha o creme</h2>
          <p className="text-white/60 text-sm">Selecione uma opção</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CremeCard
            creme="Açaí sem ninho"
            selecionado={cremeSelecionado === "Açaí sem ninho"}
            onClick={() => handleCremeToggle("Açaí sem ninho")}
          />
          {cremes.map((creme) => (
            <CremeCard
              key={creme}
              creme={creme}
              selecionado={cremeSelecionado === creme}
              onClick={() => handleCremeToggle(creme)}
            />
          ))}
        </div>
      </div>

      <div
        className={`glass-card p-5 transition-colors duration-300 ${
          qtdExtras > 0 ? "border-yellow-400/50 bg-yellow-400/5" : ""
        }`}
      >
        <div className="flex justify-between items-start mb-4 pb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-yellow-400">Complementos</h2>
            <p className="text-white/60 text-sm">
              Escolha até 3 complementos.{" "}
              <span className="text-yellow-400 font-bold bg-yellow-400/10 px-1 rounded">
                Mais de 3 complementos +R$ 1,00 cada
              </span>
            </p>
          </div>
          <div className="text-right">
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                qtdExtras > 0
                  ? "bg-red-500 text-white shadow-lg animate-pulse"
                  : "bg-yellow-400 text-purple-900"
              }`}
            >
              {complementosSelecionados.length}/3
            </span>
            {qtdExtras > 0 && (
              <span className="text-xs text-yellow-400 font-bold block mt-1">
                Taxa Extra Ativa!
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {complementos.map((complemento) => (
            <ComplementoCard
              key={complemento}
              complemento={complemento}
              selecionado={complementosSelecionados.includes(complemento)}
              desabilitado={false}
              badge={
                complementosSelecionados.length >= 3 ? "+ R$ 1,00" : undefined
              }
              onClick={() => handleComplementoToggle(complemento)}
            />
          ))}
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="mb-3">
          <h2 className="text-base font-bold text-yellow-400">Observações</h2>
          <p className="text-white/60 text-xs">(Opcional)</p>
        </div>
        <Textarea
          placeholder="Ex: Pouco creme de ninho..."
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className="glass-input h-24 pt-3 resize-none w-full"
        />
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={!tamanhoSelecionado}
        className="btn-gold w-full h-16 font-bold text-lg shadow-lg flex flex-col items-center justify-center gap-0 disabled:opacity-50"
      >
        <div className="flex items-center gap-2">
          <Plus className="h-5 w-5" strokeWidth={3} />
          <span>ADICIONAR AO PEDIDO</span>
        </div>
        {tamanhoSelecionado && (
          <span className="text-xs font-black text-purple-900 bg-white/20 px-3 py-0.5 rounded-full mt-1">
            Total deste item: R$ {precoTotalItem.toFixed(2)}
          </span>
        )}
      </Button>
    </div>
  );
}
