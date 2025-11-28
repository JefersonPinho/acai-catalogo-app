"use client";

import { useState } from "react";
import { AcaiBuilder } from "@/components/acai-builder";
import { AcaiCart } from "@/components/acai-cart";
import { PaymentForm } from "@/components/payment-form";
import { AddressForm } from "@/components/address-form";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const hoje = new Date();
const isDomingo = hoje.getDay() === 0;

const tamanhos = [
  {
    id: "200ml",
    tamanho: "200ml",
    precoOriginal: 12.0,
    precoPromocional: 10.0,
    imagemSrc: "/copo-pequeno.png",
  },
  {
    id: "330ml",
    tamanho: "330ml",
    precoOriginal: 15.0,
    precoPromocional: null,
    imagemSrc: "/copo-grande.png",
  },
];

const cremes = ["Creme de Ninho"];

const complementos = [
  "Gotas de Chocolate",
  "M&Ms",
  "Chocoball (G)",
  "Chocoball (P)",
  "Paçoquita",
  "Leite em pó",
  "Nutella",
  "Cereja",
  "Banana",
  "Amendoim",
  "Castanha",
  "Granola",
  "Kiwi",
  "Morango",
  "Cookies Cream",
];

interface AcaiItem {
  id: string;
  tamanho: string;
  tamanhoLabel: string;
  preco: number;
  creme: string;
  complementos: string[];
  observacao: string;
}

export default function AcaiPedido() {
  const [cart, setCart] = useState<AcaiItem[]>([]);
  const [formaPagamento, setFormaPagamento] = useState<string>("");
  const [troco, setTroco] = useState("");
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    referencia: "",
  });

  // 🔥 LÓGICA FINAL - SEM BUG
  const handleAddToCart = (acai: {
    tamanho: string;
    tamanhoLabel: string;
    preco: number;
    creme: string;
    complementos: string[];
    observacao: string;
  }) => {
    const tamanho = tamanhos.find((t) => t.id === acai.tamanho);

    const promocaoDisponivel =
      isDomingo &&
      tamanho?.precoPromocional !== null &&
      tamanho?.precoPromocional !== undefined;

    const precoFinal = promocaoDisponivel
      ? tamanho!.precoPromocional
      : tamanho!.precoOriginal;

    const newItem: AcaiItem = {
      id: Date.now().toString(),
      ...acai,
      preco: precoFinal,
    };

    setCart([...cart, newItem]);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleEnderecoChange = (field: string, value: string) => {
    setEndereco((prev) => ({ ...prev, [field]: value }));
  };

  const enviarWhatsApp = () => {
    if (cart.length === 0) {
      alert("Adicione pelo menos um açaí ao pedido!");
      return;
    }

    if (!formaPagamento) {
      alert("Por favor, selecione a forma de pagamento!");
      return;
    }

    if (formaPagamento === "dinheiro" && troco.trim() === "") {
      alert("Informe se precisa de troco!");
      return;
    }

    if (!endereco.rua || !endereco.numero || !endereco.bairro) {
      alert("Preencha todos os campos obrigatórios do endereço!");
      return;
    }

    let mensagem = `*PEDIDO*\n\n`;

    cart.forEach((item, index) => {
      mensagem += `*Açaí ${index + 1}*\n`;
      mensagem += `• *Tamanho:* ${item.tamanhoLabel} — R$ ${item.preco.toFixed(
        2
      )}\n`;
      mensagem += `• *Creme:* ${item.creme || "Sem creme"}\n`;
      mensagem += `• *Complementos:* ${
        item.complementos.length > 0 ? item.complementos.join(", ") : "Nenhum"
      }\n`;
      if (item.observacao) {
        mensagem += `• *Observações:* ${item.observacao}\n`;
      }
      mensagem += `\n`;
    });

    mensagem += `*Forma de Pagamento:* ${
      formaPagamento === "pix" ? "Pix" : "Dinheiro"
    }\n`;

    if (formaPagamento === "dinheiro") {
      if (troco.trim() === "0") {
        mensagem += `*Troco:* Não é necessário\n`;
      } else if (troco.trim() !== "") {
        mensagem += `*Troco para:* R$ ${troco}\n`;
      }
    }

    mensagem += `\n*Endereço*\n`;
    mensagem += `• Rua: ${endereco.rua}\n`;
    mensagem += `• Número: ${endereco.numero}\n`;
    mensagem += `• Bairro: ${endereco.bairro}\n`;
    if (endereco.referencia) {
      mensagem += `• Referência: ${endereco.referencia}\n`;
    }

    const total = cart.reduce((sum, item) => sum + item.preco, 0);
    mensagem += `\n*Total:* R$ ${total.toFixed(2)}\n `;
    mensagem += `\n*Atenção:* O valor total ainda não inclui o valor da *taxa de entrega*, beleza? 😉`;

    const url = `https://wa.me/5585982255592?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen acai-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-balance leading-tight">
            <span className="text-white">MONTE SEU </span>
            <span className="text-yellow-400">AÇAÍ</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Escolha seu tamanho, creme e até 3 complementos
          </p>
        </div>

        <div className="space-y-6">
          <AcaiBuilder
            tamanhos={tamanhos.map((t) => {
              const promocaoDisponivel =
                isDomingo &&
                t.precoPromocional !== null &&
                t.precoPromocional !== undefined;

              return {
                ...t,
                precoBase: t.precoOriginal,
                preco: promocaoDisponivel
                  ? t.precoPromocional!
                  : t.precoOriginal,
              };
            })}
            cremes={cremes}
            complementos={complementos}
            promocaoAtiva={isDomingo}
            onAddToCart={handleAddToCart}
          />

          <AcaiCart items={cart} onRemove={handleRemoveFromCart} />

          <PaymentForm
            formaPagamento={formaPagamento}
            troco={troco}
            onPaymentChange={setFormaPagamento}
            onTrocoChange={setTroco}
          />

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-yellow-400 mb-1">
                Endereço de entrega
              </h2>
              <p className="text-white/60 text-sm">
                Informe o endereço para a entrega
              </p>
            </div>
            <AddressForm
              rua={endereco.rua}
              numero={endereco.numero}
              bairro={endereco.bairro}
              referencia={endereco.referencia}
              onChange={handleEnderecoChange}
            />
          </div>

          <div className="bg-yellow-400 rounded-2xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-purple-900 mb-2">
                Finalizar Pedido
              </h3>
              <p className="text-purple-900/80 font-medium">
                {cart.length > 0
                  ? `${cart.length} açaí${
                      cart.length > 1 ? "s" : ""
                    } • Total: R$ ${cart
                      .reduce((sum, item) => sum + item.preco, 0)
                      .toFixed(2)}`
                  : "Adicione açaís ao seu pedido"}
              </p>
            </div>

            <Button
              onClick={enviarWhatsApp}
              disabled={cart.length === 0}
              size="lg"
              className="w-full bg-purple-900 hover:bg-purple-800 text-white font-bold text-lg py-7 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="mr-2 h-6 w-6" />
              Enviar Pedido no WhatsApp
            </Button>

            {/* <div className="mt-5 flex items-center justify-center gap-2 text-purple-900 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span>(85) 98225-5592</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
