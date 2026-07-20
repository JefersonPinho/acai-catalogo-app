"use client";

import type React from "react";

import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TrocoFieldProps {
  value: string;
  totalPedido: number;
  onChange: (value: string) => void;
}

function parseCurrency(value: string): number {
  if (!value.trim()) return 0;

  let normalized = value.trim().replace(/[^\d,.]/g, "");

  const lastComma = normalized.lastIndexOf(",");

  const lastDot = normalized.lastIndexOf(".");

  if (lastComma !== -1 && lastDot !== -1) {
    const decimalSeparator = lastComma > lastDot ? "," : ".";

    const thousandsSeparator = decimalSeparator === "," ? "." : ",";

    normalized = normalized.split(thousandsSeparator).join("");

    if (decimalSeparator === ",") {
      normalized = normalized.replace(",", ".");
    }
  } else if (lastComma !== -1) {
    const decimalLength = normalized.length - lastComma - 1;

    if (decimalLength === 3) {
      normalized = normalized.replace(",", "");
    } else {
      normalized = normalized.replace(",", ".");
    }
  } else if (lastDot !== -1) {
    const decimalLength = normalized.length - lastDot - 1;

    if (decimalLength === 3) {
      normalized = normalized.replace(".", "");
    }
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value: number) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

export function TrocoField({ value, totalPedido, onChange }: TrocoFieldProps) {
  const isSemTroco = value.trim() === "0";

  const valorInformado = !isSemTroco && value.trim() ? parseCurrency(value) : 0;

  const valorInvalido =
    !isSemTroco && value.trim() !== "" && valorInformado <= totalPedido;

  const valorValido = !isSemTroco && valorInformado > totalPedido;

  const valorTroco = valorValido ? valorInformado - totalPedido : 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value.replace(/[^\d,.]/g, "");

    if (inputValue.length > 12) {
      inputValue = inputValue.slice(0, 12);
    }

    onChange(inputValue);
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <label
            htmlFor="troco"
            className="block text-sm font-black text-[#fffaf2]"
          >
            Precisa de troco?
          </label>

          <p className="mt-0.5 text-xs text-white/40">
            Informe o valor que irá pagar
          </p>
        </div>

        <button
          type="button"
          onClick={() => onChange(isSemTroco ? "" : "0")}
          className={cn(
            "min-h-10 rounded-lg border px-3 py-2 text-xs font-bold transition-colors",
            isSemTroco
              ? "border-[#efb93f] bg-[#efb93f] text-[#210725]"
              : "border-white/[0.08] bg-white/[0.035] text-white/70 hover:border-[#efb93f]/25",
          )}
        >
          {isSemTroco ? "Não preciso ✓" : "Não preciso de troco"}
        </button>
      </div>

      {!isSemTroco && (
        <>
          <Input
            id="troco"
            type="text"
            inputMode="decimal"
            placeholder="Ex.: 20,00 ou 50,00"
            value={value}
            aria-invalid={valorInvalido}
            onChange={handleChange}
            className={cn("glass-input", valorInvalido && "!border-red-400/70")}
          />

          <p className="mt-2 text-xs text-white/40">
            Total do pedido:{" "}
            <strong className="text-white/70">
              {formatCurrency(totalPedido)}
            </strong>
          </p>
        </>
      )}

      {valorInvalido && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-400/18 bg-red-400/[0.07] px-3 py-2.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />

          <p className="text-xs leading-relaxed text-red-100">
            O valor informado precisa ser maior que{" "}
            <strong>{formatCurrency(totalPedido)}</strong>. Caso vá pagar o
            valor exato, marque <strong>“Não preciso de troco”</strong>.
          </p>
        </div>
      )}

      {valorValido && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-emerald-400/18 bg-emerald-400/[0.065] px-3 py-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />

          <div>
            <p className="text-xs font-medium text-emerald-100">
              Valor confirmado.
            </p>

            <p className="mt-1 text-xs text-white/50">
              Troco estimado:{" "}
              <strong className="text-emerald-300">
                {formatCurrency(valorTroco)}
              </strong>
            </p>
          </div>
        </div>
      )}

      {isSemTroco && (
        <div className="flex items-start gap-2 rounded-lg border border-[#efb93f]/12 bg-[#efb93f]/[0.05] px-3 py-2.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#efb93f]" />

          <p className="text-xs font-medium text-[#ffe29a]">
            Certo. Não será necessário levar troco.
          </p>
        </div>
      )}
    </div>
  );
}
