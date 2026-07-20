"use client";

import { ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AcaiItem {
  id: string;
  tamanho: string;
  tamanhoLabel: string;
  preco: number;
  creme: string;
  complementos: string[];
  observacao: string;
}

interface AcaiCartProps {
  items: AcaiItem[];
  onRemove: (id: string) => void;
}

export function AcaiCart({ items, onRemove }: AcaiCartProps) {
  if (!items.length) return null;

  const total = items.reduce((sum, item) => sum + item.preco, 0);

  return (
    <section className="premium-panel p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="section-icon">
            <ShoppingBag className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-white sm:text-xl">
              Seu pedido
            </h2>

            <p className="text-xs text-white/38">
              Confira os itens adicionados
            </p>
          </div>
        </div>

        <span className="rounded-full border border-[#e9b84b]/15 bg-[#e9b84b]/[0.05] px-3 py-1.5 text-xs font-bold text-[#efc86f]">
          {items.length} {items.length === 1 ? "item" : "itens"}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const extras = Math.max(0, item.complementos.length - 3);

          return (
            <article
              key={item.id}
              className="rounded-xl border border-white/[0.065] bg-black/[0.07] p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9b84b] text-xs font-black text-[#1e071f]">
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-white">
                        Açaí {item.tamanhoLabel}
                      </h3>

                      <p className="mt-0.5 text-sm font-black text-[#e9b84b]">
                        R$ {item.preco.toFixed(2).replace(".", ",")}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(item.id)}
                      className="h-9 w-9 shrink-0 text-red-300/80 hover:bg-red-400/10 hover:text-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="mt-3 text-xs text-white/42">{item.creme}</p>

                  {item.complementos.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.complementos.map((complemento) => (
                        <span
                          key={complemento}
                          className="rounded-md border border-white/[0.06] bg-white/[0.035] px-2 py-1 text-[11px] text-white/65"
                        >
                          {complemento}
                        </span>
                      ))}

                      {extras > 0 && (
                        <span className="rounded-md border border-[#e9b84b]/12 bg-[#e9b84b]/[0.055] px-2 py-1 text-[11px] font-bold text-[#efc76c]">
                          + {extras} {extras === 1 ? "extra" : "extras"}
                        </span>
                      )}
                    </div>
                  )}

                  {item.observacao && (
                    <p className="mt-3 rounded-lg bg-white/[0.025] px-3 py-2 text-xs leading-relaxed text-white/55">
                      {item.observacao}
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-[#e9b84b]/10 bg-[#e9b84b]/[0.04] p-4">
        <div>
          <span className="block text-xs font-semibold text-white/50">
            Total do pedido
          </span>

          <span className="text-[10px] text-white/28">
            Taxa de entrega não inclusa
          </span>
        </div>

        <strong className="text-2xl font-black text-[#e9b84b] sm:text-3xl">
          R$ {total.toFixed(2).replace(".", ",")}
        </strong>
      </div>
    </section>
  );
}
