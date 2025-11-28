"use client"

import { PaymentMethod } from "@/components/payment-method"
import { TrocoField } from "@/components/troco-field"

interface PaymentFormProps {
  formaPagamento: string
  troco: string
  onPaymentChange: (method: string) => void
  onTrocoChange: (value: string) => void
}

export function PaymentForm({ formaPagamento, troco, onPaymentChange, onTrocoChange }: PaymentFormProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6">Forma de pagamento</h2>
      <PaymentMethod selected={formaPagamento} onSelect={onPaymentChange} />

      {formaPagamento === "dinheiro" && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <TrocoField value={troco} onChange={onTrocoChange} />
        </div>
      )}
    </div>
  )
}
