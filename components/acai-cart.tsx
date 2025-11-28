"use client"

import { Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AcaiItem {
  id: string
  tamanho: string
  tamanhoLabel: string
  preco: number
  complementos: string[]
  observacao: string
}

interface AcaiCartProps {
  items: AcaiItem[]
  onRemove: (id: string) => void
}

export function AcaiCart({ items, onRemove }: AcaiCartProps) {
  if (items.length === 0) {
    return (
      <div className="card-premium rounded-3xl p-10 sm:p-12 shadow-2xl text-center transition-all duration-300 hover:shadow-purple-500/20">
        <div className="mb-6 relative inline-block">
          <ShoppingBag className="h-20 w-20 text-white/20 mx-auto" />
          <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-purple-900 font-black text-sm">
            0
          </div>
        </div>
        <p className="text-white/70 text-xl font-semibold mb-2">Seu carrinho está vazio</p>
        <p className="text-white/50 text-base">Monte seu açaí acima e clique em "Adicionar ao Pedido"</p>
      </div>
    )
  }

  return (
    <div className="card-premium rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 hover:shadow-3xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 rounded-full p-2.5 shadow-lg">
            <ShoppingBag className="h-6 w-6 text-purple-900" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">Seu Pedido</h2>
        </div>
        <div className="bg-purple-900/50 border border-purple-500/30 px-4 py-2 rounded-full">
          <span className="text-white font-bold">
            {items.length} {items.length === 1 ? "açaí" : "açaís"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="glass-effect rounded-2xl p-5 hover:bg-white/10 transition-all duration-200 border-l-4 border-yellow-400 shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-yellow-400 text-purple-900 font-black text-lg px-3 py-1 rounded-full">
                    #{index + 1}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-xl">{item.tamanhoLabel}</h3>
                    <p className="text-yellow-400 font-semibold text-lg">R$ {item.preco.toFixed(2)}</p>
                  </div>
                </div>

                {item.complementos.length > 0 && (
                  <div className="mb-3">
                    <p className="text-white/60 text-sm font-semibold mb-2">Complementos:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.complementos.map((comp) => (
                        <span
                          key={comp}
                          className="bg-purple-900/50 text-white text-xs px-3 py-1.5 rounded-full border border-purple-500/30"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.observacao && (
                  <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-3">
                    <p className="text-white/60 text-xs font-semibold mb-1">Observação:</p>
                    <p className="text-white text-sm">{item.observacao}</p>
                  </div>
                )}
              </div>

              <Button
                onClick={() => onRemove(item.id)}
                variant="ghost"
                size="icon"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors shrink-0"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t-2 border-white/30">
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-900/50 to-purple-800/50 rounded-2xl p-5 shadow-lg">
          <span className="text-white text-xl sm:text-2xl font-black">Total do Pedido:</span>
          <span className="text-yellow-400 text-3xl sm:text-4xl font-black text-shadow-glow">
            R$ {items.reduce((sum, item) => sum + item.preco, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
