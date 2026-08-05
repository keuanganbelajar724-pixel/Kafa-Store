import React, { useState } from 'react';
import { X, Calculator, Coins, TrendingUp, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatRupiah } from '../utils/storage';

interface GoldCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoldCalculatorModal: React.FC<GoldCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'gold' | 'income'>('gold');

  // Gold Calculator State
  const [goldGrams, setGoldGrams] = useState<number>(1);
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(1450000); // Rp 1.450.000 / gram

  // Income Estimator State
  const [salesPerWeek, setSalesPerWeek] = useState<number>(5);
  const [avgProductPrice, setAvgProductPrice] = useState<number>(99000);

  if (!isOpen) return null;

  const totalGoldValue = goldGrams * goldPricePerGram;
  const nisabGrams = 85; // Nisab Zakat Maal (85 gr emas)
  const isEligibleZakat = goldGrams >= nisabGrams;
  const zakatValue = isEligibleZakat ? totalGoldValue * 0.025 : 0;

  // Income calculations
  const weeklyIncome = salesPerWeek * avgProductPrice;
  const monthlyIncome = weeklyIncome * 4;
  const yearlyIncome = monthlyIncome * 12;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 text-white overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 mb-5">
          <button
            onClick={() => setActiveTab('gold')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'gold'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>Simulasi Muamalah Emas</span>
          </button>

          <button
            onClick={() => setActiveTab('income')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'income'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Estimasi Potensi Income</span>
          </button>
        </div>

        {/* TAB 1: GOLD & ZAKAT CALCULATOR */}
        {activeTab === 'gold' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>Simulasi Nilai Tabungan Emas</span>
              </h3>
              <p className="text-xs text-slate-400">
                Hitung perkiraan estimasi rupiah tabungan emas fisik atau emas digital Anda beserta perhitungan nisab zakat.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Jumlah Kepemilikan Emas (Gram)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={goldGrams}
                    onChange={(e) => setGoldGrams(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm font-extrabold bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-xs font-bold text-amber-400 px-3 py-2.5 bg-slate-800 rounded-xl border border-slate-700">
                    GRAM
                  </span>
                </div>
              </div>

              {/* Quick Gram Presets */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[0.5, 1, 2, 5, 10, 25, 85].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoldGrams(g)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 border transition-all ${
                      goldGrams === g
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-500/50'
                    }`}
                  >
                    {g} Gram
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Estimasi Harga Emas / Gram (IDR)
                </label>
                <input
                  type="number"
                  value={goldPricePerGram}
                  onChange={(e) => setGoldPricePerGram(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs font-mono font-bold bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              {/* Result Cards */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <span className="text-xs font-bold text-slate-300">Total Nilai Konversi Emas:</span>
                  <span className="text-lg font-black text-amber-300 font-mono">
                    {formatRupiah(totalGoldValue)}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Nisab Zakat Maal (85 gr):</span>
                    <span className="font-bold text-slate-300">{goldGrams} / 85 Gram</span>
                  </div>

                  {isEligibleZakat ? (
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
                      <span>Wajib Zakat (2.5% / tahun):</span>
                      <span className="font-extrabold font-mono text-emerald-400">
                        {formatRupiah(zakatValue)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic">
                      ℹ️ Kepemilikan belum mencapai nisab (85 gram). Belum wajib zakat maal.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INCOME ESTIMATOR */}
        {activeTab === 'income' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>Simulasi Potensi Penghasilan Digital</span>
              </h3>
              <p className="text-xs text-slate-400">
                Gambaran potensi rezeki dari berjualan produk digital, e-book, atau jasa konten animasi faceless secara konsisten.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Target Penjualan / Transaksi Per Minggu
                </label>
                <input
                  type="number"
                  min="1"
                  value={salesPerWeek}
                  onChange={(e) => setSalesPerWeek(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm font-extrabold bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Rata-Rata Harga Produk / Margin Komisi (Rp)
                </label>
                <input
                  type="number"
                  step="5000"
                  value={avgProductPrice}
                  onChange={(e) => setAvgProductPrice(parseInt(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm font-extrabold bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Income Summary Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <p className="text-[11px] font-bold text-slate-400">Per Bulan (4 Minggu)</p>
                  <p className="text-base font-black text-emerald-400 font-mono mt-0.5">
                    {formatRupiah(monthlyIncome)}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                  <p className="text-[11px] font-bold text-slate-400">Per Tahun (12 Bulan)</p>
                  <p className="text-base font-black text-amber-400 font-mono mt-0.5">
                    {formatRupiah(yearlyIncome)}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 leading-relaxed">
                🚀 <strong>Mulai Dari Sekarang:</strong> Ikuti kelas animasi faceless & produk edukasi Sahabat Kafa untuk membekali skill membuat karya digital berkah!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
