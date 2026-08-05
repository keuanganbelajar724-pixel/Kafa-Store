import React from 'react';
import { Globe, ShieldCheck, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

interface InternationalTickerBarProps {
  currency: 'IDR' | 'USD';
  lang: 'ID' | 'EN';
}

export const InternationalTickerBar: React.FC<InternationalTickerBarProps> = ({
  lang,
}) => {
  const isEN = lang === 'EN';

  return (
    <div className="w-full bg-slate-900/90 border-y border-slate-800 text-xs font-semibold py-2 px-4 overflow-hidden shadow-inner backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Ticker highlights */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-slate-300">
          {/* Sahabat Kafa Platform Badge */}
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-300 font-extrabold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isEN
                ? 'Sahabat Kafa — Official Platform'
                : 'Sahabat Kafa — Platform Resmi'}
            </span>
          </div>

          {/* Sharia COD Guarantee */}
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-300 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isEN
                ? 'COD Semarang & Verified Transactions'
                : 'Layanan COD Semarang & Transaksi Aman'}
            </span>
          </div>

          {/* Digital Products & Learning */}
          <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-3 py-1 rounded-full text-teal-300 font-medium">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span>
              {isEN
                ? 'Video Editing, AI Courses & Educational E-Books'
                : 'Kelas Video Editing, AI Faceless & E-Book Edukasi'}
            </span>
          </div>

          {/* Global Access Status */}
          <div className="flex items-center gap-2 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>
              {isEN
                ? 'Global Digital Access 24/7'
                : 'Akses Produk Digital Direct Download 24/7'}
            </span>
          </div>

          {/* Fast Support */}
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isEN ? 'Fast WhatsApp Admin Response' : 'Fast Response Admin WhatsApp'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

