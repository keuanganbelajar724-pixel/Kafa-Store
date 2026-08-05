import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, MessageCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'kelas' | 'ebook' | 'akses' | 'muamalah';
}

const FAQ_LIST: FaqItem[] = [
  {
    id: '1',
    question: 'Apakah kelas animasi faceless cocok untuk pemula yang belum pernah edit video?',
    answer:
      'Sangat cocok! Semua materi dirancang bertahap dari pemahaman konsep dasar, penggunaan tools praktis di HP maupun laptop, hingga siap publikasi konten islami tanpa perlu tampil wajah.',
    category: 'kelas',
  },
  {
    id: '2',
    question: 'Bagaimana cara mengakses e-book dan modul yang sudah dibeli?',
    answer:
      'Setelah melakukan konfirmasi checkout, Anda akan langsung dikirimkan link akses instan ke Google Drive / Portal Member via WhatsApp & Email resmi Sahabat Kafa.',
    category: 'ebook',
  },
  {
    id: '3',
    question: 'Apakah akses materi berlaku selamanya (Lifetime Access)?',
    answer:
      'Ya, seluruh materi kelas, rekaman webinar, e-book, dan bonus template dapat Anda akses selamanya tanpa ada biaya langganan bulanan.',
    category: 'akses',
  },
  {
    id: '4',
    question: 'Apakah ada grup konsultasi & pendampingan setelah belajar?',
    answer:
      'Tentu saja! Anda akan diundang masuk ke grup komunitas Telegram & WhatsApp eksklusif alumni Sahabat Kafa untuk bertanya jawab dan berdiskusi.',
    category: 'kelas',
  },
  {
    id: '5',
    question: 'Bagaimana keamanan transaksi & akad muamalah pembelian?',
    answer:
      'Transaksi dilakukan secara transparan, halal, dan bebas dari unsur gharar. Pembayaran dapat melalui transfer bank atau QRIS resmi.',
    category: 'muamalah',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');
  const [search, setSearch] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = FAQ_LIST.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-12">
      <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden text-slate-900 dark:text-white">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Pusat Informasi & Jawaban Pertanyaan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Pertanyaan Sering Diajukan (FAQ)</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Temukan jawaban lengkap seputar kelas animasi, e-book edukasi anak, hingga akses keanggotaan.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-3 mb-6 max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan... (contoh: pemula, akses, garansi)"
              className="w-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 pl-10 pr-4 py-2.5 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'kelas', label: '🎬 Kelas Animasi' },
              { id: 'ebook', label: '📚 E-book & Printable' },
              { id: 'akses', label: '🔑 Akses & Garansi' },
              { id: 'muamalah', label: '🛡️ Muamalah' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white border-emerald-500 font-extrabold shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:text-emerald-600 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  >
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
              Tidak ada jawaban ditemukan untuk pencarian "{search}". Silakan tanyakan langsung ke Admin WA!
            </div>
          )}
        </div>

        {/* Direct Ask Admin Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Masih punya pertanyaan lain yang belum terjawab?</span>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Sahabat%20Kafa,%20saya%20punya%20pertanyaan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 font-bold text-xs transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Tanyakan ke Admin WA</span>
          </a>
        </div>
      </div>
    </div>
  );
};
