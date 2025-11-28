"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface AddressFormProps {
  rua: string
  numero: string
  bairro: string
  referencia: string
  onChange: (field: string, value: string) => void
}

export function AddressForm({ rua, numero, bairro, referencia, onChange }: AddressFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-white font-semibold text-base mb-2 block">
          Rua / Avenida <span className="text-yellow-400">*</span>
        </label>
        <Input
          type="text"
          placeholder="Ex: Rua das Flores"
          value={rua}
          onChange={(e) => onChange("rua", e.target.value)}
          className="bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 h-14 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-white font-semibold text-base mb-2 block">
            Número <span className="text-yellow-400">*</span>
          </label>
          <Input
            type="text"
            placeholder="123"
            value={numero}
            onChange={(e) => onChange("numero", e.target.value)}
            className="bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 h-14 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all rounded-xl"
          />
        </div>

        <div>
          <label className="text-white font-semibold text-base mb-2 block">
            Bairro <span className="text-yellow-400">*</span>
          </label>
          <Input
            type="text"
            placeholder="Ex: Centro"
            value={bairro}
            onChange={(e) => onChange("bairro", e.target.value)}
            className="bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 h-14 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all rounded-xl"
          />
        </div>
      </div>

      <div>
        <label className="text-white font-semibold text-base mb-2 block">Ponto de referência (opcional)</label>
        <Textarea
          placeholder="Ex: Próximo ao mercado, casa azul com portão branco..."
          value={referencia}
          onChange={(e) => onChange("referencia", e.target.value)}
          className="bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 min-h-24 resize-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all rounded-xl"
        />
      </div>
    </div>
  )
}
