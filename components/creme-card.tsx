"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CremeCardProps {
  creme: string;
  descricao: string;
  selecionado: boolean;
  onClick: () => void;
}

export function CremeCard({
  creme,
  descricao,
  selecionado,
  onClick,
}: CremeCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selecionado}
      onClick={onClick}
      className={cn(
        "flex min-h-[92px] items-center justify-between gap-4 rounded-3xl border-2 px-5 py-4 text-left transition-colors",
        selecionado
          ? "border-brand-green bg-brand-green/10"
          : "border-white/15 bg-white/[0.04]",
      )}
    >
      <span className="min-w-0">
        <span
          className={cn(
            "block text-base font-bold leading-snug",
            selecionado ? "text-white" : "text-white",
          )}
        >
          {creme}
        </span>

        <span className="mt-1.5 block text-sm leading-relaxed text-white/65">
          {descricao}
        </span>
      </span>

      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
          selecionado
            ? "border-brand-green bg-brand-green text-white"
            : "border-white/35",
        )}
      >
        {selecionado && <Check className="h-4 w-4" strokeWidth={3} />}
      </span>
    </button>
  );
}
