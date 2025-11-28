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

  const handleComplementoToggle = (complemento: string) => {
    if (complementosSelecionados.includes(complemento)) {
      setComplementosSelecionados(
        complementosSelecionados.filter((c) => c !== complemento)
      );
    } else if (complementosSelecionados.length < 3) {
      setComplementosSelecionados([...complementosSelecionados, complemento]);
    }
  };

  const handleCremeToggle = (creme: string) => {
    setCremeSelecionado(cremeSelecionado === creme ? "" : creme);
  };

  const handleAddToCart = () => {
    if (!tamanhoSelecionado) return;

    const tamanho = tamanhos.find((t) => t.id === tamanhoSelecionado);
    if (!tamanho) return;

    const precoFinal =
      promocaoAtiva && tamanho.precoPromocional
        ? tamanho.precoPromocional
        : tamanho.preco;

    onAddToCart({
      tamanho: tamanho.id,
      tamanhoLabel: tamanho.tamanho,
      preco: precoFinal,
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
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-yellow-400 mb-1">
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

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-yellow-400 mb-1">
            Escolha o creme
          </h2>
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

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-yellow-400 mb-1">
              Complementos
            </h2>
            <p className="text-white/60 text-sm">Escolha até 3 complementos</p>
          </div>
          <div className="bg-yellow-400/10 border border-yellow-400/30 px-4 py-2 rounded-lg">
            <span className="text-yellow-400 font-bold text-sm">
              {complementosSelecionados.length}/3
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {complementos.map((complemento) => (
            <ComplementoCard
              key={complemento}
              complemento={complemento}
              selecionado={complementosSelecionados.includes(complemento)}
              desabilitado={
                complementosSelecionados.length >= 3 &&
                !complementosSelecionados.includes(complemento)
              }
              onClick={() => handleComplementoToggle(complemento)}
            />
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-yellow-400 mb-1">
            Observações
          </h2>
          <p className="text-white/60 text-sm">(opcional)</p>
        </div>
        <Textarea
          placeholder="Ex: Pouco creme de ninho, bem gelado..."
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40 min-h-24 resize-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 transition-all rounded-xl"
        />
      </div>

      <Button
        onClick={handleAddToCart}
        disabled={!tamanhoSelecionado}
        size="lg"
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold text-lg py-7 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:shadow-lg"
      >
        <Plus className="mr-2 h-6 w-6" />
        Adicionar ao Pedido
      </Button>
    </div>
  );
}
