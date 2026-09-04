"use client";

import { Banknote, Check, QrCode } from "lucide-react";

import { cn } from "@/lib/utils";

interface PaymentMethodProps {
  selected: string;
  onSelect: (method: string) => void;
}

export function PaymentMethod({ selected, onSelect }: PaymentMethodProps) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
      <Method
        active={selected === "pix"}
        icon={<QrCode className="h-6 w-6" />}
        title="Pix"
        description="Pagamento pelo Pix"
        onClick={() => onSelect("pix")}
      />

      <Method
        active={selected === "dinheiro"}
        icon={<Banknote className="h-6 w-6" />}
        title="Dinheiro"
        description="Diga se precisa de troco"
        onClick={() => onSelect("dinheiro")}
      />
    </div>
  );
}

function Method({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "relative min-h-[120px] rounded-2xl border-2 p-4 text-left transition-colors",
        active
          ? "border-brand-green bg-brand-green/10"
          : "border-white/15 bg-white/[0.04]",
      )}
    >
      {active && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-white">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      )}

      <div className={active ? "text-brand-green" : "text-white/70"}>{icon}</div>

      <strong className="mt-3 block text-base font-extrabold text-white">
        {title}
      </strong>

      <span className="mt-1.5 block text-sm leading-relaxed text-white/60">
        {description}
      </span>
    </button>
  );
}
