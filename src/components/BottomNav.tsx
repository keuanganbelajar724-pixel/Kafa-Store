import React from 'react';
import { ShoppingBag, MessageCircle, Lock, Unlock, Shield } from 'lucide-react';

interface BottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdminModal: () => void;
  onOpenAdminPanel: () => void;
  whatsappNumber: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  cartCount,
  onOpenCart,
  isAdminLoggedIn,
  onOpenAdminModal,
  onOpenAdminPanel,
  whatsappNumber,
}) => {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const quickWaUrl = `https://wa.me/${cleanNumber}?text=Halo%20Sahabat%20Kafa,%20saya%20ingin%20bertanya`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
      <div className="bg-slate-900/90 dark:bg-slate-950/90 text-white backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-2xl shadow-2xl p-2 flex items-center justify-around gap-1">
        {/* WA Consultation Button */}
        <a
          href={quickWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all text-xs font-black shadow-lg shadow-emerald-500/25 border border-emerald-300"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>Tanya WA & Konsultasi Gratis</span>
        </a>

        {/* Admin Login / Panel Button */}
        <button
          onClick={isAdminLoggedIn ? onOpenAdminPanel : onOpenAdminModal}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-colors text-xs font-semibold ${
            isAdminLoggedIn
              ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30'
              : 'hover:bg-white/10 text-slate-300'
          }`}
          title={isAdminLoggedIn ? 'Buka Dashboard Admin' : 'Login Mode Admin'}
        >
          {isAdminLoggedIn ? <Unlock className="w-4 h-4 text-amber-400" /> : <Lock className="w-4 h-4" />}
          <span>{isAdminLoggedIn ? 'Dashboard' : 'Admin'}</span>
        </button>
      </div>
    </div>
  );
};
