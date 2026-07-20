"use client";

import { PaymentMethod } from "@/components/payment-method";
import { TrocoField } from "@/components/troco-field";

interface PaymentFormProps {
  formaPagamento: string;
  troco: string;
  totalPedido: number;
  onPaymentChange: (method: string) => void;
  onTrocoChange: (value: string) => void;
}

export function PaymentForm({
  formaPagamento,
  troco,
  totalPedido,
  onPaymentChange,
  onTrocoChange,
}: PaymentFormProps) {
  return (
    <div className="premium-panel p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="font-bold text-white">Forma de pagamento</h2>

        <p className="mt-0.5 text-xs text-white/38">
          Escolha como deseja pagar
        </p>
      </div>

      <PaymentMethod selected={formaPagamento} onSelect={onPaymentChange} />

      {formaPagamento === "dinheiro" && (
        <div className="mt-4 border-t border-white/[0.06] pt-4">
          <TrocoField
            value={troco}
            totalPedido={totalPedido}
            onChange={onTrocoChange}
          />
        </div>
      )}
    </div>
  );
}
