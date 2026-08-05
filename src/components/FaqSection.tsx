import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { FaqItem } from '../types';
import { INITIAL_FAQS } from '../data/initialData';

interface FaqSectionProps {
  faqs?: FaqItem[];
  whatsappNumber?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, whatsappNumber }) => {
  const faqList = faqs && faqs.length > 0 ? faqs : INITIAL_FAQS;
  const [openId, setOpenId] = useState<string | null>(faqList[0]?.id || null);

  const cleanWa = (whatsappNumber || '6281234567890').replace(/[^0-9]/g, '');

  return (
    <div className="w-full max-w-4xl mx-auto px-4 my-12">
      <div className="rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden text-slate-900 dark:text-white">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            <span>Pusat Informasi & Jawaban Pertanyaan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Pertanyaan Sering Diajukan (FAQ)</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Temukan informasi dan jawaban lengkap seputar produk digital, kelas, dan layanan Sahabat Kafa.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {faqList.map((faq) => {
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
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/40 whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Ask Admin Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Masih punya pertanyaan lain yang belum terjawab?</span>
          <a
            href={`https://wa.me/${cleanWa}?text=Halo%20Admin%20Sahabat%20Kafa,%20saya%20punya%20pertanyaan`}
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

