import React from 'react';

export const MosqueAmbientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Top Center Ambient Radial Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl rounded-full opacity-80 animate-pulse duration-10000" />

      {/* Floating Animated Golden Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-bounce-slow" />
      <div className="absolute top-1/3 right-10 w-44 h-44 bg-emerald-400/10 rounded-full blur-3xl animate-pulse duration-7000" />

      {/* Subtle Floating Geometric Stars Pattern */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <path d="M50 0 L61 38 L100 50 L61 62 L50 100 L39 62 L0 50 L39 38 Z" fill="currentColor" className="text-emerald-500" />
        </svg>
      </div>

      {/* Elegant Silhouette Mosque Dome & Minarets Line Art at Hero Bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center opacity-10 dark:opacity-20 transition-opacity duration-500">
        <svg
          className="w-full max-w-4xl h-28 sm:h-40 text-emerald-600 dark:text-emerald-400"
          viewBox="0 0 1200 300"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Left Minaret */}
          <rect x="150" y="80" width="16" height="220" rx="3" />
          <path d="M150 80 L158 30 L166 80 Z" />
          <circle cx="158" cy="22" r="5" />

          {/* Left Small Dome */}
          <path d="M220 300 C220 200 280 200 280 300 Z" />
          <path d="M250 190 L250 170" stroke="currentColor" strokeWidth="3" />

          {/* Central Grand Mosque Dome */}
          <path d="M450 300 C450 120 750 120 750 300 Z" />
          {/* Crescent Moon Crescent on Top of Grand Dome */}
          <path d="M600 115 C600 90 620 90 620 115 Z" />
          <circle cx="600" cy="85" r="7" />
          <path d="M597 80 A6 6 0 1 0 603 90 A5 5 0 1 1 597 80 Z" />

          {/* Right Small Dome */}
          <path d="M920 300 C920 200 980 200 980 300 Z" />
          <path d="M950 190 L950 170" stroke="currentColor" strokeWidth="3" />

          {/* Right Minaret */}
          <rect x="1030" y="80" width="16" height="220" rx="3" />
          <path d="M1030 80 L1038 30 L1046 80 Z" />
          <circle cx="1038" cy="22" r="5" />

          {/* Base Floor Line */}
          <rect x="0" y="295" width="1200" height="5" />
        </svg>
      </div>

      {/* Shimmering Ambient Particles */}
      <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping opacity-60" />
      <div className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-emerald-300 animate-pulse opacity-70" />
      <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-teal-200 animate-ping opacity-50" />
    </div>
  );
};
