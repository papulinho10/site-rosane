import React, { useState } from 'react';
import { Heart, Plus, ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '../data';

interface ProductCardProps {
  product: Product;
  index?: number;
  onAddToCart: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  onClickCard?: (product: Product) => void;
  onPauseScroller?: () => void;
  isCarouselItem?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  onAddToCart,
  onQuickOrder,
  onClickCard,
  onPauseScroller,
  isCarouselItem = false,
}) => {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPauseScroller) onPauseScroller();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleQuick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPauseScroller) onPauseScroller();
    onQuickOrder(product);
  };

  const handleCardClick = () => {
    if (onPauseScroller) onPauseScroller();
    if (onClickCard) {
      onClickCard(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative rounded-3xl overflow-hidden bg-[#1e040b]/90 border border-rose-900/50 hover:border-rose-500/70 shadow-xl shadow-black/70 hover:shadow-[0_15px_40px_rgba(225,29,72,0.3)] transition-all duration-300 flex flex-col justify-between cursor-pointer ${
        isCarouselItem ? 'w-[280px] sm:w-[320px] flex-shrink-0' : 'w-full'
      }`}
      title="Clique para ver detalhes em relevo"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-rose-950/40">
        <img
          src={product.image}
          alt={product.name}
          draggable="false"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out select-none pointer-events-none"
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e040b] via-transparent to-black/20" />

        {/* Tag badge if present */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md border border-rose-400/30 flex items-center gap-1">
            <Heart size={11} fill="currentColor" />
            <span>{product.tag}</span>
          </div>
        )}

        {/* Price tag */}
        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-white border border-rose-600/50 text-xs sm:text-sm font-black px-3 py-1 rounded-full shadow-lg">
          {product.price}
        </div>

        {/* Hover Hint Overlay to view relief */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 rounded-full bg-[#1b0309]/90 text-rose-200 border border-rose-500/60 text-xs font-bold flex items-center gap-1.5 shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-transform">
            <Eye size={14} className="text-rose-400" />
            <span>Ver Detalhes</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-rose-200 transition-colors mb-2 leading-snug">
            {product.name}
          </h3>
          <div className="mb-4 bg-black/35 border border-rose-900/50 rounded-xl p-2.5 text-left">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1.5">
              Ingredientes &amp; Composição:
            </span>
            <ul className="space-y-1 text-xs text-rose-200/90 font-normal">
              {product.ingredients.map((item, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons - Online Store Direct Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-rose-900/50">
          {/* Adicionar à Sacola (+ Feedback) */}
          <button
            type="button"
            onClick={handleAdd}
            className={`flex-1 h-10 sm:h-11 px-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 border ${
              addedAnimation
                ? 'bg-emerald-600 border-emerald-400 text-white scale-98'
                : 'bg-[#280610] hover:bg-[#380816] text-rose-100 hover:text-white border-rose-800/60 hover:border-rose-500/80'
            }`}
            title="Adicionar à sacola de compras"
          >
            {addedAnimation ? (
              <>
                <Check size={15} className="text-white" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <Plus size={15} className="text-rose-400" />
                <span>Adicionar</span>
              </>
            )}
          </button>

          {/* Comprar Agora (Direct to WhatsApp Checkout) */}
          <button
            type="button"
            onClick={handleQuick}
            className="group/btn relative flex-1 h-10 sm:h-11 px-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-[#e11d48] to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_4px_16px_rgba(225,29,72,0.4),inset_0_1px_1.5px_rgba(255,255,255,0.35)] hover:shadow-[0_6px_22px_rgba(244,63,94,0.6)] border border-rose-300/40 overflow-hidden"
          >
            <ShoppingBag size={14} className="text-white shrink-0" />
            <span className="tracking-wide">Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
