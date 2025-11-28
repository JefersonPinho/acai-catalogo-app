"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComplementoCardProps {
  complemento: string
  selecionado: boolean
  desabilitado: boolean
  onClick: () => void
}

export function ComplementoCard({ complemento, selecionado, desabilitado, onClick }: ComplementoCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={desabilitado}
      className={cn(
        "flex items-center gap-3 py-3.5 px-4 rounded-xl transition-all duration-200 text-left group",
        "hover:scale-[1.02] active:scale-[0.98]",
        selecionado
          ? "bg-yellow-400/20 border-2 border-yellow-400 shadow-lg"
          : desabilitado
            ? "bg-white/5 border border-white/10 cursor-not-allowed opacity-40"
            : "bg-white/5 border border-white/20 hover:border-yellow-400/50 hover:bg-white/10",
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200",
          selecionado
            ? "bg-yellow-400 shadow-lg"
            : "bg-white/10 border border-white/30 group-hover:border-yellow-400/50",
        )}
      >
        {selecionado && <Check className="h-4 w-4 text-purple-900" strokeWidth={3} />}
      </div>

      <span
        className={cn(
          "text-sm sm:text-base font-medium text-balance leading-tight transition-colors duration-200",
          selecionado ? "text-yellow-400 font-semibold" : "text-white/90 group-hover:text-white",
        )}
      >
        {complemento}
      </span>
    </button>
  )
}
