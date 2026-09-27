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
  const featuredProducts = products.filter((p) => p.isFeatured);
  const regularProducts = products.filter((p) => !p.isFeatured);

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

      {/* Featured Section: Morangos Cravejados - Mais Vendidos */}
      {featuredProducts.length > 0 && (
        <div className="mb-12 sm:mb-14 p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-[#2b0612]/90 via-[#1d030b]/95 to-[#140207] border border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(245,158,11,0.18)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-500/25">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-[#1a0308] text-xs font-extrabold uppercase tracking-wider shadow-md">
                <Sparkles size={13} fill="currentColor" />
                <span>Mais Vendidos</span>
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-amber-100 tracking-tight">
                Morangos Cravejados em Destaque
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
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
        </div>
      )}

      {/* Full Catalog Grid */}
      <div className="mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
          Tradicionais &amp; Chocolates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {regularProducts.map((product, index) => (
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
