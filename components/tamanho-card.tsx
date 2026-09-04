"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface TamanhoCardProps {
  tamanho: string;
  preco: number;
  precoOriginal?: number;
  selecionado: boolean;
  onClick: () => void;
  imagemSrc: string;
}

export function TamanhoCard({
  tamanho,
  preco,
  precoOriginal,
  selecionado,
  onClick,
  imagemSrc,
}: TamanhoCardProps) {
  const promocao = precoOriginal !== undefined && precoOriginal > preco;

  return (
    <button
      type="button"
      aria-pressed={selecionado}
      onClick={onClick}
      className={cn(
        "relative flex min-h-[220px] flex-col items-center rounded-3xl border-2 px-3 pb-5 pt-6 text-center transition-colors sm:min-h-[250px] sm:px-4",
        selecionado
          ? "border-brand-green bg-brand-green/10"
          : "border-white/15 bg-white/[0.04]",
      )}
    >
      {selecionado && (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand-green text-white">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      )}

      {promocao && (
        <span className="absolute left-3 top-3 rounded-full bg-brand-green px-2.5 py-1 text-[11px] font-bold text-white">
          Oferta
        </span>
      )}

      <div className="relative h-[120px] w-full sm:h-[148px]">
        <Image
          src={imagemSrc}
          alt={`Açaí ${tamanho}`}
          fill
          sizes="(max-width: 640px) 50vw, 500px"
          className="object-contain"
        />
      </div>

      <strong className="mt-4 text-lg font-extrabold uppercase tracking-wide text-white">
        {tamanho.replace("ml", " ML")}
      </strong>

      {promocao && (
        <span className="mt-1 text-sm text-white/45 line-through">
          R$ {precoOriginal!.toFixed(2).replace(".", ",")}
        </span>
      )}

      <span className="mt-1 text-lg font-extrabold text-brand-green">
        R$ {preco.toFixed(2).replace(".", ",")}
      </span>
    </button>
  );
}
