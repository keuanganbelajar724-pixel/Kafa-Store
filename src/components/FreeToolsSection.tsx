import React, { useState } from 'react';
import { FreeWebTool } from '../types';
import { ExternalLink, Sparkles, BookOpen, Calculator, Quote, Compass, Layout, Wrench, ChevronRight } from 'lucide-react';

interface FreeToolsSectionProps {
  tools?: FreeWebTool[];
  onOpenGoldCalc?: () => void;
  onOpenZakatCalc?: () => void;
  onOpenSurahDoa?: () => void;
}

export const FreeToolsSection: React.FC<FreeToolsSectionProps> = ({
  tools = [],
  onOpenGoldCalc,
  onOpenZakatCalc,
  onOpenSurahDoa,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const safeTools = Array.isArray(tools) ? tools : [];
  const categories = ['Semua', ...Array.from(new Set(safeTools.map((t) => t?.category).filter((cat): cat is string => Boolean(cat))))];

  const filteredTools = selectedCategory === 'Semua'
    ? safeTools
    : safeTools.filter((t) => t?.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5" />;
      case 'Quote':
        return <Quote className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-400 dark:text-emerald-300 light:text-emerald-800 bg-emerald-500/10';
      case 'amber':
        return 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-400 dark:text-amber-300 light:text-amber-800 bg-amber-500/10';
      case 'sky':
        return 'from-sky-500/20 to-blue-500/10 border-sky-500/40 text-sky-400 dark:text-sky-300 light:text-sky-800 bg-sky-500/10';
      case 'rose':
        return 'from-rose-500/20 to-pink-500/10 border-rose-500/40 text-rose-400 dark:text-rose-300 light:text-rose-800 bg-rose-500/10';
      case 'indigo':
        return 'from-indigo-500/20 to-purple-500/10 border-indigo-500/40 text-indigo-400 dark:text-indigo-300 light:text-indigo-800 bg-indigo-500/10';
      case 'violet':
        return 'from-violet-500/20 to-purple-500/10 border-violet-500/40 text-violet-400 dark:text-violet-300 light:text-violet-800 bg-violet-500/10';
      default:
        return 'from-slate-500/20 to-slate-600/10 border-slate-500/40 text-emerald-400 bg-slate-500/10';
    }
  };

  const handleToolClick = (tool: FreeWebTool) => {
    if (tool.url === '#kalkulator-emas' && onOpenGoldCalc) {
      onOpenGoldCalc();
    } else if (tool.url === '#kalkulator-zakat' && onOpenZakatCalc) {
      onOpenZakatCalc();
    } else if (tool.url === '#doa-surah' && onOpenSurahDoa) {
      onOpenSurahDoa();
    } else if (tool.url === '#quote-generator') {
      const el = document.getElementById('quote-generator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tool.url === '#jadwal-sholat') {
      const el = document.getElementById('jadwal-sholat');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (tool.url) {
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="free-tools-section" className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ekosistem Web & Tools Gratis</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          🌐 Web & Tools Sahabat Kafa
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Fitur web & tools interaktif dari Sahabat Kafa untuk kemudahan transaksi emas syariah, edukasi, & produktivitas digital.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                  : 'bg-slate-200/80 dark:bg-slate-800/80 light:bg-slate-200 text-slate-700 dark:text-slate-300 light:text-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Web Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const colorClass = getColorClasses(tool.color);
          return (
            <div
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={`group relative p-5 rounded-3xl bg-gradient-to-br ${colorClass} bg-white dark:bg-slate-900/90 light:bg-white border hover:border-emerald-500/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${colorClass} border border-emerald-500/30 shadow-inner`}>
                    {getIcon(tool.icon)}
                  </div>
                  {tool.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 light:text-emerald-800 border border-emerald-500/30">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white light:text-slate-900 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                    <span>{tool.title}</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 light:text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200/60 dark:border-slate-800 light:border-slate-200 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 light:text-emerald-700">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 light:text-slate-500">
                  {tool.category}
                </span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Akses Tool</span>
                  {tool.isExternal ? <ExternalLink className="w-3.5 h-3.5" /> : <ChevronRight className="w-4 h-4" />}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
