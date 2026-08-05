import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Moon, Sun, Sparkles, Copy, Check } from 'lucide-react';

export const LiveClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Time
  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  let displayHours = hours;
  let ampm = '';
  if (!is24Hour) {
    ampm = hours >= 12 ? ' PM' : ' AM';
    displayHours = hours % 12 || 12;
  }
  const formattedHours = displayHours.toString().padStart(2, '0');

  // Greeting based on time
  const getGreeting = () => {
    if (hours >= 4 && hours < 11) return { text: 'Selamat Pagi', icon: '🌅', color: 'text-amber-400' };
    if (hours >= 11 && hours < 15) return { text: 'Selamat Siang', icon: '☀️', color: 'text-yellow-400' };
    if (hours >= 15 && hours < 18) return { text: 'Selamat Sore', icon: '🌤️', color: 'text-orange-400' };
    return { text: 'Selamat Malam', icon: '🌙', color: 'text-teal-300' };
  };

  const greeting = getGreeting();

  // Gregorian Date (Indonesian)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const gregorianDateStr = time.toLocaleDateString('id-ID', options);

  // Approximate Hijri Date Calculation for display
  const getHijriDate = (date: Date) => {
    try {
      const hijriFormatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      return hijriFormatter.format(date) + ' H';
    } catch {
      return '1448 H';
    }
  };

  const hijriDateStr = getHijriDate(time);

  const copyTimeAndDate = () => {
    const textToCopy = `${gregorianDateStr} (${hijriDateStr}) - Pukul ${formattedHours}:${minutes}:${seconds}${ampm} WIB`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-emerald-950/90 backdrop-blur-xl border border-emerald-500/30 shadow-xl text-white transition-all">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Time Greeting & Date */}
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 shadow-inner">
            <span className="text-2xl">{greeting.icon}</span>
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className={`text-xs font-black uppercase tracking-wider ${greeting.color}`}>
                {greeting.text}!
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE
              </span>
            </div>

            <div className="text-xs sm:text-sm font-extrabold text-slate-100 mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{gregorianDateStr}</span>
            </div>

            <div className="text-[11px] text-emerald-300/90 font-medium flex items-center justify-center sm:justify-start gap-1 mt-0.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{hijriDateStr}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Digital Clock Display & Interactive Controls */}
        <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner flex items-center gap-2 font-mono">
              <Clock className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="text-xl sm:text-2xl font-black text-white tracking-widest">
                {formattedHours}:{minutes}:
                <span className="text-emerald-400">{seconds}</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400">{ampm || 'WIB'}</span>
            </div>
          </div>

          {/* Interactive Toggle Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-300 transition-all border border-white/10"
              title="Ganti Format 12-Jam / 24-Jam"
            >
              {is24Hour ? 'Format 24 Jam' : 'Format 12 Jam'}
            </button>

            <button
              onClick={copyTimeAndDate}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-[10px] font-bold text-emerald-300 transition-all border border-emerald-500/30 flex items-center gap-1"
              title="Salin Tanggal & Jam"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Tersalin!' : 'Salin Jam'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
