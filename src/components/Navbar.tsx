import React from 'react';
import { ShoppingBag, Sparkles, Home } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  currentPage: 'home' | 'vitrine';
  onNavigateHome: () => void;
  onNavigateVitrine: () => void;
  isScrolled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  currentPage,
  onNavigateHome,
  onNavigateVitrine,
  isScrolled = true,
}) => {
  const showHeaderBar = isScrolled || currentPage === 'vitrine';

  return (
    <>
      {/* ========================================================= */}
      {/* 1. TOP NAVBAR: */}
      {/* Mobile: ONLY the clean logo centered (appears as user scrolls). */}
      {/* Desktop: Clean logo on left; Vitrine + Sacola on right. */}
      {/* ========================================================= */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          showHeaderBar 
            ? 'bg-[#140207]/95 backdrop-blur-xl border-b border-rose-900/40 shadow-xl' 
            : 'bg-transparent border-b border-transparent shadow-none pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between pointer-events-auto">
          
          {/* Logo Container - Pure logo without extra decorations or text around it */}
          <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start">
            <button 
              type="button"
              onClick={onNavigateHome}
              className={`inline-block transition-all duration-500 hover:scale-105 active:scale-95 ${
                showHeaderBar ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
              }`}
              title="Rosane - Início"
            >
              <img
                src="https://i.postimg.cc/YStsTNXP/Chat-GPT-Image-18-de-set-de-2026-10-08-30.png"
                alt="Logo Rosane"
                referrerPolicy="no-referrer"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain drop-shadow-md select-none"
              />
            </button>
          </div>

          {/* Desktop Right Actions (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-4 shrink-0 pointer-events-auto">
            
            {/* Button to Home / Vitrine dos Desejos */}
            {currentPage === 'vitrine' ? (
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-rose-200 hover:text-white bg-[#26050e] hover:bg-[#380816] border border-rose-800/50 hover:border-rose-500/60 transition-all flex items-center gap-2 shadow-sm"
              >
                <Home size={16} className="text-rose-400" />
                <span>Início</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onNavigateVitrine}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-rose-200 hover:text-white bg-[#26050e] hover:bg-[#380816] border border-rose-800/50 hover:border-rose-500/60 transition-all flex items-center gap-2 shadow-sm group"
              >
                <Sparkles size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Vitrine dos Desejos</span>
              </button>
            )}

            {/* Sacola Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="group relative h-12 px-5 rounded-full flex items-center gap-3 bg-gradient-to-r from-rose-600 via-[#e11d48] to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-bold text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(225,29,72,0.45),inset_0_1px_1.5px_rgba(255,255,255,0.4)] hover:shadow-[0_6px_25px_rgba(244,63,94,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 border border-rose-300/40"
              title="Abrir sacola de compras"
            >
              <div className="relative">
                <ShoppingBag size={18} className="text-white group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 min-w-[19px] h-[19px] px-1 rounded-full bg-amber-400 text-black text-[11px] font-black flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </div>

              <span>Sacola</span>

              {cartTotal > 0 && (
                <span className="pl-2 border-l border-white/30 text-rose-100 text-xs font-semibold">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MOBILE BOTTOM BAR (Dock): */}
      {/* Hidden when at top of hero; appears smoothly on scroll! */}
      {/* ========================================================= */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#160207]/95 backdrop-blur-2xl border-t border-rose-800/60 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] px-4 py-2 pb-[calc(0.6rem+env(safe-area-inset-bottom))] flex items-center justify-around gap-3 transition-all duration-500 transform ${
          showHeaderBar 
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        
        {/* Cardápio / Vitrine Button on Mobile */}
        {currentPage === 'vitrine' ? (
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex-1 py-2.5 px-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-[#26050e] active:bg-[#3a0815] border border-rose-800/50 text-rose-200 active:scale-95 transition-all"
          >
            <Home size={19} className="text-rose-400" />
            <span className="text-xs font-bold tracking-wide">Início</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onNavigateVitrine}
            className="flex-1 py-2.5 px-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-[#26050e] active:bg-[#3a0815] border border-rose-800/50 text-rose-200 active:scale-95 transition-all"
          >
            <Sparkles size={19} className="text-amber-400" />
            <span className="text-xs font-bold tracking-wide">Vitrine</span>
          </button>
        )}

        {/* Sacola Button on Mobile */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex-1 py-2.5 px-3 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-rose-600 via-[#e11d48] to-rose-600 text-white shadow-[0_4px_16px_rgba(225,29,72,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-rose-400/40 active:scale-95 transition-all relative"
        >
          <div className="relative">
            <ShoppingBag size={20} className="text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-400 text-black text-[10px] font-black flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </div>
          <div className="text-center sm:text-left leading-none">
            <span className="text-xs font-bold tracking-wide block">Sacola</span>
            {cartTotal > 0 && (
              <span className="text-[10px] text-rose-100 font-semibold block mt-0.5">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
        </button>

      </div>
    </>
  );
};
