import React, { useState } from 'react';
import { Quote, RefreshCw, Copy, Check, Share2, Sparkles, BookOpen } from 'lucide-react';

interface IslamicQuote {
  id: number;
  text: string;
  source: string;
  category: string;
}

const QUOTES: IslamicQuote[] = [
  {
    id: 1,
    text: "Maka sesungguhnya bersama kesulitan ada kemudahan. Sesungguhnya bersama kesulitan ada kemudahan.",
    source: "QS. Al-Insyirah: 5-6",
    category: "Motivasi & Hijrah",
  },
  {
    id: 2,
    text: "Barangsiapa yang meniti jalan untuk menuntut ilmu, maka Allah akan mudahkan baginya jalan menuju surga.",
    source: "HR. Muslim no. 2699",
    category: "Menuntut Ilmu",
  },
  {
    id: 3,
    text: "Sebaik-baik manusia adalah yang paling bermanfaat bagi orang lain.",
    source: "HR. Ahmad, Ath-Thabrani",
    category: "Kebermanfaatan",
  },
  {
    id: 4,
    text: "Pekerjaan terbaik adalah pekerjaan seorang laki-laki dengan tangannya sendiri dan setiap jual beli yang mabrur (baik & jujur).",
    source: "HR. Ahmad & Al-Bazzar",
    category: "Muamalah & Bisnis",
  },
  {
    id: 5,
    text: "Perbanyaklah mengingat pemutus kelezatan, yaitu kematian. Karena tidaklah seseorang mengingatnya saat sempit melainkan akan melapangkannya.",
    source: "HR. An-Nasa'i & Tirmidzi",
    category: "Pengingat Diri",
  },
  {
    id: 6,
    text: "Sesuatu yang ditakdirkan untukmu tidak akan pernah melewatkanmu, dan apa yang melewatkanmu tidak akan pernah menjadi milikmu.",
    source: "Umar bin Khattab RA",
    category: "Tawakal & Takdir",
  },
];

export const IslamicQuoteWidget: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const currentQuote = QUOTES[currentIndex];

  const handleNextQuote = () => {
    setIsRotating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
      setIsRotating(false);
    }, 200);
  };

  const handleCopy = () => {
    const textToCopy = `"${currentQuote.text}" - ${currentQuote.source} (via Sahabat Kafa)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWA = () => {
    const text = encodeURIComponent(`"${currentQuote.text}"\n\n📌 *${currentQuote.source}*\n\nDapatkan quote & edukasi islami gratis di Sahabat Kafa!`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div id="quote-generator" className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-900/90 via-slate-900 to-teal-950 dark:from-emerald-950/90 dark:via-slate-950 dark:to-slate-900 light:from-emerald-50 light:via-teal-50/80 light:to-white border border-emerald-500/30 dark:border-emerald-500/30 light:border-emerald-200 shadow-2xl overflow-hidden text-white dark:text-white light:text-slate-900">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 dark:text-emerald-400 light:text-emerald-700 border border-emerald-500/30">
              <Quote className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black tracking-wide text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                <span>Mutiara Hikmah & Hadits Harian</span>
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-emerald-200/80 dark:text-emerald-200/80 light:text-slate-600">
                Inspirasi & Pengingat Kebaikan Setiap Hari
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 dark:text-emerald-300 light:text-emerald-800 border border-emerald-500/30">
            {currentQuote.category}
          </span>
        </div>

        {/* Quote Content Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 dark:bg-slate-900/80 light:bg-white/90 border border-white/10 dark:border-white/10 light:border-slate-200/80 backdrop-blur-md space-y-3 shadow-inner">
          <p className={`text-sm sm:text-base italic leading-relaxed font-medium transition-all duration-300 text-slate-100 dark:text-slate-100 light:text-slate-800 ${isRotating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            "{currentQuote.text}"
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-white/10 dark:border-white/10 light:border-slate-200">
            <span className="text-xs font-bold text-amber-400 dark:text-amber-400 light:text-amber-700 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {currentQuote.source}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-slate-800 dark:bg-slate-800 light:bg-slate-100 hover:bg-slate-700 light:hover:bg-slate-200 text-slate-200 dark:text-slate-200 light:text-slate-700 transition-all active:scale-90 text-xs flex items-center gap-1"
                title="Salin Quote"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline text-[11px] font-semibold">{copied ? 'Tersalin' : 'Salin'}</span>
              </button>

              <button
                onClick={handleShareWA}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all active:scale-90 text-xs flex items-center gap-1"
                title="Bagikan ke WhatsApp"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-bold">Bagikan WA</span>
              </button>

              <button
                onClick={handleNextQuote}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all active:scale-90 text-xs flex items-center gap-1"
                title="Acak Quote Berikutnya"
              >
                <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline text-[11px]">Acak Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
