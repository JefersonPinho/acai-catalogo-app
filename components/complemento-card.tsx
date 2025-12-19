"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComplementoCardProps {
  complemento: string;
  selecionado: boolean;
  desabilitado: boolean;
  onClick: () => void;
  badge?: string;
}

export function ComplementoCard({
  complemento,
  selecionado,
  desabilitado,
  onClick,
  badge,
}: ComplementoCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={desabilitado}
      className={cn(
        "flex items-center justify-between gap-3 py-3.5 px-4 rounded-xl transition-all duration-200 text-left group w-full",
        "hover:scale-[1.02] active:scale-[0.98]",
        selecionado
          ? "bg-yellow-400/20 border-2 border-yellow-400 shadow-lg"
          : "bg-white/5 border border-white/20 hover:bg-white/10"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200",
            selecionado
              ? "bg-yellow-400 shadow-sm"
              : "bg-white/10 border border-white/30"
          )}
        >
          {selecionado && (
            <Check className="h-3.5 w-3.5 text-purple-900" strokeWidth={4} />
          )}
        </div>

        <span
          className={cn(
            "text-sm sm:text-base font-medium leading-tight transition-colors duration-200",
            selecionado ? "text-yellow-400 font-bold" : "text-white/90"
          )}
        >
          {complemento}
        </span>
      </div>

      {badge && !selecionado && (
        <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-md border border-yellow-400/20 whitespace-nowrap">
          {badge}
        </span>
      )}
    </button>
  );
}
