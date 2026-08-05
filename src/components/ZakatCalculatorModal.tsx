import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, HeartHandshake, CheckCircle2, MessageCircle, Sparkles, Coins } from 'lucide-react';
import { formatRupiah } from '../utils/storage';

interface ZakatCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber?: string;
}

export const ZakatCalculatorModal: React.FC<ZakatCalculatorModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber = '6281234567890',
}) => {
  const [activeTab, setActiveTab] = useState<'penghasilan' | 'maal' | 'infaq'>('penghasilan');

  // Zakat Penghasilan State
  const [monthlyIncome, setMonthlyIncome] = useState<string>('5000000');
  const [otherIncome, setOtherIncome] = useState<string>('0');
  const [monthlyNeeds, setMonthlyNeeds] = useState<string>('0');

  // Zakat Maal State
  const [totalGoldGram, setTotalGoldGram] = useState<string>('0');
  const [totalSavings, setTotalSavings] = useState<string>('85000000');
  const [goldPricePerGram, setGoldPricePerGram] = useState<string>('1350000'); // Est price

  // Infaq State
  const [infaqNominal, setInfaqNominal] = useState<string>('20000');

  if (!isOpen) return null;

  // Calculation logic
  const goldPriceNum = parseFloat(goldPricePerGram) || 1350000;
  const nisabZakatPenghasilanMonthly = (85 * goldPriceNum) / 12; // Nisab per bulan = 85g emas / 12
  const nisabZakatMaalYearly = 85 * goldPriceNum; // Nisab 85g emas

  // Zakat Penghasilan Calc
  const incomeNum = (parseFloat(monthlyIncome) || 0) + (parseFloat(otherIncome) || 0) - (parseFloat(monthlyNeeds) || 0);
  const isPenghasilanWajib = incomeNum >= nisabZakatPenghasilanMonthly;
  const zakatPenghasilanAmount = isPenghasilanWajib ? Math.round(incomeNum * 0.025) : 0;

  // Zakat Maal Calc
  const goldVal = (parseFloat(totalGoldGram) || 0) * goldPriceNum;
  const savingsVal = parseFloat(totalSavings) || 0;
  const totalMaalVal = goldVal + savingsVal;
  const isMaalWajib = totalMaalVal >= nisabZakatMaalYearly;
  const zakatMaalAmount = isMaalWajib ? Math.round(totalMaalVal * 0.025) : 0;

  // Final summary for WhatsApp
  const handleSendToWhatsapp = () => {
    let msg = '';
    if (activeTab === 'penghasilan') {
      msg = `Assalamu'alaikum Admin Sahabat Kafa, saya ingin menyalurkan Zakat Penghasilan sebesar ${formatRupiah(
        zakatPenghasilanAmount
      )}. Mohon informasi rekening/metode penyalurannya. Terima kasih.`;
    } else if (activeTab === 'maal') {
      msg = `Assalamu'alaikum Admin Sahabat Kafa, saya ingin menyalurkan Zakat Maal/Harta sebesar ${formatRupiah(
        zakatMaalAmount
      )}. Mohon petunjuk penyalurannya. Terima kasih.`;
    } else {
      msg = `Assalamu'alaikum Admin Sahabat Kafa, saya ingin menyalurkan Infaq/Sedekah Subuh sebesar ${formatRupiah(
        parseFloat(infaqNominal) || 0
      )}. Mohon nomor rekening resmi. Terima kasih.`;
    }

    const cleanPhone = whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-white overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Kalkulator Zakat & Infaq</h3>
            <p className="text-xs text-slate-400">Hitung kewajiban zakat sesuai nisab BAZNAS & Syariah</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 p-1 bg-slate-800/80 rounded-2xl my-3 text-xs font-bold gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('penghasilan')}
            className={`py-2 px-1 rounded-xl transition-all ${
              activeTab === 'penghasilan'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Zakat Penghasilan
          </button>
          <button
            onClick={() => setActiveTab('maal')}
            className={`py-2 px-1 rounded-xl transition-all ${
              activeTab === 'maal' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Zakat Maal
          </button>
          <button
            onClick={() => setActiveTab('infaq')}
            className={`py-2 px-1 rounded-xl transition-all ${
              activeTab === 'infaq' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Infaq Subuh
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 my-2 text-xs">
          {activeTab === 'penghasilan' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Gaji / Penghasilan Bulanan (Rp)</label>
                  <input
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Penghasilan Tambahan / Bonus (Rp)</label>
                  <input
                    type="number"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Nisab Info */}
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-slate-300 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Nisab Penghasilan (BAZNAS / Bln):</span>
                  <span className="font-mono text-emerald-400">{formatRupiah(nisabZakatPenghasilanMonthly)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-1 border-t border-slate-800">
                  <span>Status Kewajiban:</span>
                  <span className={isPenghasilanWajib ? 'text-amber-400 font-extrabold' : 'text-slate-400'}>
                    {isPenghasilanWajib ? 'Wajib Zakat (2.5%)' : 'Belum Mencapai Nisab'}
                  </span>
                </div>
              </div>

              {/* Zakat Result */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/50 text-center">
                <div className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-300">
                  Besaran Zakat Penghasilan
                </div>
                <div className="text-2xl font-black font-mono text-amber-300 my-1">
                  {formatRupiah(zakatPenghasilanAmount)} / bulan
                </div>
                <p className="text-[10px] text-slate-300">
                  {isPenghasilanWajib
                    ? 'Sudah memenuhi syarat 2,5% dari total pendapatan bersumber halal.'
                    : 'Anda dapat menyalurkannya sebagai Infaq/Sedekah sukarela.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'maal' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tabungan / Deposito / Kas (Rp)</label>
                  <input
                    type="number"
                    value={totalSavings}
                    onChange={(e) => setTotalSavings(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Emas Simpanan (Gram)</label>
                  <input
                    type="number"
                    value={totalGoldGram}
                    onChange={(e) => setTotalGoldGram(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-slate-300 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>Nisab Zakat Maal (85 Gram Emas):</span>
                  <span className="font-mono text-emerald-400">{formatRupiah(nisabZakatMaalYearly)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-1 border-t border-slate-800">
                  <span>Total Aset Tersimpan:</span>
                  <span className="font-mono text-white">{formatRupiah(totalMaalVal)}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/50 text-center">
                <div className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-300">
                  Besaran Zakat Maal (Per Tahun)
                </div>
                <div className="text-2xl font-black font-mono text-amber-300 my-1">
                  {formatRupiah(zakatMaalAmount)}
                </div>
                <p className="text-[10px] text-slate-300">
                  {isMaalWajib
                    ? 'Total aset Anda telah mencapai Nisab 85 gram emas per tahun (2.5%).'
                    : 'Aset belum mencapai Nisab 85 gram emas.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'infaq' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
                  <Coins className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">Sedekah & Infaq Berkah</h4>
                <p className="text-slate-400 text-xs">
                  "Tidak ada satu subuh pun yang dialami hamba-hamba Allah kecuali dua malaikat turun mendoakannya..." (HR. Bukhari & Muslim)
                </p>

                <div className="pt-2">
                  <label className="block text-slate-300 font-bold mb-1">Nominal Infaq / Sedekah (Rp)</label>
                  <input
                    type="number"
                    value={infaqNominal}
                    onChange={(e) => setInfaqNominal(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-mono font-extrabold text-lg text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {['10000', '20000', '50000'].map((nom) => (
                    <button
                      key={nom}
                      onClick={() => setInfaqNominal(nom)}
                      className="py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs transition-colors"
                    >
                      {formatRupiah(parseInt(nom))}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-slate-800 shrink-0">
          <button
            onClick={handleSendToWhatsapp}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-98"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Penyaluran / Konsultasi via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
