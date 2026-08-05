import React from 'react';
import { Sparkles, ShieldCheck, Zap, Star, Share2, MessageCircle } from 'lucide-react';
import { StoreSettings } from '../types';
import { MosqueAmbientBackground } from './MosqueAmbientBackground';

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

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-3xl mx-auto drop-shadow-sm">
          {settings.heroHeadline || settings.storeName}
        </h1>

        {/* Subheadline Bio */}
        <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          {settings.heroSubheadline || settings.bio}
        </p>

        {/* Prominent Action Triggers with Big WA Consultation CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          {/* Big Clear WA Consultation Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-emerald-300"
          >
            <MessageCircle className="w-6 h-6 fill-slate-950 text-emerald-400" />
            <span>TANYA WA & GRATIS KONSULTASI APA PUN</span>
          </a>

          <a
            href="#katalog"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm border border-slate-700 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Lihat Semua Produk</span>
          </a>

          <button
            onClick={onOpenShare}
            className="w-full sm:w-auto px-4 py-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-300 font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Bagikan</span>
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

        {/* Scroll anchor target */}
        <div id="katalog" className="pt-2 scroll-mt-20" />
      </div>
    </div>
  );
};

