import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Product, products } from '../data';
import { ProductCard } from './ProductCard';

interface VitrinePageProps {
  onBackToHome: () => void;
  onAddToCart: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const VitrinePage: React.FC<VitrinePageProps> = ({
  onBackToHome,
  onAddToCart,
  onQuickOrder,
  onSelectProduct,
}) => {
  return (
    <div className="relative z-10 pt-24 sm:pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          type="button"
          onClick={onBackToHome}
          className="px-4 py-2 rounded-full bg-[#22040c] hover:bg-[#320713] text-rose-200 hover:text-white border border-rose-800/60 transition-all flex items-center gap-2 text-xs sm:text-sm font-bold shadow-md active:scale-95"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Início</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#26050e] border border-rose-800/60 text-rose-300 text-xs font-bold shadow-sm">
          <Sparkles size={13} className="text-amber-400" />
          <span>Vitrine Oficial</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Vitrine dos Desejos
        </h1>
      </div>

      {/* Full Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onAddToCart={onAddToCart}
            onQuickOrder={onQuickOrder}
            onClickCard={() => onSelectProduct(product)}
          />
        ))}
      </div>

      {/* Bottom CTA to WhatsApp or Cart */}
      <div className="mt-16 text-center p-8 rounded-3xl bg-gradient-to-b from-[#25050f] to-[#150207] border border-rose-800/60 max-w-2xl mx-auto shadow-2xl">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
          Deseja uma encomenda personalizada?
        </h3>
        <p className="text-xs sm:text-sm text-rose-200/80 mb-6">
          Preparamos kits sob medida para festas, casamentos, eventos ou cestas de presentes especiais.
        </p>
        <button
          type="button"
          onClick={onBackToHome}
          className="px-6 py-3 rounded-full bg-[#2d0713] hover:bg-[#3f0a1b] text-rose-200 hover:text-white border border-rose-700/60 font-bold text-xs sm:text-sm transition-all shadow-md"
        >
          ← Voltar para a Página Principal
        </button>
      </div>

    </div>
  );
};
