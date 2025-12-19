"use client";

import { useState } from "react";
import { AcaiBuilder } from "@/components/acai-builder";
import { AcaiCart } from "@/components/acai-cart";
import { PaymentForm } from "@/components/payment-form";
import { AddressForm } from "@/components/address-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Snowflake,
  CheckCircle,
  Plus,
  ArrowDown,
  User,
  MapPin,
} from "lucide-react";
import { SnowEffect } from "@/components/snow-effect";

const hoje = new Date();
// const isDomingo = hoje.getDay() === 0;
const isDomingo = true; //Quando acabar o natal tirar apagar essa linha e descomentar a linha de cima

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
  const [nomeCliente, setNomeCliente] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState<string>("");
  const [troco, setTroco] = useState("");
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    referencia: "",
  });

  const scrollToCheckout = () => {
    setShowModal(false);
    const element = document.getElementById("checkout-section");
    if (element)
      setTimeout(
        () => element.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
  };

  const scrollToTop = () => {
    setShowModal(false);
    const element = document.getElementById("builder-section");
    if (element)
      setTimeout(
        () => element.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
  };

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

    const precoBase = promocaoDisponivel
      ? tamanho!.precoPromocional
      : tamanho!.precoOriginal;

    const qtdExtras = Math.max(0, acai.complementos.length - 3);
    const custoExtras = qtdExtras * 1.0;

    const precoFinal = precoBase! + custoExtras;

    const newItem: AcaiItem = {
      id: Date.now().toString(),
      ...acai,
      preco: precoFinal,
    };
    setCart([...cart, newItem]);
    setShowModal(true);
  };

  const handleRemoveFromCart = (id: string) =>
    setCart(cart.filter((item) => item.id !== id));
  const handleEnderecoChange = (field: string, value: string) =>
    setEndereco((prev) => ({ ...prev, [field]: value }));

  const enviarWhatsApp = () => {
    if (cart.length === 0)
      return alert("Adicione pelo menos um açaí ao pedido!");
    if (!nomeCliente.trim()) {
      alert("Por favor, informe seu NOME antes de finalizar!");
      const nomeInput = document.getElementById("nome-cliente");
      if (nomeInput) {
        nomeInput.focus();
        nomeInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    if (!formaPagamento)
      return alert("Por favor, selecione a forma de pagamento!");
    if (formaPagamento === "dinheiro" && troco.trim() === "")
      return alert("Informe se precisa de troco!");
    if (!endereco.rua || !endereco.numero || !endereco.bairro)
      return alert("Preencha todos os campos obrigatórios do endereço!");

    let mensagem = `*🎄 PEDIDO 🎄*\n\n`;
    mensagem += `*Cliente:* ${nomeCliente}\n\n`;

    cart.forEach((item, index) => {
      const qtdExtras = Math.max(0, item.complementos.length - 3);

      mensagem += `*Açaí ${index + 1}*\n`;
      mensagem += `- *Tamanho:* ${item.tamanhoLabel} — R$ ${item.preco.toFixed(
        2
      )}\n`;
      mensagem += `- *Creme:* ${item.creme || "Açaí Tradicional"}\n`;
      mensagem += `- *Complementos:* ${
        item.complementos.length > 0 ? item.complementos.join(", ") : "Nenhum"
      }\n`;

      if (qtdExtras > 0) {
        mensagem += `  _(Inclui ${qtdExtras} item(ns) extra(s) de R$ 1,00)_\n`;
      }

      if (item.observacao) {
        mensagem += `- *Observações:* ${item.observacao}\n`;
      }
      mensagem += `\n`;
    });

    mensagem += `*Forma de Pagamento:* ${formaPagamento}\n`;
    if (formaPagamento === "dinheiro" && troco.trim() !== "0") {
      mensagem += `  (Troco para R$ ${troco})\n`;
    }

    mensagem += `\n*Endereço*\n`;
    mensagem += `- Rua: ${endereco.rua}\n`;
    mensagem += `- Número: ${endereco.numero}\n`;
    mensagem += `- Bairro: ${endereco.bairro}\n`;
    if (endereco.referencia) {
      mensagem += `- Referência: ${endereco.referencia}\n`;
    }

    const total = cart.reduce((sum, item) => sum + item.preco, 0);
    mensagem += `\n*Total:* R$ ${total.toFixed(2)}\n`;

    mensagem += `\n*Atenção:* O valor total ainda não inclui o valor da *taxa de entrega*, beleza? 😉\n`;
    mensagem += `\n🎅 Feliz Natal & Boas Festas!`;

    window.location.href = `https://wa.me/5585982255592?text=${encodeURIComponent(
      mensagem
    )}`;
  };

  const totalCart = cart.reduce((sum, item) => sum + item.preco, 0);

  return (
    <div className="min-h-screen relative pb-32 selection:bg-yellow-500/30">
      <SnowEffect />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass-card bg-[#2e0238] p-6 w-full max-w-sm text-center shadow-2xl animate-in zoom-in-95">
            <div className="mx-auto bg-green-500/20 text-green-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 border border-green-500/50">
              <CheckCircle className="w-8 h-8" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Adicionado!</h3>
            <p className="text-white/70 mb-6">O que deseja fazer agora?</p>

            <div className="flex flex-col gap-3">
              <Button
                onClick={scrollToTop}
                className="h-14 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold w-full border border-white/20"
              >
                <Plus className="mr-2 h-5 w-5" /> Montar Outro
              </Button>
              <Button
                onClick={scrollToCheckout}
                className="btn-gold h-14 w-full text-base font-bold shadow-lg"
              >
                Finalizar Pedido
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-3 border border-white/20 shadow-lg">
            <Snowflake className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Edição Especial de Natal
            </span>
            <Snowflake className="w-4 h-4 text-yellow-400" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-xl text-white">
            MONTE SEU <span className="text-yellow-400">AÇAÍ</span>
          </h1>
        </div>

        <div className="space-y-6">
          <div id="builder-section" className="scroll-mt-24">
            <AcaiBuilder
              tamanhos={tamanhos.map((t) => ({
                ...t,
                precoBase: t.precoOriginal,
                preco:
                  isDomingo && t.precoPromocional
                    ? t.precoPromocional
                    : t.precoOriginal,
              }))}
              cremes={cremes}
              complementos={complementos}
              promocaoAtiva={isDomingo}
              onAddToCart={handleAddToCart}
            />
          </div>

          <AcaiCart items={cart} onRemove={handleRemoveFromCart} />

          {cart.length > 0 && (
            <Button
              onClick={scrollToTop}
              variant="ghost"
              className="w-full h-14 border border-dashed border-white/30 text-white hover:bg-white/10 rounded-xl flex items-center justify-center gap-2"
            >
              <Plus className="h-5 w-5" /> Adicionar mais um item
            </Button>
          )}

          <div id="checkout-section" className="pt-8 border-t border-white/10">
            <div className="grid gap-4">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="text-yellow-400 w-6 h-6" />
                  <h2 className="text-lg font-bold text-white">Seus Dados</h2>
                </div>
                <label className="block text-sm font-medium text-white/80 mb-2 ml-1">
                  Seu Nome <span className="text-yellow-400">*</span>
                </label>
                <Input
                  id="nome-cliente"
                  placeholder="Digite seu nome..."
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  className="glass-input"
                />
              </div>

              <PaymentForm
                formaPagamento={formaPagamento}
                troco={troco}
                onPaymentChange={setFormaPagamento}
                onTrocoChange={setTroco}
              />

              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-yellow-400 w-6 h-6" />
                  <h2 className="text-lg font-bold text-white">Entrega</h2>
                </div>
                <AddressForm
                  rua={endereco.rua}
                  numero={endereco.numero}
                  bairro={endereco.bairro}
                  referencia={endereco.referencia}
                  onChange={handleEnderecoChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-[#2e0238]/95 backdrop-blur-md border-t border-white/10 p-4 shadow-2xl z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-white/60 uppercase font-medium">
              Total
            </span>
            <span className="text-2xl font-black text-yellow-400">
              R$ {totalCart.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={enviarWhatsApp}
            disabled={cart.length === 0}
            className="btn-gold h-14 px-6 rounded-xl flex-1 text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-2 justify-center">
              Enviar Pedido <Send className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
