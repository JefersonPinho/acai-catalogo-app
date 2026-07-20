"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface CremeCardProps {
  creme: string;
  selecionado: boolean;
  onClick: () => void;
}

export function CremeCard({ creme, selecionado, onClick }: CremeCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selecionado}
      onClick={onClick}
      className={cn(
        "relative flex min-h-[68px] items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors",
        selecionado
          ? "border-[#e9b84b] bg-[#e9b84b]/[0.045]"
          : "border-white/[0.07] bg-black/[0.05]",
      )}
    >
      <span
        className={cn(
          "text-sm font-bold leading-tight",
          selecionado ? "text-[#efc76c]" : "text-white",
        )}
      >
        {creme}
      </span>

      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
          selecionado
            ? "border-[#e9b84b] bg-[#e9b84b] text-[#1d071f]"
            : "border-white/18",
        )}
      >
        {selecionado && <Check className="h-4 w-4" strokeWidth={3.5} />}
      </span>
    </button>
  );
}
