import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, RotateCcw, ShoppingBag, MessageCircle } from 'lucide-react';
import { LinkItem } from '../types';
import { formatRupiah } from '../utils/storage';

interface RecommendationQuizProps {
  isOpen: boolean;
  onClose: () => void;
  items: LinkItem[];
  onAddToCart: (item: LinkItem) => void;
}

export const RecommendationQuiz: React.FC<RecommendationQuizProps> = ({
  isOpen,
  onClose,
  items,
  onAddToCart,
}) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [recommendedItem, setRecommendedItem] = useState<LinkItem | null>(null);

  if (!isOpen) return null;

  const handleSelectGoal = (selectedGoal: string) => {
    setGoal(selectedGoal);
    setStep(2);
  };

  const handleSelectLevel = (selectedLevel: string) => {
    setLevel(selectedLevel);
    setStep(3);
  };

  const handleSelectBudget = (selectedBudget: string) => {
    setBudget(selectedBudget);

    // Calculate best match logic
    let bestMatch: LinkItem | undefined;

    if (goal.includes('animasi') || goal.includes('video')) {
      bestMatch = items.find((i) => i.title.toLowerCase().includes('animasi') || i.title.toLowerCase().includes('faceless'));
    } else if (goal.includes('anak') || goal.includes('e-book')) {
      bestMatch = items.find((i) => i.title.toLowerCase().includes('anak') || i.title.toLowerCase().includes('e-book'));
    } else if (goal.includes('emas') || goal.includes('muamalah')) {
      bestMatch = items.find((i) => i.title.toLowerCase().includes('emas') || i.title.toLowerCase().includes('konsultasi'));
    } else {
      bestMatch = items.find((i) => i.isPinned) || items[0];
    }

    if (!bestMatch && items.length > 0) {
      bestMatch = items[0];
    }

    setRecommendedItem(bestMatch || null);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setGoal('');
    setLevel('');
    setBudget('');
    setRecommendedItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 text-white overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Kuis Rekomendasi Paket Belajar</span>
        </div>

        <h3 className="text-xl font-black text-white mb-4">
          {step === 1 && 'Apa Tujuan Utama Anda Saat Ini?'}
          {step === 2 && 'Berapa Pengalaman Anda Di Bidang Ini?'}
          {step === 3 && 'Berapa Target Budget Investasi Belajar Anda?'}
          {step === 4 && '🎯 Paket Terbaik Rekomendasi Untuk Anda!'}
        </h3>

        {/* STEP 1: GOAL */}
        {step === 1 && (
          <div className="space-y-3 pt-2">
            {[
              { id: 'animasi', label: '🎬 Belajar Bikin Video Animasi Faceless Islami', sub: 'Cocok untuk konten kreator, TikTok, & YouTube tanpa wajah' },
              { id: 'anak', label: '📚 E-book & Activity Printable Edukasi Anak', sub: 'Media belajar anak di rumah ramah islami' },
              { id: 'emas', label: '🪙 Tabungan Emas Muamalah & Konsultasi Berkah', sub: 'Panduan beli emas antam/mini gold & muamalah' },
              { id: 'bisnis', label: '💼 Mulai Bisnis Produk Digital dari Rumah', sub: 'Menghasilkan passive income dari produk edukasi' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectGoal(opt.id)}
                className="w-full text-left p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/60 transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {opt.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{opt.sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 2: LEVEL */}
        {step === 2 && (
          <div className="space-y-3 pt-2">
            {[
              { id: 'pemula', label: '🌱 Pemula Sama Sekali (Nol Pengalaman)', sub: 'Butuh panduan step-by-step dari dasar yang mudah dipahami' },
              { id: 'menengah', label: '🌿 Pernah Coba / Sudah Paham Dasar', sub: 'Ingin memperdalam skill & meningkatkan kualitas karya' },
              { id: 'mahir', label: '🌳 Ingin Dampingan Intensif & Komunitas', sub: 'Butuh networking, konsultasi, & update materi terus menerus' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectLevel(opt.id)}
                className="w-full text-left p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/60 transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {opt.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{opt.sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 3: BUDGET */}
        {step === 3 && (
          <div className="space-y-3 pt-2">
            {[
              { id: 'terjangkau', label: '💰 Hemat & Terjangkau (< Rp 100rb)', sub: 'Format e-book atau kelas praktis dasar' },
              { id: 'sedang', label: '💎 Standar Eko-Investasi (Rp 100rb - 300rb)', sub: 'Paket lengkap video + e-book + bonus aset' },
              { id: 'lengkap', label: '👑 Paket VIP / Full Akses Masterclass (> Rp 300rb)', sub: 'Materi terlengkap + support konsultasi langsung' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelectBudget(opt.id)}
                className="w-full text-left p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/60 transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {opt.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{opt.sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </button>
            ))}
          </div>
        )}

        {/* STEP 4: RECOMMENDATION RESULT */}
        {step === 4 && recommendedItem && (
          <div className="space-y-4 pt-2 animate-fade-in">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/50 flex flex-col sm:flex-row items-center gap-4">
              <img
                src={recommendedItem.imageUrl}
                alt={recommendedItem.title}
                className="w-20 h-20 rounded-xl object-cover border border-emerald-500/30 shrink-0"
              />
              <div className="flex-1 text-center sm:text-left space-y-1">
                <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  98% COCOK UNTUK ANDA
                </span>
                <h4 className="text-base font-extrabold text-white">{recommendedItem.title}</h4>
                <p className="text-xs text-slate-300 line-clamp-2">{recommendedItem.subtitle}</p>
                <p className="text-base font-black text-emerald-400">{formatRupiah(recommendedItem.price)}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  onAddToCart(recommendedItem);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>+ Masukkan Keranjang</span>
              </button>

              <button
                onClick={handleReset}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
