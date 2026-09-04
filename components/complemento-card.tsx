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
        "flex flex-col text-left",
        desabilitado && "cursor-not-allowed opacity-40",
      )}
    >
      <span
        className={cn(
          "relative block aspect-square overflow-hidden rounded-2xl border-2",
          selecionado ? "border-brand-green" : "border-white/15",
        )}
      >
        <Image
          src={imagemSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
          className="object-cover"
        />

        <span
          className={cn(
            "absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2",
            selecionado
              ? "border-brand-green bg-brand-green text-white"
              : "border-white/80 bg-black/25",
          )}
        >
          {selecionado && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        </span>

        {badge && (
          <span className="absolute right-2 top-2 z-10 rounded-full bg-[#47175b] px-2 py-0.5 text-[11px] font-bold text-white">
            {badge}
          </span>
        )}
      </span>

      <span
        className={cn(
          "mt-2.5 text-[0.95rem] font-semibold leading-snug",
          selecionado ? "text-brand-green" : "text-white",
        )}
      >
        {complemento}
      </span>
    </button>
  );
}
