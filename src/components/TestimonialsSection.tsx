import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';
import { INITIAL_TESTIMONIALS } from '../data/initialData';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const list = testimonials && testimonials.length > 0 ? testimonials : INITIAL_TESTIMONIALS;

  if (list.length === 0) return null;

  return (
    <section className="py-10 border-t border-slate-200 dark:border-slate-800/80">
      <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
          Ulasan & Kata Mereka
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Apa Kata Sahabat Kafa?
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Pengalaman langsung dari alumni kelas animasi, pembeli e-book, & anggota komunitas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map((testi) => (
          <div
            key={testi.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors shadow-md text-slate-900 dark:text-white"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                  {Array.from({ length: Math.min(5, Math.max(1, testi.rating || 5)) }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-slate-300 dark:text-slate-700" />
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{testi.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
              <img
                src={testi.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                alt={testi.name}
                className="w-10 h-10 rounded-full object-cover border border-emerald-500/30 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{testi.name}</h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{testi.role}</p>
                {testi.productTitle && (
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400/80 font-medium truncate mt-0.5">
                    {testi.productTitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

