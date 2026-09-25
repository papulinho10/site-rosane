import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  ChevronRight, 
  ChevronDown,
  Star,
  Quote,
  Instagram,
  Phone,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Flame,
  ShoppingBag
} from 'lucide-react';
import { products, Product, reviews, CustomerReview } from './data';
import { MatteBordeauxBackground } from './components/MatteBordeauxBackground';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ReviewCard } from './components/ReviewCard';
import { SmoothHorizontalScroller } from './components/SmoothHorizontalScroller';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ReviewDetailModal } from './components/ReviewDetailModal';
import { VitrinePage } from './components/VitrinePage';
import { OrderModal, CartItem } from './components/OrderModal';

export default function App() {
  const whatsappNumber = "5511999999999";
  const [currentPage, setCurrentPage] = useState<'home' | 'vitrine'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 75;

  // Selected for 3D Relief Modals
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [selectedReviewForModal, setSelectedReviewForModal] = useState<CustomerReview | null>(null);
  const [isProductsPaused, setIsProductsPaused] = useState(false);
  const [isReviewsPaused, setIsReviewsPaused] = useState(false);
  const productsPauseTimerRef = useRef<number | null>(null);
  const reviewsPauseTimerRef = useRef<number | null>(null);

  const handleProductClick = (product: Product) => {
    // Pausa durante 4 segundos ao clicar e depois volta a rolar
    setIsProductsPaused(true);
    if (productsPauseTimerRef.current) clearTimeout(productsPauseTimerRef.current);
    productsPauseTimerRef.current = window.setTimeout(() => {
      setIsProductsPaused(false);
    }, 4000);

    setSelectedProductForModal(product);
  };

  const handleReviewClick = (review: CustomerReview) => {
    // Pausa durante 4 segundos ao clicar nas avaliações e depois volta a rolar
    setIsReviewsPaused(true);
    if (reviewsPauseTimerRef.current) clearTimeout(reviewsPauseTimerRef.current);
    reviewsPauseTimerRef.current = window.setTimeout(() => {
      setIsReviewsPaused(false);
    }, 4000);

    setSelectedReviewForModal(review);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleQuickOrder = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: Math.max(item.quantity, quantity) }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setSelectedProductForModal(null);
    setIsOrderModalOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.numericPrice * item.quantity, 0);

  const navigateToVitrine = () => {
    setCurrentPage('vitrine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#150207] text-rose-100 font-sans selection:bg-rose-600 selection:text-white relative pb-28 md:pb-12">
      
      {/* 1. Deep Matte Bordeaux Atmosphere with Soft Glowing Heart (Always running in background) */}
      <MatteBordeauxBackground />

      {/* 2. Top Header & Mobile Bottom Dock */}
      <Navbar
        cartCount={totalCartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsOrderModalOpen(true)}
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateVitrine={navigateToVitrine}
        isScrolled={isScrolled}
      />

      {/* ========================================================= */}
      {/* 3. DEDICATED VITRINE PAGE OR HOME PAGE                    */}
      {/* ========================================================= */}
      {currentPage === 'vitrine' ? (
        <VitrinePage
          onBackToHome={navigateToHome}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onQuickOrder={(p) => handleQuickOrder(p, 1)}
          onSelectProduct={(p) => setSelectedProductForModal(p)}
        />
      ) : (
        /* HOME PAGE */
        <main className="relative z-10">
          
          {/* ========================================================= */}
          {/* 1. HERO BANNER: FULL SCREEN WITH LOGO AT CENTER OF HEART  */}
          {/* ========================================================= */}
          <section className="h-[100dvh] min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            
            {/* Centered Heart & Logo Composition */}
            <div 
              style={{
                transform: `translateY(-${Math.min(scrollY * 0.45, 140)}px) scale(${Math.max(0.7, 1 - (scrollY / 250) * 0.3)})`,
                opacity: Math.max(0, 1 - scrollY / 150),
              }}
              className="relative will-change-transform transition-opacity duration-75 flex items-center justify-center select-none"
            >
              {/* Luminous Pulsing Heart - Centered directly around the logo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 translate-y-[11%] sm:translate-y-[12%]">
                {/* Outer Ambient Glow Halo that pulses softly with the heart */}
                <motion.div
                  className="absolute w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] lg:w-[720px] lg:h-[720px] rounded-full blur-[80px] sm:blur-[110px] md:blur-[140px]"
                  animate={{
                    scale: [0.96, 1.05, 0.98, 1.07, 0.96],
                    opacity: [0.4, 0.65, 0.45, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background: 'radial-gradient(circle, rgba(225,29,72,0.6) 0%, rgba(159,18,57,0.35) 50%, transparent 75%)',
                  }}
                />

                {/* The Heart Silhouette - clearly visible, velvety and framing the logo */}
                <motion.div
                  animate={{
                    scale: [0.98, 1.04, 1.0, 1.05, 0.98],
                    opacity: [0.78, 0.94, 0.82, 0.96, 0.78],
                  }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative filter blur-[6px] sm:blur-[8px] md:blur-[10px]"
                >
                  <svg
                    className="w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] md:w-[560px] md:h-[560px] lg:w-[640px] lg:h-[640px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Vibrant deep ruby & crimson gradient fill */}
                      <radialGradient id="heroHeartGlow" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#fb7185" stopOpacity="0.95" />
                        <stop offset="25%" stopColor="#f43f5e" stopOpacity="0.9" />
                        <stop offset="55%" stopColor="#e11d48" stopOpacity="0.82" />
                        <stop offset="85%" stopColor="#9f1239" stopOpacity="0.65" />
                        <stop offset="100%" stopColor="#4c0519" stopOpacity="0.25" />
                      </radialGradient>

                      {/* Luminous inner core */}
                      <radialGradient id="heroHeartCenterLight" cx="50%" cy="38%" r="40%">
                        <stop offset="0%" stopColor="#fecdd3" stopOpacity="0.95" />
                        <stop offset="40%" stopColor="#f43f5e" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#be123c" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Base Heart Silhouette */}
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="url(#heroHeartGlow)"
                    />

                    {/* Radiant core layer that brings out the heart center */}
                    <path
                      d="M12 18.2l-1.15-1.05C6.2 13.5 3.5 11.0 3.5 8.3c0-2.4 1.9-4.3 4.3-4.3 1.5 0 2.9.7 3.8 1.8.9-1.1 2.3-1.8 3.8-1.8 2.4 0 4.3 1.9 4.3 4.3 0 2.7-2.7 5.2-7.35 8.85L12 18.2z"
                      fill="url(#heroHeartCenterLight)"
                    />
                  </svg>
                </motion.div>

                {/* Central glowing warmth focused behind the logo */}
                <motion.div
                  animate={{
                    scale: [0.95, 1.08, 0.98, 1.10, 0.95],
                    opacity: [0.45, 0.72, 0.5, 0.75, 0.45],
                  }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-44 h-44 sm:w-60 sm:h-60 md:w-76 md:h-76 rounded-full blur-[40px] sm:blur-[55px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 140, 170, 0.7) 0%, rgba(225, 29, 72, 0.35) 50%, transparent 80%)',
                  }}
                />
              </div>

              {/* Logo - Perfectly scaled and centered right in the heart */}
              <div className="relative z-10 p-2 flex items-center justify-center">
                <img
                  src="https://i.postimg.cc/YStsTNXP/Chat-GPT-Image-18-de-set-de-2026-10-08-30.png"
                  alt="Rosane Confeitaria Artesanal"
                  referrerPolicy="no-referrer"
                  className="w-40 sm:w-48 md:w-56 lg:w-60 max-w-[62vw] h-auto object-contain drop-shadow-[0_14px_32px_rgba(0,0,0,0.92)] drop-shadow-[0_0_25px_rgba(244,63,94,0.4)]"
                />
              </div>
            </div>

            {/* Subtle Scroll Cue at the bottom of the full screen */}
            <div 
              className={`absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 ${
                scrollY > 30 ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-75'
              }`}
            >
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-rose-300/80 font-semibold">
                Deslize para conhecer
              </span>
              <ChevronDown size={20} className="text-rose-400 animate-bounce" />
            </div>
          </section>

          {/* ========================================================= */}
          {/* 2. CUIDADO EM CADA DETALHE SECTION                        */}
          {/* ========================================================= */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto">
            <div className="p-7 sm:p-12 rounded-3xl bg-gradient-to-b from-[#22040c]/90 via-[#190308]/95 to-[#120206] border border-rose-900/60 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-[2px] bg-gradient-to-r from-transparent via-rose-500/80 to-transparent" />
              
              <span className="inline-block text-xs font-bold text-rose-400/90 tracking-widest uppercase mb-3">
                Confeitaria Artesanal
              </span>

              {/* Título: Cuidado em Cada Detalhe */}
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
                Cuidado em Cada Detalhe
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-6 border-t border-rose-900/50 text-center">
                <div className="p-5 rounded-2xl bg-[#170308]/80 border border-rose-900/40 hover:border-rose-700/60 transition-colors flex items-center justify-center">
                  <p className="font-serif font-bold text-rose-100 text-base flex justify-center items-center gap-2">
                    <span>🍓</span> <span>Morangos Frescos</span>
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#170308]/80 border border-rose-900/40 hover:border-rose-700/60 transition-colors flex items-center justify-center">
                  <p className="font-serif font-bold text-rose-100 text-base flex justify-center items-center gap-2">
                    <span>🍫</span> <span>Chocolate de Qualidade</span>
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#170308]/80 border border-rose-900/40 hover:border-rose-700/60 transition-colors flex items-center justify-center">
                  <p className="font-serif font-bold text-rose-100 text-base flex justify-center items-center gap-2">
                    <span>✨</span> <span>100% Artesanal</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* 3. HORIZONTAL AUTO-SCROLLING PRODUCTS SHOWCASE (INFINITE) */}
          {/* ========================================================= */}
          <section className="py-6 sm:py-10 px-4 sm:px-6 max-w-7xl mx-auto">
            
            {/* Header with Title and Link to Full Page */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  Vitrine dos Desejos
                </h2>
              </div>

              <button
                type="button"
                onClick={navigateToVitrine}
                className="self-start sm:self-auto px-4 py-2 rounded-full bg-[#26050e] hover:bg-[#380816] text-rose-200 hover:text-white border border-rose-800/60 hover:border-rose-500/80 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm group"
              >
                <span>Ver Vitrine</span>
                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Seamless Infinite Scroller with Fluid Drag and Progress Bar */}
            <SmoothHorizontalScroller 
              speed={1.35}
              isPaused={isProductsPaused || !!selectedProductForModal}
              pauseOnClick={true}
              pauseDurationMs={4000}
            >
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isCarouselItem={true}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickOrder={(p) => handleQuickOrder(p, 1)}
                  onClickCard={handleProductClick}
                  onPauseScroller={() => setIsProductsPaused(true)}
                />
              ))}
            </SmoothHorizontalScroller>

          </section>

          {/* ========================================================= */}
          {/* 4. HORIZONTAL AUTO-SCROLLING REVIEWS SHOWCASE (INFINITE)  */}
          {/* ========================================================= */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-rose-900/40 bg-[#120206]/50">
            <div className="max-w-7xl mx-auto">
              
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="flex justify-center gap-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  O Que Dizem Nossos Clientes
                </h2>
              </div>

              {/* Seamless Infinite Scroller for Reviews */}
              <SmoothHorizontalScroller 
                speed={1.05}
                isPaused={isReviewsPaused}
                pauseOnClick={true}
                pauseDurationMs={4000}
              >
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onClickReview={handleReviewClick}
                  />
                ))}
              </SmoothHorizontalScroller>

            </div>
          </section>

          {/* ========================================================= */}
          {/* 6. CALL TO ACTION & ORDER HIGHLIGHT                       */}
          {/* ========================================================= */}
          <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#25050f] via-[#1b030a] to-[#120206] border border-rose-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(225,29,72,0.25)]">
              <Sparkles size={28} className="text-amber-400 mx-auto mb-3" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
                Pronto para se apaixonar?
              </h3>
              
              <button
                type="button"
                onClick={navigateToVitrine}
                className="h-12 px-8 rounded-full bg-gradient-to-r from-rose-600 via-[#e11d48] to-rose-600 hover:from-rose-500 hover:to-rose-700 text-white font-bold text-sm transition-all duration-300 shadow-xl border border-rose-300/40 inline-flex items-center gap-2"
              >
                <span>Explorar Vitrine</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

        </main>
      )}

      {/* ========================================================= */}
      {/* 7. FOOTER                                                 */}
      {/* ========================================================= */}
      <footer className="relative z-10 border-t border-rose-900/40 py-8 px-4 text-center text-xs text-rose-400/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif font-bold text-white text-sm">
            Rosane • Morangos do Amor Artesanais
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-rose-300">
              <Heart size={14} className="text-rose-500 fill-rose-500" />
              <span>Feito sob encomenda com amor</span>
            </span>
          </div>
          <p className="text-[11px] text-rose-400/60">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 8. 3D RELIEF MODAL: PRODUCT DETAIL                        */}
      {/* Background blurred, but animations & scrollers continue! */}
      {/* ========================================================= */}
      <ProductDetailModal
        product={selectedProductForModal}
        isOpen={!!selectedProductForModal}
        onClose={() => {
          setSelectedProductForModal(null);
          setIsProductsPaused(false);
        }}
        onAddToCart={handleAddToCart}
        onQuickOrder={handleQuickOrder}
      />

      {/* ========================================================= */}
      {/* 9. 3D RELIEF MODAL: REVIEW DETAIL                         */}
      {/* Background blurred, but animations & scrollers continue! */}
      {/* ========================================================= */}
      <ReviewDetailModal
        review={selectedReviewForModal}
        isOpen={!!selectedReviewForModal}
        onClose={() => {
          setSelectedReviewForModal(null);
          setIsReviewsPaused(false);
        }}
      />

      {/* ========================================================= */}
      {/* 10. DIRECT WHATSAPP ORDER & CART MODAL                     */}
      {/* ========================================================= */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsappNumber={whatsappNumber}
      />

    </div>
  );
}
