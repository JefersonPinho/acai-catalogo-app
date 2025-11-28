"use client"
import { CreditCard, Banknote, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaymentMethodProps {
  selected: string
  onSelect: (method: string) => void
}

export function PaymentMethod({ selected, onSelect }: PaymentMethodProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onSelect("pix")}
        className={cn(
          "relative h-28 flex flex-col items-center justify-center gap-3 rounded-2xl transition-all duration-300 group",
          "hover:scale-[1.02] active:scale-[0.98]",
          selected === "pix"
            ? "bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-xl"
            : "bg-white/5 border-2 border-white/20 hover:border-yellow-400/50 hover:bg-white/10",
        )}
      >
        {selected === "pix" && (
          <div className="absolute top-3 right-3 bg-purple-900 rounded-full p-1.5">
            <Check className="h-4 w-4 text-yellow-400" strokeWidth={3} />
          </div>
        )}
        <CreditCard
          className={cn(
            "h-10 w-10 transition-colors",
            selected === "pix" ? "text-purple-900" : "text-white group-hover:text-yellow-400",
          )}
        />
        <span
          className={cn("text-lg font-bold transition-colors", selected === "pix" ? "text-purple-900" : "text-white")}
        >
          Pix
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelect("dinheiro")}
        className={cn(
          "relative h-28 flex flex-col items-center justify-center gap-3 rounded-2xl transition-all duration-300 group",
          "hover:scale-[1.02] active:scale-[0.98]",
          selected === "dinheiro"
            ? "bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-xl"
            : "bg-white/5 border-2 border-white/20 hover:border-yellow-400/50 hover:bg-white/10",
        )}
      >
        {selected === "dinheiro" && (
          <div className="absolute top-3 right-3 bg-purple-900 rounded-full p-1.5">
            <Check className="h-4 w-4 text-yellow-400" strokeWidth={3} />
          </div>
        )}
        <Banknote
          className={cn(
            "h-10 w-10 transition-colors",
            selected === "dinheiro" ? "text-purple-900" : "text-white group-hover:text-yellow-400",
          )}
        />
        <span
          className={cn(
            "text-lg font-bold transition-colors",
            selected === "dinheiro" ? "text-purple-900" : "text-white",
          )}
        >
          Dinheiro
        </span>
      </button>
    </div>
  )
}
