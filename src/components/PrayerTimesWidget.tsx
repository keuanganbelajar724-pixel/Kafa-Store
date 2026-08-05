import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  MapPin,
  Sparkles,
  Bell,
  BellOff,
  ChevronDown,
  Volume2,
  BookmarkCheck,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface PrayerTime {
  id: string;
  name: string;
  time: string; // "HH:MM"
  icon: string;
  description: string;
}

const CITIES: { name: string; zone: string; offsetMinutes: number }[] = [
  { name: 'Jakarta & Sekitarnya', zone: 'WIB', offsetMinutes: 0 },
  { name: 'Bandung', zone: 'WIB', offsetMinutes: -2 },
  { name: 'Surabaya', zone: 'WIB', offsetMinutes: -15 },
  { name: 'Semarang', zone: 'WIB', offsetMinutes: -8 },
  { name: 'Yogyakarta', zone: 'WIB', offsetMinutes: -7 },
  { name: 'Medan', zone: 'WIB', offsetMinutes: 22 },
  { name: 'Palembang', zone: 'WIB', offsetMinutes: 10 },
  { name: 'Makassar', zone: 'WITA', offsetMinutes: -60 },
  { name: 'Denpasar', zone: 'WITA', offsetMinutes: -52 },
  { name: 'Jayapura', zone: 'WIT', offsetMinutes: -120 },
];

const BASE_PRAYER_TIMES: PrayerTime[] = [
  { id: 'subuh', name: 'Subuh', time: '04:42', icon: '🌅', description: '2 Rakaat' },
  { id: 'terbit', name: 'Terbit', time: '05:58', icon: '☀️', description: 'Syuruq' },
  { id: 'dzuhur', name: 'Dzuhur', time: '12:01', icon: '🌞', description: '4 Rakaat' },
  { id: 'ashar', name: 'Ashar', time: '15:22', icon: '🌤️', description: '4 Rakaat' },
  { id: 'maghrib', name: 'Maghrib', time: '17:58', icon: '🌇', description: '3 Rakaat' },
  { id: 'isya', name: 'Isya', time: '19:09', icon: '🌙', description: '4 Rakaat' },
];

export const PrayerTimesWidget: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [adzanSoundEnabled, setAdzanSoundEnabled] = useState(true);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute prayer times adjusted for selected city offset
  const prayerTimes = BASE_PRAYER_TIMES.map((pt) => {
    const [h, m] = pt.time.split(':').map(Number);
    let totalMinutes = h * 60 + m + selectedCity.offsetMinutes;
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    if (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;

    const newH = Math.floor(totalMinutes / 60);
    const newM = totalMinutes % 60;
    const formatted = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
    return { ...pt, time: formatted, totalMinutes };
  });

  // Calculate current minutes & next prayer
  const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const nowSeconds = currentTime.getSeconds();

  let nextPrayer = prayerTimes.find((pt) => pt.totalMinutes > nowMinutes && pt.name !== 'Terbit');
  if (!nextPrayer) {
    nextPrayer = prayerTimes[0]; // Next is Subuh tomorrow
  }

  // Countdown computation
  const calculateCountdown = () => {
    if (!nextPrayer) return '00:00:00';
    let diffMinutes = nextPrayer.totalMinutes - nowMinutes - 1;
    let diffSeconds = 60 - nowSeconds;
    if (diffSeconds === 60) {
      diffSeconds = 0;
      diffMinutes += 1;
    }

    if (diffMinutes < 0) {
      diffMinutes += 24 * 60;
    }

    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(diffSeconds).padStart(2, '0')}`;
  };

  const formattedDateMasehi = currentTime.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedClock = currentTime.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const toggleAdzanNotification = () => {
    setAdzanSoundEnabled(!adzanSoundEnabled);
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 3000);
  };

  return (
    <div id="jadwal-sholat" className="w-full max-w-xl mx-auto px-4 my-6">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl p-5 sm:p-6 transition-all">
        {/* Background Decorative Gradient Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* TOP BAR: Location Selector & Adzan Bell Toggle */}
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lokasi Wilayah</div>
              <div className="relative inline-block">
                <select
                  value={selectedCity.name}
                  onChange={(e) => {
                    const found = CITIES.find((c) => c.name === e.target.value);
                    if (found) setSelectedCity(found);
                  }}
                  className="bg-transparent text-xs font-black text-white focus:outline-none cursor-pointer pr-4 appearance-none hover:text-emerald-400 transition-colors"
                >
                  {CITIES.map((c) => (
                    <option key={c.name} value={c.name} className="bg-slate-900 text-white">
                      {c.name} ({c.zone})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-emerald-400 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAdzanNotification}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                adzanSoundEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={adzanSoundEnabled ? 'Pengingat Adzan Aktif' : 'Pengingat Adzan Senyap'}
            >
              {adzanSoundEnabled ? <Bell className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <BellOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{adzanSoundEnabled ? 'Adzan Aktif' : 'Senyap'}</span>
            </button>
          </div>
        </div>

        {/* MIDDLE SECTION: Live Time & Countdown Highlight Banner */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          {/* Realtime Clock & Date */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{formattedDateMasehi}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white">
                {formattedClock}
              </span>
              <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                {selectedCity.zone}
              </span>
            </div>
          </div>

          {/* Next Prayer Countdown Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 flex items-center justify-between shadow-inner">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider text-emerald-300">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Menuju {nextPrayer.name}</span>
              </div>
              <div className="text-xl font-black font-mono tracking-tight text-amber-300 mt-0.5">
                {calculateCountdown()}
              </div>
              <div className="text-[10px] text-slate-300 font-semibold mt-0.5">
                Jam {nextPrayer.time} {selectedCity.zone}
              </div>
            </div>
            <div className="text-3xl bg-slate-900/80 p-2.5 rounded-2xl border border-emerald-500/30 shadow-md">
              {nextPrayer.icon}
            </div>
          </div>
        </div>

        {/* PRAYER SCHEDULE CARDS: Clean 6-Column Layout (Always visible & responsive) */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jadwal 5 Waktu & Syuruq</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">
              Kemenag RI Standard
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {prayerTimes.map((pt) => {
              const isNext = pt.name === nextPrayer.name;
              return (
                <div
                  key={pt.id}
                  className={`relative p-2.5 rounded-2xl border text-center transition-all ${
                    isNext
                      ? 'bg-gradient-to-b from-emerald-600 to-teal-700 border-emerald-400 text-white shadow-lg shadow-emerald-600/30 scale-[1.03] z-10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  {isNext && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-tighter shadow-sm">
                      Berikutnya
                    </div>
                  )}
                  <div className="text-lg mb-1">{pt.icon}</div>
                  <div className={`text-[11px] font-bold ${isNext ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {pt.name}
                  </div>
                  <div className={`text-xs font-mono font-black mt-0.5 ${isNext ? 'text-white' : 'text-slate-100'}`}>
                    {pt.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toast alert indicator */}
        {showNotificationToast && (
          <div className="mt-3 p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              Pengingat Waktu Sholat: {adzanSoundEnabled ? 'Diaktifkan (Suara/Notifikasi)' : 'Ditiadakan (Mode Senyap)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
