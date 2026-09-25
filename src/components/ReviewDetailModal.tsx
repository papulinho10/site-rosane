import React from 'react';
import { X, Star, Quote, Heart, MapPin, CheckCircle2 } from 'lucide-react';
import { CustomerReview } from '../data';

interface ReviewDetailModalProps {
  review: CustomerReview | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewDetailModal: React.FC<ReviewDetailModalProps> = ({
  review,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !review) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/45 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      {/* Elevated Relief Card */}
      <div 
        className="relative w-full max-w-lg my-auto rounded-3xl bg-gradient-to-b from-[#24050f] via-[#1a0309] to-[#120206] border border-rose-500/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_45px_rgba(225,29,72,0.35)] p-6 sm:p-8 text-rose-100 ring-1 ring-white/15 max-h-[90vh] overflow-y-auto"
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

        {/* Stars */}
        <div className="flex items-center gap-1.5 text-amber-400 mb-4">
          {[...Array(review.stars)].map((_, i) => (
            <Star key={i} size={22} fill="currentColor" />
          ))}
          <span className="text-xs font-bold text-amber-300 ml-1.5 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
            5.0 Estrelas
          </span>
        </div>

        {/* Quote Icon */}
        <Quote size={36} className="text-rose-500/40 mb-3" />

        {/* Full Review Content */}
        <p className="font-serif text-lg sm:text-xl text-white italic leading-relaxed mb-6">
          "{review.fullReview || review.quote}"
        </p>

        {/* Flavor Badge */}
        <div className="p-3 rounded-2xl bg-[#140207] border border-rose-800/60 mb-6 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-rose-300">
            <Heart size={16} className="text-rose-500 fill-rose-500 shrink-0" />
            <span>Sabor Escolhido:</span>
          </div>
          <span className="font-bold text-white text-right">{review.flavor}</span>
        </div>

        {/* Author Footer */}
        <div className="flex items-center justify-between border-t border-rose-900/60 pt-4 text-xs">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-white text-base">{review.name}</span>
              <span title="Cliente Verificado">
                <CheckCircle2 size={15} className="text-emerald-400" />
              </span>
            </div>
            <p className="text-rose-400 text-xs mt-0.5">{review.role}</p>
          </div>

          <div className="text-right text-rose-300/80">
            <div className="flex items-center gap-1 justify-end">
              <MapPin size={13} className="text-rose-400" />
              <span>{review.orderType}</span>
            </div>
            <p className="text-[11px] text-rose-400/60 mt-0.5">{review.date}</p>
          </div>
        </div>

      </div>
    </div>
  );
};
