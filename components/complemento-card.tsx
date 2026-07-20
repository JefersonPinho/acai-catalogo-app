"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface ComplementoCardProps {
  complemento: string;
  imagemSrc: string;
  selecionado: boolean;
  desabilitado: boolean;
  onClick: () => void;
  badge?: string;
}

export function ComplementoCard({
  complemento,
  imagemSrc,
  selecionado,
  desabilitado,
  onClick,
  badge,
}: ComplementoCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selecionado}
      onClick={onClick}
      disabled={desabilitado}
      className={cn(
        "group relative min-h-[112px] overflow-hidden rounded-xl border bg-[#16041b] text-left transition-colors sm:min-h-[132px]",
        selecionado ? "border-[#e9b84b]" : "border-white/[0.07]",
        desabilitado && "cursor-not-allowed opacity-40",
      )}
    >
      <Image
        src={imagemSrc}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0110] via-[#130318]/30 to-transparent" />

      <span
        className={cn(
          "absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border",
          selecionado
            ? "border-[#e9b84b] bg-[#e9b84b] text-[#1d071f]"
            : "border-white/40 bg-black/25",
        )}
      >
        {selecionado && <Check className="h-3.5 w-3.5" strokeWidth={4} />}
      </span>

      {badge && (
        <span
          className={cn(
            "absolute right-1.5 top-1.5 z-10 rounded-full px-1.5 py-0.5 text-[8px] font-black",
            selecionado
              ? "bg-[#e9b84b] text-[#1d071f]"
              : "bg-[#140318]/90 text-[#efc76c]",
          )}
        >
          {badge}
        </span>
      )}

      <span
        className={cn(
          "absolute inset-x-0 bottom-0 z-10 p-2.5 text-xs font-extrabold leading-tight sm:text-sm",
          selecionado ? "text-[#f0c96e]" : "text-white",
        )}
      >
        {complemento}
      </span>
    </button>
  );
}
