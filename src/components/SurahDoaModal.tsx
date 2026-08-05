import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, Sparkles, Volume2, Search, Heart } from 'lucide-react';

interface SurahDoaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DoaItem {
  id: string;
  title: string;
  category: 'doa' | 'surah';
  arabic: string;
  latin: string;
  translation: string;
  source: string;
}

const DOA_LIST: DoaItem[] = [
  {
    id: '1',
    title: 'Doa Memohon Ilmu Bermanfaat & Rezeki Halal',
    category: 'doa',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
    latin: 'Allahumma inni as-aluka \'ilman nafi\'an wa rizqan thayyiban wa \'amalan mutaqabbalan.',
    translation: 'Ya Allah, sungguh aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik (halal), dan amal yang diterima.',
    source: 'HR. Ibnu Majah & Ahmad',
  },
  {
    id: '2',
    title: 'Doa Kelapangan Hati & Kemudahan Urusan',
    category: 'doa',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
    latin: 'Rabbish rahli sadri wa yassir li amri wahlul \'uqdatam mil lisani yafqahu qauli.',
    translation: 'Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan melepaskan kekakuan dari lidahku agar mereka mengerti perkataanku.',
    source: 'QS. Thaha: 25-28',
  },
  {
    id: '3',
    title: 'Keutamaan Membaca Surah Al-Kahfi (Hari Jumat)',
    category: 'surah',
    arabic: 'مَنْ قَرَأَ سُورَةَ الْكَهْفِ فِي يَوْمِ الْجُمُعَةِ أَضَاءَ لَهُ مِنَ النُّورِ مَا بَيْنَ الْجُمُعَتَيْنِ',
    latin: 'Man qara-a suratal Kahfi fi yaumil jumu\'ati adha-a lahu minan noori ma bainal jumu\'atain.',
    translation: 'Barangsiapa membaca Surah Al-Kahfi pada hari Jumat, maka ia akan disinari cahaya di antara dua Jumat.',
    source: 'HR. An-Nasa\'i & Al-Hakim',
  },
  {
    id: '4',
    title: 'Keutamaan Surah Al-Mulk (Penyelamat Siksa Kubur)',
    category: 'surah',
    arabic: 'إِنَّ سُورَةً مِنَ الْقُرْآنِ ثَلَاثُونَ آيَةً شَفَعَتْ لِرَجُلٍ حَتَّى غُفِرَ لَهُ وَهِيَ سُورَةُ تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ',
    latin: 'Inna suratam minal qur\'ani thalathuna ayatan shafa\'at lirajulin hatta ghufira lahu wahiya suratu Tabarakalladhi biyadihil mulk.',
    translation: 'Ada satu surah dalam Al-Qur\'an (30 ayat) yang memberi syafaat kepada pembacanya hingga diampuni, yaitu Surah Al-Mulk.',
    source: 'HR. Abu Dawud & Tirmidzi',
  },
  {
    id: '5',
    title: 'Doa Kebaikan Dunia & Akhirat',
    category: 'doa',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina \'adhában-nar.',
    translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    source: 'QS. Al-Baqarah: 201',
  },
];

export const SurahDoaModal: React.FC<SurahDoaModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'doa' | 'surah'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredDoa = DOA_LIST.filter((item) => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (item: DoaItem) => {
    const textToCopy = `${item.title}\n\n${item.arabic}\n\nLatin: ${item.latin}\n\nArtinya: "${item.translation}" (${item.source})`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-white max-h-[85vh] flex flex-col">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Doa & Surah Pilihan</h3>
            <p className="text-xs text-slate-400">Kumpulan doa harian, zikir & keutamaan surah Al-Qur'an</p>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="space-y-2 mb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari doa, zikir, atau surah..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-2 text-xs font-bold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'all' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Semua ({DOA_LIST.length})
            </button>
            <button
              onClick={() => setFilter('doa')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'doa' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Doa Harian
            </button>
            <button
              onClick={() => setFilter('surah')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === 'surah' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Keutamaan Surah
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
          {filteredDoa.length === 0 ? (
            <div className="text-center py-8 text-slate-500">Doa atau Surah tidak ditemukan.</div>
          ) : (
            filteredDoa.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-extrabold text-amber-300 text-sm leading-snug">{item.title}</h4>
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                    title="Salin Doa"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="text-right text-lg sm:text-xl font-serif font-bold text-emerald-300 leading-loose py-2 tracking-wide font-arabic">
                  {item.arabic}
                </div>

                <div className="text-slate-300 font-mono text-[11px] bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                  {item.latin}
                </div>

                <p className="text-slate-400 text-xs italic leading-relaxed">"{item.translation}"</p>

                <div className="flex justify-between items-center text-[10px] text-emerald-400 font-semibold pt-1 border-t border-slate-900">
                  <span>Sumber: {item.source}</span>
                  <span className="uppercase text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {item.category}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
