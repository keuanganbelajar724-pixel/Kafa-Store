import React, { useState } from 'react';
import {
  ShoppingBag,
  Eye,
  Star,
  ExternalLink,
  MessageCircle,
  Users,
  Grid,
  List as ListIcon,
  CheckCircle,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { LinkItem } from '../types';
import { Badge } from './Badge';
import { formatRupiah } from '../utils/storage';

interface ProductGridProps {
  items: LinkItem[];
  onViewDetail: (item: LinkItem) => void;
  onAddToCart: (item: LinkItem) => void;
  onBuyNow: (item: LinkItem) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  items,
  onViewDetail,
  onAddToCart,
  onBuyNow,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (items.length === 0) {
    return (
      <div className="p-8 sm:p-12 text-center bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Katalog Produk Masih Kosong</h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Belum ada produk yang ditampilkan. Anda dapat menambahkan produk, e-book, atau layanan baru secara manual melalui Panel Admin Sahabat Kafa.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header controls: Layout View Switcher & Counter */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white light:text-slate-900 tracking-tight">Katalog Pilihan</h2>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 light:text-emerald-700">
            {items.length} Item Tersedia
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900/80 light:bg-slate-200 p-1 rounded-xl border border-slate-300 dark:border-slate-800 light:border-slate-300">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 light:text-slate-700 hover:text-emerald-600 dark:hover:text-white'
            }`}
            title="Tampilan Grid Modern"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 light:text-slate-700 hover:text-emerald-600 dark:hover:text-white'
            }`}
            title="Tampilan Daftar/List"
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Mode Layout */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const isProduct = item.type === 'product';
            const isConsultation = item.type === 'consultation';
            const isCommunity = item.type === 'community';

            return (
              <div
                key={item.id}
                className="group relative bg-white dark:bg-slate-900/80 light:bg-white backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800/90 light:border-slate-200 hover:border-emerald-500/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col overflow-hidden text-slate-900 dark:text-white light:text-slate-900"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900 to-slate-900 text-emerald-400">
                      {isConsultation ? <MessageCircle className="w-12 h-12" /> : <ShoppingBag className="w-12 h-12" />}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                  {/* Badge & Pinned Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    {item.badge && <Badge text={item.badge} color={item.badgeColor || 'emerald'} size="sm" />}
                    {item.isPinned && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                        <Zap className="w-3 h-3 fill-slate-950" />
                        <span>REKOMENDASI</span>
                      </span>
                    )}
                  </div>

                  {/* Category Pill Right Top */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-800">
                      {item.category}
                    </span>
                  </div>

                  {/* Price Tag Overlay on Image */}
                  {isProduct && (
                    <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between">
                      <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-md">
                        <span className="text-base font-black text-emerald-400">
                          {formatRupiah(item.price)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            {formatRupiah(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      {item.rating && (
                        <div className="flex items-center gap-1 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 text-amber-400 text-xs font-bold shadow-md">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{item.rating}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white light:text-slate-900 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-words whitespace-normal leading-snug">
                      {item.title}
                    </h3>

                    {item.subtitle && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 light:text-slate-600 break-words whitespace-normal mt-1.5 leading-relaxed">
                        {item.subtitle}
                      </p>
                    )}

                    {/* Features checklist bullet preview */}
                    {item.features && item.features.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {item.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 light:text-slate-700">
                            <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400 light:text-emerald-600 shrink-0 mt-0.5" />
                            <span className="break-words leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Card Action Button */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 light:border-slate-200 flex items-center gap-2">
                    {isProduct ? (
                      <>
                        <button
                          onClick={() => onViewDetail(item)}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800/80 light:bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 light:hover:bg-slate-200 text-slate-800 dark:text-slate-200 light:text-slate-800 transition-colors flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700/60 light:border-slate-300"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>

                        <button
                          onClick={() => onAddToCart(item)}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>+ Beli</span>
                        </button>
                      </>
                    ) : (
                      <a
                        href={item.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                      >
                        <span>{isConsultation ? 'Konsultasi WhatsApp' : isCommunity ? 'Gabung Komunitas' : 'Akses Link'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List Mode Layout */
        <div className="space-y-3">
          {items.map((item) => {
            const isProduct = item.type === 'product';
            const isConsultation = item.type === 'consultation';
            const isCommunity = item.type === 'community';

            return (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-900/80 light:bg-white backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 light:border-slate-200 hover:border-emerald-500/40 shadow-md hover:shadow-xl transition-all flex flex-col sm:flex-row items-center gap-4 text-slate-900 dark:text-white light:text-slate-900"
              >
                <div className="w-full sm:w-24 h-24 sm:h-20 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 relative">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}
                  {item.badge && (
                    <div className="absolute top-1.5 left-1.5 sm:hidden">
                      <Badge text={item.badge} color={item.badgeColor || 'emerald'} size="sm" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left w-full">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white light:text-slate-900 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors break-words whitespace-normal leading-snug">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <div className="hidden sm:block">
                        <Badge text={item.badge} color={item.badgeColor || 'emerald'} size="sm" />
                      </div>
                    )}
                  </div>

                  {item.subtitle && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 light:text-slate-600 break-words whitespace-normal mt-0.5 leading-relaxed">{item.subtitle}</p>
                  )}

                  {isProduct && (
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 light:text-emerald-700">
                        {formatRupiah(item.price)}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 light:text-slate-500 line-through">
                          {formatRupiah(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800 light:border-slate-200">
                  {isProduct ? (
                    <>
                      <button
                        onClick={() => onViewDetail(item)}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 light:text-slate-800 border border-slate-200 dark:border-slate-700 light:border-slate-300"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
                      >
                        + Keranjang
                      </button>
                    </>
                  ) : (
                    <a
                      href={item.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5"
                    >
                      <span>Buka Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
