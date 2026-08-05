import React from 'react';
import { MessageSquare, Users, ShieldCheck, Sparkles, ArrowRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { StoreSettings } from '../types';

interface CommunityBannerProps {
  settings: StoreSettings;
}

export const CommunityBanner: React.FC<CommunityBannerProps> = ({ settings }) => {
  if (settings.showCommunityBanner === false) return null;

  const waNumber = settings.whatsappNumber || '6281234567890';
  const waClean = waNumber.replace(/\D/g, '');
  const groupUrl = settings.communityGroupUrl || `https://wa.me/${waClean}?text=Assalamu'alaikum%20Admin%20Sahabat%20Kafa,%20saya%20ingin%20gabung%20grup%20komunitas%20VIP!`;
  const directWaUrl = `https://wa.me/${waClean}?text=Assalamu'alaikum%20Admin%20Sahabat%20Kafa,%20saya%20mau%20tanya-tanya%20seputar%20produk/kelas/emas%20syariah`;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 p-6 sm:p-8 md:p-10 text-white border border-emerald-500/30 shadow-2xl">
      {/* Decorative background ambient circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Information & Text */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>PUSAT BANTUAN & KOMUNITAS SAHABAT KAFA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            Ingin Tanya-Tanya atau Gabung Komunitas VIP Sahabat Kafa?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Dapatkan bimbingan langsung dari Admin, konsultasi COD Emas Syariah Semarang, hingga diskusi trik membuat konten animasi faceless islami bersama sesama sahabat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Konsultasi Bebas & Ramah</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Info Promo & Modul Gratis</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pendampingan Faceless Creator</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transkasi COD Emas Syariah</span>
            </div>
          </div>
        </div>

        {/* Right Column: CTA Buttons */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-black text-white flex items-center justify-center sm:justify-start gap-2">
              <HelpCircle className="w-6 h-6 text-emerald-400" />
              <span>KONSULTASI GRATIS VIA WA</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Ada pertanyaan seputar emas syariah, kelas animasi, atau produk digital? Hubungi admin secara gratis.
            </p>
          </div>

          <a
            href={directWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl shadow-emerald-500/25 border border-emerald-300"
          >
            <MessageSquare className="w-6 h-6 fill-slate-950 text-slate-950 shrink-0" />
            <span className="tracking-wide">TANYA WA & GRATIS KONSULTASI APA PUN</span>
            <ArrowRight className="w-5 h-5 ml-auto shrink-0" />
          </a>

          <a
            href={groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-emerald-500/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
          >
            <Users className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>GABUNG GRUP VIP SAHABAT KAFA</span>
            <ArrowRight className="w-4 h-4 ml-auto text-slate-400 shrink-0" />
          </a>

          <p className="text-[11px] text-center text-slate-300 pt-1">
            ⚡ Respon Cepat Admin: ~3-10 menit di jam kerja
          </p>
        </div>
      </div>
    </section>
  );
};
