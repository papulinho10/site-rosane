import React, { useState } from 'react';
import { X, Heart, Plus, Minus, ShoppingBag, Send, Check, Sparkles } from 'lucide-react';
import { Product } from '../data';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onQuickOrder: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onQuickOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1200);
  };

  const handleBuy = () => {
    onQuickOrder(product, quantity);
  };

  const totalPrice = (product.numericPrice * quantity).toFixed(2).replace('.', ',');

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/45 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      {/* 
        Elevated Relief Card:
        Layered lighting, high-contrast borders, 3D relief drop-shadows, glossy inner bevel
      */}
      <div 
        className="relative w-full max-w-2xl my-auto rounded-3xl bg-gradient-to-b from-[#25050f] via-[#1a0309] to-[#120206] border border-rose-500/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_45px_rgba(225,29,72,0.35)] p-5 sm:p-7 text-rose-100 ring-1 ring-white/15 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(225, 29, 72, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.35)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#150207]/90 hover:bg-[#320713] text-rose-300 hover:text-white border border-rose-600/50 shadow-lg transition-all active:scale-90"
          title="Fechar"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Image in Relief */}
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-square border border-rose-700/60 shadow-[0_12px_30px_rgba(0,0,0,0.8)] bg-black/40 group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#150207]/80 via-transparent to-black/30" />

            {/* Tag Badge */}
            {product.tag && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-rose-400/40 flex items-center gap-1.5">
                <Heart size={12} fill="currentColor" />
                <span>{product.tag}</span>
              </div>
            )}

            {/* Price Pill */}
            <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white border border-rose-500/60 text-base font-black px-3.5 py-1 rounded-full shadow-lg">
              {product.price}
            </div>
          </div>

          {/* Right Column: Detailed Product Info */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-rose-400 font-bold uppercase tracking-wider mb-1">
                <Sparkles size={13} className="text-amber-400" />
                <span>Morango do Amor Artesanal</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h3>
            </div>

            {/* Ingredientes & Composição */}
            <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-4 space-y-2.5 shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400" />
                <span>Ingredientes &amp; Composição:</span>
              </span>

              <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm text-rose-100 pt-1">
                {product.ingredients.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span className="font-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-3 border-t border-rose-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-rose-300 block font-medium">Quantidade:</span>
                  <span className="text-lg font-bold font-serif text-white">
                    Total: R$ {totalPrice}
                  </span>
                </div>

                {/* Quantity Pill */}
                <div className="flex items-center gap-2 bg-[#120206] border border-rose-700/60 rounded-full p-1.5 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-full bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white flex items-center justify-center transition-all"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold px-2 text-white min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-8 h-8 rounded-full bg-rose-950/80 hover:bg-rose-900 text-rose-300 hover:text-white flex items-center justify-center transition-all"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 h-12 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 border ${
                    addedAnimation
                      ? 'bg-emerald-600 border-emerald-400 text-white scale-98'
                      : 'bg-[#2b0611] hover:bg-[#3c0918] text-rose-100 hover:text-white border-rose-800/70 hover:border-rose-500'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} className="text-white" />
                      <span>Adicionado à Sacola!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={17} className="text-rose-400" />
                      <span>Adicionar à Sacola</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuy}
                  className="flex-1 h-12 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-[#e11d48] to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_20px_rgba(225,29,72,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.4)] hover:shadow-[0_6px_25px_rgba(244,63,94,0.65)] border border-rose-300/40 active:scale-98"
                >
                  <Send size={16} className="text-white" />
                  <span>Comprar Agora</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
