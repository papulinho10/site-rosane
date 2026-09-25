import React, { useState } from 'react';
import { Heart, X, ShoppingBag, MapPin, Send, Plus, Minus, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';
import { Product } from '../data';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  whatsappNumber: string;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsappNumber,
}) => {
  const [deliveryType, setDeliveryType] = useState<'entrega' | 'retirada'>('entrega');
  const [customerName, setCustomerName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, item) => {
    return acc + item.product.numericPrice * item.quantity;
  }, 0);

  const handleBuyNow = () => {
    setErrorMsg('');

    if (cart.length === 0) {
      setErrorMsg('Sua sacola está vazia. Adicione produtos para comprar.');
      return;
    }

    if (deliveryType === 'entrega') {
      if (!streetAddress.trim() || !neighborhood.trim()) {
        setErrorMsg('Por favor, informe a Rua e o Bairro para calcularmos o valor da tele-entrega.');
        return;
      }
    }

    // Build the detailed WhatsApp message
    let message = `🍓 *NOVO PEDIDO - ROSANE* 🍓\n`;
    message += `------------------------------------\n`;
    message += `🛍️ *ITENS NA SACOLA:*\n`;

    cart.forEach((item) => {
      const itemSubtotal = (item.product.numericPrice * item.quantity).toFixed(2).replace('.', ',');
      message += `• ${item.quantity}x ${item.product.name} (R$ ${itemSubtotal})\n`;
    });

    message += `------------------------------------\n`;
    message += `💰 *Subtotal dos Produtos:* R$ ${totalAmount.toFixed(2).replace('.', ',')}\n\n`;

    message += `📍 *FORMA DE RECEBIMENTO:*\n`;
    if (deliveryType === 'entrega') {
      message += `🛵 *Entrega (Tele-entrega)*\n`;
      message += `🏠 *Endereço para cálculo da tele:*\n`;
      message += `${streetAddress.trim()}${addressNumber.trim() ? ', nº ' + addressNumber.trim() : ''}\n`;
      message += `Bairro: ${neighborhood.trim()}\n`;
      if (complement.trim()) {
        message += `Complemento/Ref: ${complement.trim()}\n`;
      }
      message += `*(Aguardando cálculo do valor da tele-entrega)*\n\n`;
    } else {
      message += `🏪 *Retirada no Ateliê / Loja*\n\n`;
    }

    if (customerName.trim()) {
      message += `👤 *Nome do Cliente:* ${customerName.trim()}\n`;
    }

    if (notes.trim()) {
      message += `💌 *Observação / Dedicatória:*\n"${notes.trim()}"\n`;
    }

    message += `------------------------------------\n`;
    message += `_Olá Rosane! Montei meu pedido na sacola da loja online e gostaria de finalizar!_ ❤️`;

    // Direct WhatsApp redirection
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-md animate-fade-in overflow-y-auto" onClick={onClose}>
      <div 
        className="relative w-full max-w-xl my-auto rounded-3xl bg-gradient-to-b from-[#24050f] via-[#1a0309] to-[#120206] border border-rose-500/60 text-rose-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_45px_rgba(225,29,72,0.35)] ring-1 ring-white/15 p-5 sm:p-7 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(225, 29, 72, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.35)',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                Sua Sacola de Compras
              </h2>
              <p className="text-xs text-rose-300/80">
                {cart.length === 0 ? 'Sacola vazia' : `${cart.length} item(ns) selecionado(s)`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-rose-950/80 text-rose-300 hover:text-white hover:bg-rose-900 border border-rose-800/40 transition-colors"
            title="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto py-4 space-y-5 pr-1 flex-1">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-rose-950/60 border border-rose-800/40 flex items-center justify-center mx-auto text-rose-400 mb-3">
                <ShoppingBag size={28} />
              </div>
              <p className="text-white font-medium text-base">Sua sacola está vazia no momento</p>
              <p className="text-rose-300/70 text-xs mt-1 mb-6">
                Escolha seus morangos do amor favoritos no cardápio.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold text-sm shadow-md"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            <>
              {/* Product List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Produtos Selecionados
                </span>
                
                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id} 
                      className="p-3 rounded-2xl bg-[#24050e] border border-rose-900/50 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-rose-800/50 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-serif text-sm font-semibold text-white truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-rose-300 font-bold mt-0.5">
                            R$ {(item.product.numericPrice * item.quantity).toFixed(2).replace('.', ',')}
                            <span className="text-[11px] text-rose-400/70 font-normal ml-1">
                              ({item.product.price} un.)
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1 bg-[#160207] border border-rose-800/60 rounded-full p-1">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-rose-300 hover:text-white rounded-full hover:bg-rose-900 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold px-1 text-white min-w-[18px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-rose-300 hover:text-white rounded-full hover:bg-rose-900 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-rose-400 hover:text-white hover:bg-rose-900/50 rounded-lg transition-colors"
                          title="Remover item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtotal Ribbon */}
              <div className="flex justify-between items-center bg-[#25050e] px-4 py-3 rounded-2xl border border-rose-800/50 shadow-inner">
                <div>
                  <span className="text-xs text-rose-300/80 block font-medium">Subtotal dos produtos</span>
                  <span className="text-[11px] text-rose-400">
                    {deliveryType === 'entrega' ? '+ Taxa da tele a calcular' : 'Retirada sem custo adicional'}
                  </span>
                </div>
                <span className="text-2xl font-bold font-serif text-white">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Delivery / Pickup Choice */}
              <div className="space-y-3 pt-1">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Como deseja receber seu pedido?
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryType('entrega');
                      setErrorMsg('');
                    }}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                      deliveryType === 'entrega'
                        ? 'bg-gradient-to-b from-rose-600 to-rose-700 border-rose-400 text-white shadow-[0_4px_16px_rgba(225,29,72,0.5)]'
                        : 'bg-[#25050e] border-rose-900/60 text-rose-300 hover:text-white hover:border-rose-700'
                    }`}
                  >
                    <span className="text-base">🛵</span>
                    <span>Tele-entrega</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeliveryType('retirada');
                      setErrorMsg('');
                    }}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                      deliveryType === 'retirada'
                        ? 'bg-gradient-to-b from-rose-600 to-rose-700 border-rose-400 text-white shadow-[0_4px_16px_rgba(225,29,72,0.5)]'
                        : 'bg-[#25050e] border-rose-900/60 text-rose-300 hover:text-white hover:border-rose-700'
                    }`}
                  >
                    <span className="text-base">🏪</span>
                    <span>Vou Buscar (Retirada)</span>
                  </button>
                </div>

                {/* Delivery Address Fields when Entrega is selected */}
                {deliveryType === 'entrega' ? (
                  <div className="p-4 rounded-2xl bg-[#22040c] border border-rose-800/60 space-y-3 mt-2">
                    <div className="flex items-start gap-2 text-xs text-rose-300/90 leading-relaxed bg-rose-950/60 p-2.5 rounded-xl border border-rose-900/40">
                      <MapPin size={16} className="text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white">Endereço para entrega:</strong> Escreva seu endereço completo para que possamos calcular o valor exato da tele para você.
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-semibold text-rose-300 mb-1">
                          Rua / Avenida *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Rua das Flores"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#160207] border border-rose-800/60 text-white placeholder-rose-400/40 text-xs focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div className="col-span-1">
                        <label className="block text-[11px] font-semibold text-rose-300 mb-1">
                          Número *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: 120"
                          value={addressNumber}
                          onChange={(e) => setAddressNumber(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#160207] border border-rose-800/60 text-white placeholder-rose-400/40 text-xs focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-rose-300 mb-1">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Centro"
                          value={neighborhood}
                          onChange={(e) => setNeighborhood(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#160207] border border-rose-800/60 text-white placeholder-rose-400/40 text-xs focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-rose-300 mb-1">
                          Complemento / Ref.
                        </label>
                        <input
                          type="text"
                          placeholder="Apto 301, bloco B..."
                          value={complement}
                          onChange={(e) => setComplement(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#160207] border border-rose-800/60 text-white placeholder-rose-400/40 text-xs focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-[#22040c] border border-rose-900/50 text-xs text-rose-300/80">
                    <p className="text-white font-semibold">📍 Retirada no Ateliê</p>
                    <p className="mt-1">
                      Você pode buscar seu pedido diretamente conosco. Combinaremos o horário exato no WhatsApp.
                    </p>
                  </div>
                )}
              </div>

              {/* Customer Name & Notes */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-rose-300 mb-1">
                    Seu Nome (opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Como podemos te chamar?"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#24050e] border border-rose-800/60 text-white placeholder-rose-400/40 text-xs focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rose-300 mb-1">
                    Observações ou Dedicatória no Cartão (opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Alguma instrução especial ou mensagem para cartão?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#24050e] border border-rose-800/60 text-white placeholder-rose-400/40 text-xs focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>
              </div>

              {/* Error Message if needed */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle size={16} className="text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Actions Footer: Continuar Comprando & Comprar Agora */}
        {cart.length > 0 && (
          <div className="pt-3 border-t border-rose-900/50 flex flex-col sm:flex-row items-center gap-2.5">
            {/* Continuar Comprando Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full text-xs font-bold text-rose-200 hover:text-white bg-[#26050e] hover:bg-[#380816] border border-rose-800/60 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <ArrowLeft size={15} />
              <span>Continuar Comprando</span>
            </button>

            {/* Comprar Agora Button -> Direct to WhatsApp */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="group relative flex-1 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-rose-600 via-[#e11d48] to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-bold text-sm sm:text-base shadow-[0_6px_25px_rgba(225,29,72,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)] hover:shadow-[0_8px_32px_rgba(244,63,94,0.7)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 flex items-center justify-center gap-2 border border-rose-300/40 overflow-hidden"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
              <Send size={16} className="text-white group-hover:translate-x-0.5 transition-transform" />
              <span>Comprar Agora</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
