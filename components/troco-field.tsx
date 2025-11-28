"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TrocoFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function TrocoField({ value, onChange }: TrocoFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d,]/g, "");
    onChange(inputValue);
  };

  const handleSemTroco = () => {
    onChange("0");
  };

  const isSemTroco = value.trim() === "0";

  return (
    <div className="space-y-3">
      <label className="text-white font-semibold text-base block">
        Precisa de troco? Para quanto?
        <button
          type="button"
          onClick={handleSemTroco}
          className={cn(
            "ml-3 px-3 py-1 text-sm font-medium rounded-full transition-all duration-200",
            isSemTroco
              ? "bg-purple-900 text-yellow-400 shadow-md"
              : "bg-white/10 text-white/80 hover:bg-white/20"
          )}
        >
          {isSemTroco ? "✔ Não Precisa" : "Não preciso de troco"}
        </button>
      </label>
      {!isSemTroco && (
        <Input
          type="text"
          placeholder="Ex: 20,00 ou 50,00"
          value={value}
          onChange={handleChange}
          className="bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 h-14 text-lg focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all rounded-xl"
        />
      )}
      {isSemTroco && (
        <p className="text-yellow-400 font-medium text-base pt-2">
          Confirmado: O valor exato do pedido será cobrado.
          <button
            onClick={() => onChange("")}
            className="ml-2 underline text-white/70 hover:text-white/90"
          >
            Mudar
          </button>
        </p>
      )}

      <p className="text-white/60 text-sm">
        {isSemTroco
          ? "Clique em 'Mudar' se precisar de troco."
          : "Informe o valor da nota para calcularmos o troco."}
      </p>
    </div>
  );
}
