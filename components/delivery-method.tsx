"use client";

import { Bike, Check, Store } from "lucide-react";

import { cn } from "@/lib/utils";

type DeliveryType = "" | "entrega" | "retirada";

interface DeliveryMethodProps {
  selected: DeliveryType;
  onSelect: (method: "entrega" | "retirada") => void;
}

export function DeliveryMethod({ selected, onSelect }: DeliveryMethodProps) {
  return (
    <div className="premium-panel h-full p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-extrabold text-white">
          Como você quer receber?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/65">
          Escolha entrega ou retirada no local.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
        <Method
          active={selected === "entrega"}
          icon={<Bike className="h-6 w-6" />}
          title="Entrega"
          description="Receba no seu endereço"
          onClick={() => onSelect("entrega")}
        />

        <Method
          active={selected === "retirada"}
          icon={<Store className="h-6 w-6" />}
          title="Retirada"
          description="Retire no local"
          onClick={() => onSelect("retirada")}
        />
      </div>
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
