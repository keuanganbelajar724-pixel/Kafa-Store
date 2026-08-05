import React from 'react';
import { ShoppingBag, Lock, Unlock, MessageCircle, ShieldCheck, Sun, Moon } from 'lucide-react';
import { StoreSettings } from '../types';

interface NavbarProps {
  settings: StoreSettings;
  cartCount: number;
  onOpenCart: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminModal: () => void;
  onOpenAdminPanel: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currency?: 'IDR' | 'USD';
  onToggleCurrency?: () => void;
  lang?: 'ID' | 'EN';
  onToggleLang?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  cartCount,
  onOpenCart,
  isAdminLoggedIn,
  onOpenAdminModal,
  onOpenAdminPanel,
  isDarkMode,
  onToggleTheme,
  currency = 'IDR',
  onToggleCurrency,
  lang = 'ID',
  onToggleLang,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 transition-all shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={isAdminLoggedIn ? onOpenAdminPanel : onOpenAdminModal}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full blur opacity-70 group-hover:opacity-100 transition"></div>
            <img
              src={settings.avatarUrl}
              alt={settings.storeName}
              className="relative w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-slate-900 dark:text-white text-base tracking-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer">
                {settings.storeName}
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" title="Sahabat Kafa Terverifikasi & Resmi" />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              {settings.tagline}
            </p>
          </div>
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2">
          {/* Currency Switcher */}
          {onToggleCurrency && (
            <button
              onClick={onToggleCurrency}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 text-amber-700 dark:text-amber-400 text-xs font-black hover:border-amber-500/50 transition-all shadow-sm flex items-center gap-1"
              title="Ganti Mata Uang (IDR / USD)"
            >
              <span>{currency === 'IDR' ? '🇮🇩 IDR' : '🇺🇸 USD'}</span>
            </button>
          )}

          {/* Language Switcher */}
          {onToggleLang && (
            <button
              onClick={onToggleLang}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 text-teal-700 dark:text-teal-300 text-xs font-black hover:border-teal-500/50 transition-all shadow-sm flex items-center gap-1"
              title="Ganti Bahasa (ID / EN)"
            >
              <span>{lang === 'ID' ? 'ID' : 'EN'}</span>
            </button>
          )}

          {/* Quick WhatsApp Consultation */}
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Halo%20Sahabat%20Kafa,%20saya%20ingin%20konsultasi`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/40 text-xs font-black text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-500/20" />
            <span>{settings.headerWaText || 'Tanya WA Gratis'}</span>
          </a>

          {/* Theme Mode Toggle (Sun / Moon) */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-amber-400 hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center"
            title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Keranjang</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full text-[10px] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Toggle */}
          <button
            onClick={isAdminLoggedIn ? onOpenAdminPanel : onOpenAdminModal}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
              isAdminLoggedIn
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-100 dark:bg-slate-900/80 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title={isAdminLoggedIn ? 'Dashboard Admin' : 'Login Admin'}
          >
            {isAdminLoggedIn ? <Unlock className="w-4 h-4 text-amber-500 dark:text-amber-400" /> : <Lock className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

