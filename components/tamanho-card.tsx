"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

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
  const temPromocao = precoOriginal !== undefined && precoOriginal > preco;
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-full relative p-6 sm:p-8 rounded-2xl transition-all duration-300 group overflow-hidden flex flex-col",
        "hover:scale-[1.05] active:scale-[0.97]",
        selecionado
          ? "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl shadow-yellow-500/30"
          : "bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:border-yellow-400/60 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/20"
      )}
    >
      {temPromocao && (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-20">
          Promoção de domingo
        </div>
      )}

      {selecionado && (
        <>
          <div className="absolute inset-0 shimmer" />
          <div className="absolute top-3 right-3 bg-purple-900 rounded-full p-2 shadow-lg z-10">
            <Check className="h-5 w-5 text-yellow-400" strokeWidth={3} />
          </div>
        </>
      )}

      {!selecionado && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full border-2 border-white/30 group-hover:border-yellow-400/50 transition-colors" />
      )}
      <div className="flex w-full flex-col items-center justify-center space-y-4 relative z-10 flex-grow">
        <div
          className={cn(
            "text-7xl sm:text-8xl transition-all duration-300 filter drop-shadow-lg",
            selecionado ? "scale-110 animate-bounce" : "group-hover:scale-110"
          )}
        >
          <img src={imagemSrc} alt={`copo ${tamanho}`} className="w-25" />
        </div>

        <div className="text-center space-y-2">
          <div
            className={cn(
              "text-2xl sm:text-3xl font-black px-6 py-2.5 rounded-full inline-block transition-all duration-300 shadow-lg",
              selecionado
                ? "bg-purple-900 text-yellow-400 scale-105"
                : "bg-white/10 text-white group-hover:bg-white/20 group-hover:scale-105"
            )}
          >
            {tamanho}
          </div>
          <div className="flex flex-col items-center gap-1">
            {temPromocao && (
              <span className="text-white/60 text-lg line-through">
                R$ {precoOriginal!.toFixed(2).replace(".", ",")}
              </span>
            )}
            <span
              className={cn(
                "text-xl sm:text-2xl font-black transition-colors duration-300",
                selecionado
                  ? "text-purple-900"
                  : "text-white group-hover:text-yellow-400"
              )}
            >
              R$ {preco.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
