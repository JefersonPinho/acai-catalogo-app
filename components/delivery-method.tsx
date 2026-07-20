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
    <div className="premium-panel h-full p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="font-bold text-white">Como você quer receber?</h2>

        <p className="mt-0.5 text-xs text-white/38">Escolha uma opção</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
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
          description="Retire seu pedido no local"
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
        "relative min-h-[112px] rounded-xl border p-3.5 text-left transition-colors",
        active
          ? "border-[#e9b84b] bg-[#e9b84b]/[0.055]"
          : "border-white/[0.07] bg-black/[0.06] hover:border-white/[0.14]",
      )}
    >
      {active && (
        <span className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#e9b84b] text-[#1e071f]">
          <Check className="h-4 w-4" strokeWidth={3.5} />
        </span>
      )}

      <div className={active ? "text-[#e9b84b]" : "text-white/55"}>{icon}</div>

      <strong
        className={`mt-3 block text-sm font-extrabold sm:text-base ${
          active ? "text-[#efc86d]" : "text-white"
        }`}
      >
        {title}
      </strong>

      <span className="mt-1 block text-[10px] leading-relaxed text-white/35 sm:text-xs">
        {description}
      </span>
    </button>
  );
}
