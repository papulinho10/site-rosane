import React from 'react';
import { Star, Quote, Heart, CheckCircle2, Eye } from 'lucide-react';
import { CustomerReview } from '../data';

interface ReviewCardProps {
  review: CustomerReview;
  onClickReview: (review: CustomerReview) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onClickReview,
}) => {
  return (
    <div
      onClick={() => onClickReview(review)}
      className="group relative w-[290px] sm:w-[340px] flex-shrink-0 p-5 sm:p-6 rounded-3xl bg-[#1d0309]/90 border border-rose-900/60 hover:border-rose-500/70 shadow-xl shadow-black/70 hover:shadow-[0_12px_35px_rgba(225,29,72,0.25)] transition-all duration-300 flex flex-col justify-between cursor-pointer select-none"
      title="Clique para ler o depoimento completo em relevo"
    >
      <div>
        {/* Stars and Verification */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(review.stars)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <span className="text-[10px] text-rose-300/70 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/40">
            {review.orderType}
          </span>
        </div>

        {/* Quote icon */}
        <Quote size={20} className="text-rose-500/40 mb-1.5" />

        {/* Review Text */}
        <p className="text-xs sm:text-sm text-rose-200/90 italic leading-relaxed line-clamp-3 mb-4">
          "{review.quote}"
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-rose-900/50 flex items-center justify-between text-xs">
        <div>
          <div className="flex items-center gap-1">
            <p className="font-serif font-bold text-white text-sm">{review.name}</p>
            <CheckCircle2 size={13} className="text-emerald-400" />
          </div>
          <p className="text-[11px] text-rose-400/80 truncate max-w-[180px] mt-0.5">
            {review.flavor}
          </p>
        </div>

        <span className="text-[11px] text-rose-400/60 group-hover:text-rose-300 transition-colors flex items-center gap-1 font-medium">
          <Eye size={12} />
          <span>Ver</span>
        </span>
      </div>
    </div>
  );
};
