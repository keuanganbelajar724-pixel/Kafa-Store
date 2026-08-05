import React from 'react';
import { CheckCircle2, Search, SlidersHorizontal } from 'lucide-react';
import { SocialLinks, StoreSettings } from '../types';

interface HeaderProps {
  settings: StoreSettings;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const { storeName, bio, avatarUrl, socials } = settings;

  // Custom SVG Social Icons
  const renderSocialIcon = (key: keyof SocialLinks, url?: string) => {
    if (!url) return null;

    let iconPath = null;

    if (key === 'tiktok') {
      iconPath = (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.525 2.015a.056.056 0 0 0-.01 0 10.155 10.155 0 0 1-5.011 1.353 10.187 10.187 0 0 1-3.23-.538.056.056 0 0 0-.071.053V6.75a.057.057 0 0 0 .044.055 6.74 6.74 0 0 0 1.948.286 6.732 6.732 0 0 0 6.32-4.444.057.057 0 0 0-.09-.032M19.58 6.551a10.23 10.23 0 0 1-4.721-1.168.056.056 0 0 0-.083.048v10.513c0 3.86-3.13 6.99-6.99 6.99-3.86 0-6.99-3.13-6.99-6.99 0-3.86 3.13-6.99 6.99-6.99a6.95 6.95 0 0 1 2.915.637.056.056 0 0 0 .076-.03l1.233-3.791a.057.057 0 0 0-.033-.07 10.38 10.38 0 0 0-4.191-.884C3.805 4.815 0 8.62 0 13.297c0 4.677 3.805 8.482 8.482 8.482 4.677 0 8.482-3.805 8.482-8.482V9.61a13.62 13.62 0 0 0 4.686 1.705.056.056 0 0 0 .063-.055v-4.16a.057.057 0 0 0-.053-.057c-.36-.02-.72-.084-1.08-.192z" />
        </svg>
      );
    } else if (key === 'youtube') {
      iconPath = (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    } else if (key === 'instagram') {
      iconPath = (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    } else if (key === 'telegram') {
      iconPath = (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.67-.54.83-1.1.52l-3.03-2.23-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.08 5.61-5.07c.24-.22-.05-.34-.37-.13l-6.93 4.36-2.98-.93c-.65-.2-.66-.65.14-.96l11.66-4.5c.54-.2 1.01.12.84.83z" />
        </svg>
      );
    }

    return (
      <a
        key={key}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-white/20 dark:bg-slate-800/60 backdrop-blur-md border border-white/30 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:scale-110 transition-all duration-200 flex items-center justify-center shadow-sm"
        title={key.toUpperCase()}
      >
        {iconPath}
      </a>
    );
  };

  return (
    <div className="flex flex-col items-center text-center pt-6 pb-4 px-4 max-w-xl mx-auto relative z-10">
      {/* Profile Avatar with Halo Ring */}
      <div className="relative group mb-3">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
        <img
          src={avatarUrl}
          alt={storeName}
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
        />
        <div className="absolute bottom-1 right-1 bg-white dark:bg-slate-900 rounded-full p-1 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
        </div>
      </div>

      {/* Store Title & Verified Name */}
      <div className="flex items-center gap-1.5 justify-center mb-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
          {storeName}
        </h1>
        <span className="text-emerald-500" title="Akun Resmi Terverifikasi">
          <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
        </span>
      </div>

      {/* Tagline / Handle */}
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
        @{storeName.toLowerCase().replace(/\s+/g, '')}
      </p>

      {/* Bio text */}
      <p className="text-sm text-slate-700 dark:text-slate-200 max-w-md leading-relaxed mb-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/50 dark:border-slate-800/60 shadow-sm">
        {bio}
      </p>

      {/* Social Media Links */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {socials.tiktok && renderSocialIcon('tiktok', socials.tiktok)}
        {socials.youtube && renderSocialIcon('youtube', socials.youtube)}
        {socials.instagram && renderSocialIcon('instagram', socials.instagram)}
        {socials.telegram && renderSocialIcon('telegram', socials.telegram)}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="w-full space-y-3">
        {/* Search input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari kelas, ebook, atau link..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/60 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              Reset
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full justify-start sm:justify-center">
          <button
            onClick={() => onSelectCategory('Semua')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
              selectedCategory === 'Semua'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-white/40 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-white/40 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
