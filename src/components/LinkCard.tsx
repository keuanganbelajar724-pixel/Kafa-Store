import React from 'react';
import { ExternalLink, ShoppingBag, Eye, ArrowRight, MessageCircle, Users } from 'lucide-react';
import { LinkItem } from '../types';
import { Badge } from './Badge';
import { formatRupiah } from '../utils/storage';

interface LinkCardProps {
  item: LinkItem;
  onViewDetail: (item: LinkItem) => void;
  onAddToCart: (item: LinkItem) => void;
  onBuyNow: (item: LinkItem) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  item,
  onViewDetail,
  onAddToCart,
  onBuyNow,
}) => {
  const isProduct = item.type === 'product';
  const isConsultation = item.type === 'consultation';
  const isCommunity = item.type === 'community';

  return (
    <div className="group relative w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md hover:bg-white dark:hover:bg-slate-900 rounded-2xl border border-white/60 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-center p-3.5 sm:p-4 gap-3.5 sm:gap-4">
      {/* Thumbnail Image */}
      <div className="relative w-full sm:w-20 h-24 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-emerald-600 dark:text-emerald-400">
            {isConsultation ? (
              <MessageCircle className="w-8 h-8" />
            ) : isCommunity ? (
              <Users className="w-8 h-8" />
            ) : (
              <ShoppingBag className="w-8 h-8" />
            )}
          </div>
        )}

        {/* Badge Overlay for Mobile Image or Corner */}
        {item.badge && (
          <div className="absolute top-2 left-2 sm:hidden">
            <Badge text={item.badge} color={item.badgeColor || 'emerald'} />
          </div>
        )}
      </div>

      {/* Content Info */}
      <div className="flex-1 text-left w-full min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white break-words whitespace-normal leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {item.title}
          </h3>

          {item.badge && (
            <div className="hidden sm:block">
              <Badge text={item.badge} color={item.badgeColor || 'emerald'} />
            </div>
          )}
        </div>

        {item.subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 break-words whitespace-normal leading-relaxed mb-2">
            {item.subtitle}
          </p>
        )}

        {/* Price Tag if Product */}
        {isProduct && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              {formatRupiah(item.price)}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatRupiah(item.originalPrice)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 flex-wrap sm:flex-nowrap">
        {isProduct ? (
          <>
            <button
              onClick={() => onViewDetail(item)}
              className="flex-1 sm:flex-none px-2.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1"
              title="Lihat Detail Produk"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Detail</span>
            </button>

            <button
              onClick={() => onBuyNow(item)}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all flex items-center justify-center gap-1 shadow-sm hover:shadow"
              title="Checkout & Pesan Sekarang"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Checkout</span>
            </button>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-all flex items-center justify-center gap-1"
                title="Buka Link Website Produk"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </>
        ) : (
          <a
            href={item.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
          >
            <span>{isConsultation ? 'Konsultasi Sekarang' : isCommunity ? 'Gabung Grup' : 'Akses Link'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
