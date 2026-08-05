import React from 'react';
import { X, CheckCircle, ShoppingBag, MessageCircle, ShieldCheck, Star, Clock, Zap, ExternalLink } from 'lucide-react';
import { LinkItem } from '../types';
import { Badge } from './Badge';
import { formatRupiah } from '../utils/storage';

interface ProductDetailModalProps {
  item: LinkItem | null;
  onClose: () => void;
  onAddToCart: (item: LinkItem) => void;
  onBuyNow: (item: LinkItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Image banner */}
        <div className="relative h-52 sm:h-60 w-full bg-slate-800 shrink-0">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900 to-slate-900 text-white font-bold text-xl">
              {item.title}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/40"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              {item.category}
            </span>
            {item.badge && <Badge text={item.badge} color={item.badgeColor || 'amber'} />}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              {item.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating} / 5.0 Rating</span>
                </div>
              )}
              {item.salesCount && (
                <span className="text-slate-300">• {item.salesCount}+ Terjual</span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight break-words whitespace-normal drop-shadow-md">{item.title}</h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-200">
          {/* Price Box */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30">
            <div>
              <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                Harga Paket Spesial
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-emerald-400">
                  {formatRupiah(item.price)}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatRupiah(item.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>Garansi Respon</span>
            </div>
          </div>

          {/* Subtitle */}
          {item.subtitle && (
            <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              {item.subtitle}
            </p>
          )}

          {/* Description */}
          {item.description && (
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
              <p>{item.description}</p>
            </div>
          )}

          {/* Features */}
          {item.features && item.features.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Yang Anda Dapatkan Dalam Paket Ini:
              </h4>
              <ul className="space-y-2">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              if (item.url && item.url.trim().length > 0) {
                let targetUrl = item.url.trim();
                if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
                  targetUrl = 'https://' + targetUrl;
                }
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
              } else {
                onBuyNow(item);
              }
              onClose();
            }}
            className="w-full py-3.5 px-4 rounded-xl text-sm font-black bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
          >
            <span>BELI SEKARANG / AKSES LINK SEKARANG</span>
            <ExternalLink className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
