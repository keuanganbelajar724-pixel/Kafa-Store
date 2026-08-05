import React from 'react';
import { Globe, ShieldCheck, Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { StoreSettings } from '../types';

interface InternationalTickerBarProps {
  currency: 'IDR' | 'USD';
  lang: 'ID' | 'EN';
  settings?: StoreSettings;
}

export const InternationalTickerBar: React.FC<InternationalTickerBarProps> = ({
  lang,
  settings,
}) => {
  const isEN = lang === 'EN';

  const t1 = settings?.tickerItem1 || (isEN ? 'Sahabat Kafa — Official Platform' : 'Sahabat Kafa — Platform Resmi');
  const t2 = settings?.tickerItem2 || (isEN ? 'Verified Transactions & Direct Links' : 'Layanan & Transaksi Terverifikasi');
  const t3 = settings?.tickerItem3 || (isEN ? 'Digital Products & Learning' : 'Akses Produk Digital & Pembelajaran');
  const t4 = settings?.tickerItem4 || (isEN ? 'Global Digital Access 24/7' : 'Akses Digital 24/7');

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-900/90 border-y border-slate-200 dark:border-slate-800 text-xs font-semibold py-2 px-4 overflow-hidden shadow-inner backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Ticker highlights */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-slate-700 dark:text-slate-300">
          {/* Item 1 */}
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 font-extrabold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t1}</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-800 dark:text-amber-300 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{t2}</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full text-teal-800 dark:text-teal-300 font-medium">
            <Zap className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{t3}</span>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>{t4}</span>
          </div>

          {/* Support Item */}
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isEN ? 'Fast Response Admin' : 'Fast Response Admin WA'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

