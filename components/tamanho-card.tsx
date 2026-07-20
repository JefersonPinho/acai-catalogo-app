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
        "relative min-h-[176px] overflow-hidden rounded-2xl border p-3 transition-colors sm:min-h-[215px] sm:p-4",
        selecionado
          ? "border-[#e9b84b] bg-[#e9b84b]/[0.045]"
          : "border-white/[0.07] bg-black/[0.055]",
      )}
    >
      {selecionado && (
        <span className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#e9b84b] text-[#1d071f]">
          <Check className="h-4 w-4" strokeWidth={3.5} />
        </span>
      )}

      {promocao && (
        <span className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#e9b84b] px-2 py-1 text-[8px] font-black uppercase text-[#1d071f]">
          Oferta
        </span>
      )}

      <div className="flex h-full flex-col items-center justify-end">
        <div className="relative h-[98px] w-full sm:h-[130px]">
          <Image
            src={imagemSrc}
            alt={`Açaí ${tamanho}`}
            fill
            sizes="(max-width: 640px) 50vw, 500px"
            className="object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,0.24)]"
          />
        </div>

        <strong className="mt-1 text-lg font-black text-white sm:text-xl">
          {tamanho}
        </strong>

        {promocao && (
          <span className="text-[10px] text-white/30 line-through">
            R$ {precoOriginal!.toFixed(2).replace(".", ",")}
          </span>
        )}

        <span className="mt-0.5 text-base font-black text-[#e9b84b] sm:text-lg">
          R$ {preco.toFixed(2).replace(".", ",")}
        </span>
      </div>
    </button>
  );
}
