"use client";

import { PaymentMethod } from "@/components/payment-method";
import { TrocoField } from "@/components/troco-field";

interface PaymentFormProps {
  formaPagamento: string;
  troco: string;
  onPaymentChange: (method: string) => void;
  onTrocoChange: (value: string) => void;
}

export function PaymentForm({
  formaPagamento,
  troco,
  onPaymentChange,
  onTrocoChange,
}: PaymentFormProps) {
  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-bold text-white mb-4">Forma de pagamento</h2>
      <PaymentMethod selected={formaPagamento} onSelect={onPaymentChange} />
      {formaPagamento === "dinheiro" && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2">
          <TrocoField value={troco} onChange={onTrocoChange} />
        </div>
      )}
    </div>
  );
}
