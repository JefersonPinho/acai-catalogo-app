"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { TamanhoCard } from "@/components/tamanho-card";
import { ComplementoCard } from "@/components/complemento-card";
import { CremeCard } from "@/components/creme-card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Tamanho {
  id: string;
  tamanho: string;
  preco: number;
  precoPromocional?: number | null;
  precoBase: number;
  imagemSrc: string;
}

interface Complemento {
  nome: string;
  imagemSrc: string;
}

interface AcaiBuilderProps {
  tamanhos: Tamanho[];
  cremes: string[];
  complementos: Complemento[];
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

function StepHeader({
  number,
  title,
  extra,
}: {
  number: number;
  title: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="step-number">{number}</span>

        <h2 className="text-base font-extrabold tracking-[-0.025em] text-white sm:text-lg">
          {title}
        </h2>
      </div>

      {extra}
    </div>
  );
}

export function AcaiBuilder({
  tamanhos,
  cremes,
  complementos,
  onAddToCart,
}: AcaiBuilderProps) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");

  const [cremeSelecionado, setCremeSelecionado] = useState("");

  const [complementosSelecionados, setComplementosSelecionados] = useState<
    string[]
  >([]);

  const [observacao, setObservacao] = useState("");

  const quantidadeExtras = Math.max(0, complementosSelecionados.length - 3);

  const custoExtras = quantidadeExtras;

  const tamanhoObj = tamanhos.find((item) => item.id === tamanhoSelecionado);

  const precoTamanho = tamanhoObj?.preco ?? 0;

  const precoTotalItem = precoTamanho + custoExtras;

  const handleComplementoToggle = (complemento: string) => {
    setComplementosSelecionados((prev) => {
      if (prev.includes(complemento)) {
        return prev.filter((item) => item !== complemento);
      }

      return [...prev, complemento];
    });
  };

  const handleAddToCart = () => {
    if (!tamanhoSelecionado || !tamanhoObj) {
      return;
    }

    onAddToCart({
      tamanho: tamanhoObj.id,
      tamanhoLabel: tamanhoObj.tamanho,
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
    <div className="builder-flow">
      <section className="step-section">
        <StepHeader number={1} title="Escolha o tamanho" />

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {tamanhos.map((tamanho) => {
            const temPromocao =
              tamanho.precoPromocional !== null &&
              tamanho.precoPromocional !== undefined &&
              tamanho.preco < tamanho.precoBase;

            return (
              <TamanhoCard
                key={tamanho.id}
                tamanho={tamanho.tamanho}
                preco={tamanho.preco}
                precoOriginal={temPromocao ? tamanho.precoBase : undefined}
                selecionado={tamanhoSelecionado === tamanho.id}
                onClick={() => setTamanhoSelecionado(tamanho.id)}
                imagemSrc={tamanho.imagemSrc}
              />
            );
          })}
        </div>
      </section>

      <section className="step-section">
        <StepHeader number={2} title="Escolha o creme" />

        <div className="grid grid-cols-2 gap-3">
          <CremeCard
            creme="Açaí Tradicional"
            selecionado={cremeSelecionado === "Açaí Tradicional"}
            onClick={() => setCremeSelecionado("Açaí Tradicional")}
          />

          {cremes.map((creme) => (
            <CremeCard
              key={creme}
              creme={creme}
              selecionado={cremeSelecionado === creme}
              onClick={() => setCremeSelecionado(creme)}
            />
          ))}
        </div>
      </section>

      <section className="step-section">
        <StepHeader
          number={3}
          title="Complementos"
          extra={
            <span
              className={
                quantidadeExtras > 0
                  ? "flex min-w-8 items-center justify-center rounded-full bg-[#e9b84b] px-2.5 py-1 text-xs font-black text-[#1d071f]"
                  : "flex min-w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs font-bold text-white/60"
              }
            >
              {complementosSelecionados.length}
            </span>
          }
        />

        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-white/[0.065] bg-black/[0.08] px-3.5 py-3">
          <div>
            <span className="block text-xs font-semibold text-white/65">
              3 complementos inclusos
            </span>

            <span className="mt-0.5 block text-[10px] text-white/30">
              Escolha seus favoritos
            </span>
          </div>

          <span className="shrink-0 rounded-lg bg-[#e9b84b]/[0.07] px-2.5 py-1.5 text-[10px] font-bold text-[#efc96e] sm:text-xs">
            Extras + R$ 1,00
          </span>
        </div>

        {quantidadeExtras > 0 && (
          <div className="mb-4 flex items-center justify-between rounded-xl border border-[#e9b84b]/10 bg-[#e9b84b]/[0.05] px-3.5 py-2.5">
            <span className="text-xs text-white/55">
              {quantidadeExtras}{" "}
              {quantidadeExtras === 1
                ? "complemento extra"
                : "complementos extras"}
            </span>

            <strong className="text-xs text-[#efc96e]">
              + R$ {custoExtras.toFixed(2).replace(".", ",")}
            </strong>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {complementos.map((complemento) => {
            const selectedIndex = complementosSelecionados.indexOf(
              complemento.nome,
            );

            const selecionado = selectedIndex !== -1;

            const extraSelecionado = selecionado && selectedIndex >= 3;

            const seraExtra =
              !selecionado && complementosSelecionados.length >= 3;

            return (
              <ComplementoCard
                key={complemento.nome}
                complemento={complemento.nome}
                imagemSrc={complemento.imagemSrc}
                selecionado={selecionado}
                desabilitado={false}
                badge={extraSelecionado || seraExtra ? "+ R$ 1" : undefined}
                onClick={() => handleComplementoToggle(complemento.nome)}
              />
            );
          })}
        </div>
      </section>

      <section className="step-section">
        <StepHeader number={4} title="Observações" />

        <Textarea
          placeholder="Ex.: pouco creme, sem granola..."
          value={observacao}
          maxLength={250}
          onChange={(event) => setObservacao(event.target.value)}
          className="glass-input min-h-[86px] resize-none pt-3"
        />

        <p className="mt-1.5 text-right text-[10px] text-white/25">
          {observacao.length}/250
        </p>
      </section>

      <div className="pt-1">
        <Button
          type="button"
          onClick={handleAddToCart}
          disabled={!tamanhoSelecionado}
          className="btn-gold min-h-[64px] w-full"
        >
          <div className="flex w-full items-center justify-between gap-3 px-1">
            <span className="flex items-center gap-2 text-sm font-black sm:text-base">
              <Plus className="h-5 w-5" strokeWidth={3} />
              Adicionar ao pedido
            </span>

            {tamanhoSelecionado && (
              <span className="rounded-lg bg-[#210725] px-3 py-2 text-sm font-black text-[#f5cd72]">
                R$ {precoTotalItem.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
}
