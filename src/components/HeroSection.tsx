import React from 'react';
import { Sparkles, ShieldCheck, Zap, Star, Share2, MessageCircle } from 'lucide-react';
import { StoreSettings } from '../types';
import { MosqueAmbientBackground } from './MosqueAmbientBackground';
import { LiveClockWidget } from './LiveClockWidget';

interface HeroSectionProps {
  settings: StoreSettings;
  selectedCategory: string;
  categories?: string[];
  onSelectCategory: (category: string) => void;
  totalProductsCount: number;
  onOpenShare: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  selectedCategory,
  categories = [],
  onSelectCategory,
  totalProductsCount,
  onOpenShare,
}) => {
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessageHeader)}`;

  return (
    <div className="relative overflow-hidden pt-8 pb-6 px-4 text-center">
      {/* Animated Subtle Mosque & Glow Background */}
      <MosqueAmbientBackground />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Floating Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-xs font-extrabold tracking-wide shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 animate-pulse" />
          <span>SAHABAT KAFA OFFICIAL WEBSITE</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        </div>

        {/* Live Interactive Date & Digital Clock Widget */}
        {settings.showLiveClock !== false && <LiveClockWidget />}

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-3xl mx-auto drop-shadow-sm">
          {settings.heroHeadline || settings.storeName}
        </h1>

        {/* Subheadline Bio */}
        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          {settings.heroSubheadline || settings.bio}
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#katalog"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Lihat Produk & E-Book</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/60 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs sm:text-sm hover:bg-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Konsultasi & COD WA</span>
          </a>

          <button
            onClick={onOpenShare}
            className="px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-300 font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
          >
            <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Bagikan Website</span>
          </button>
        </div>

        {/* Key Selling Highlights / Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs font-semibold">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Layanan Cepat & Fast Response</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Transaksi Aman & Transparan</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-md">
            <Star className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
            <span>Terpercaya & Berkah</span>
          </div>
        </div>

        {/* Category Filter Navigation */}
        <div id="katalog" className="pt-6 max-w-2xl mx-auto space-y-3 scroll-mt-20">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar justify-start sm:justify-center">
            <button
              onClick={() => onSelectCategory('Semua')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === 'Semua'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Semua Katalog ({totalProductsCount})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 border ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 scale-105'
                    : 'bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

