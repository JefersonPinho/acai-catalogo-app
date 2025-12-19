"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddressFormProps {
  rua: string;
  numero: string;
  bairro: string;
  referencia: string;
  onChange: (field: string, value: string) => void;
}

export function AddressForm({
  rua,
  numero,
  bairro,
  referencia,
  onChange,
}: AddressFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-white/80 mb-1 block">
          Rua / Avenida <span className="text-yellow-400">*</span>
        </label>
        <Input
          type="text"
          placeholder="Ex: Rua das Flores"
          value={rua}
          onChange={(e) => onChange("rua", e.target.value)}
          className="glass-input"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-white/80 mb-1 block">
            Número <span className="text-yellow-400">*</span>
          </label>
          <Input
            type="text"
            placeholder="123"
            value={numero}
            onChange={(e) => onChange("numero", e.target.value)}
            className="glass-input"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-white/80 mb-1 block">
            Bairro <span className="text-yellow-400">*</span>
          </label>
          <Input
            type="text"
            placeholder="Centro"
            value={bairro}
            onChange={(e) => onChange("bairro", e.target.value)}
            className="glass-input"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-white/80 mb-1 block">
          Referência (Opcional)
        </label>
        <Textarea
          placeholder="Ex: Casa azul..."
          value={referencia}
          onChange={(e) => onChange("referencia", e.target.value)}
          className="glass-input h-20 pt-2 resize-none"
        />
      </div>
    </div>
  );
}
