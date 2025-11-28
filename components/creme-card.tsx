"use client"

import { Check } from "lucide-react"

interface CremeCardProps {
  creme: string
  selecionado: boolean
  onClick: () => void
}

export function CremeCard({ creme, selecionado, onClick }: CremeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative w-full p-4 rounded-xl border-2 transition-all duration-200
        ${
          selecionado
            ? "bg-white/10 border-yellow-400 shadow-lg shadow-yellow-400/20"
            : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/8"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-white font-medium text-left">{creme}</span>
        {selecionado && (
          <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-purple-900 stroke-[3]" />
          </div>
        )}
      </div>
    </button>
  )
}
