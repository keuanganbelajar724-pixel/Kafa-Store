import React, { useState, useRef } from 'react';
import { Lock, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  storeName: string;
  onOpenAdminModal: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminPanel: () => void;
  hideAdminButtonFooter?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  storeName,
  onOpenAdminModal,
  isAdminLoggedIn,
  onOpenAdminPanel,
  hideAdminButtonFooter = false,
}) => {
  const [secretClickCount, setSecretClickCount] = useState(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Secret Handler: 5 clicks in 2.5 seconds triggers admin modal!
  const handleSecretClick = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    const nextCount = secretClickCount + 1;
    setSecretClickCount(nextCount);

    if (nextCount >= 5) {
      setSecretClickCount(0);
      if (isAdminLoggedIn) {
        onOpenAdminPanel();
      } else {
        onOpenAdminModal();
      }
    } else {
      clickTimerRef.current = setTimeout(() => {
        setSecretClickCount(0);
      }, 2500);
    }
  };

  return (
    <footer className="mt-12 mb-20 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3 pb-8 px-4 relative z-10 max-w-xl mx-auto select-none">
      <div className="flex items-center justify-center gap-2 text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Layanan Resmi & Terpercaya</span>
      </div>

      {/* Secret Click Trigger on Brand / Copyright string */}
      <p
        onClick={handleSecretClick}
        className="leading-relaxed cursor-pointer hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
        title="Sahabat Kafa Official"
      >
        © {new Date().getFullYear()} <strong>{storeName}</strong>. Fakta Unik, Edukasi Ringan & Muamalah Emas.
        {secretClickCount > 0 && secretClickCount < 5 && (
          <span className="inline-block ml-1 text-[10px] text-emerald-500 animate-pulse font-bold">
            ({5 - secretClickCount}x lagi)
          </span>
        )}
      </p>

      {/* Admin Button or Secret Trigger */}
      <div className="pt-2 flex items-center justify-center gap-4 text-[11px]">
        {(!hideAdminButtonFooter || isAdminLoggedIn) ? (
          <button
            onClick={isAdminLoggedIn ? onOpenAdminPanel : onOpenAdminModal}
            className="hover:text-emerald-500 transition-colors flex items-center gap-1 font-medium"
          >
            <Lock className="w-3 h-3" />
            <span>{isAdminLoggedIn ? 'Pengaturan Admin (Aktif)' : 'Login Pengelola / Admin'}</span>
          </button>
        ) : (
          /* Subtle discreet dot/icon for stealth mode */
          <button
            onClick={handleSecretClick}
            className="text-slate-400/40 hover:text-slate-400 text-[10px] flex items-center gap-1 transition-opacity"
            title="Sistem Keamanan Terintegrasi"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400/30"></span>
            <span>Hak Cipta Dilindungi</span>
          </button>
        )}
      </div>
    </footer>
  );
};
