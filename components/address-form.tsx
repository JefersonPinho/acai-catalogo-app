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
        <label
          htmlFor="rua"
          className="mb-1.5 block text-sm font-medium text-white/70"
        >
          Rua / Avenida <span className="text-[#efb93f]">*</span>
        </label>

        <Input
          id="rua"
          type="text"
          autoComplete="street-address"
          placeholder="Ex.: Rua das Flores"
          value={rua}
          onChange={(event) => onChange("rua", event.target.value)}
          className="glass-input"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
        <div>
          <label
            htmlFor="numero"
            className="mb-1.5 block text-sm font-medium text-white/70"
          >
            Número <span className="text-[#efb93f]">*</span>
          </label>

          <Input
            id="numero"
            type="text"
            inputMode="numeric"
            placeholder="Ex.: 123"
            value={numero}
            onChange={(event) => onChange("numero", event.target.value)}
            className="glass-input"
          />
        </div>

        <div>
          <label
            htmlFor="bairro"
            className="mb-1.5 block text-sm font-medium text-white/70"
          >
            Bairro <span className="text-[#efb93f]">*</span>
          </label>

          <Input
            id="bairro"
            type="text"
            placeholder="Ex.: Centro"
            value={bairro}
            onChange={(event) => onChange("bairro", event.target.value)}
            className="glass-input"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="referencia"
          className="mb-1.5 block text-sm font-medium text-white/70"
        >
          Ponto de referência{" "}
          <span className="font-normal text-white/30">(opcional)</span>
        </label>

        <Textarea
          id="referencia"
          placeholder="Ex.: Próximo à praça, casa de portão azul..."
          value={referencia}
          maxLength={150}
          onChange={(event) => onChange("referencia", event.target.value)}
          className="glass-input min-h-20 resize-none pt-3"
        />
      </div>
    </div>
  );
}
