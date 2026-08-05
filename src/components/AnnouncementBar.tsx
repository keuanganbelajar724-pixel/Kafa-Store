import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface AnnouncementBarProps {
  text?: string;
  active: boolean;
  onClose?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ text, active, onClose }) => {
  if (!active || !text) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-4 py-2.5 text-xs sm:text-sm font-medium shadow-md relative z-30 flex items-center justify-between gap-2 border-b border-emerald-500/30">
      <div className="flex items-center gap-2 max-w-4xl mx-auto text-center justify-center overflow-hidden">
        <Sparkles className="w-4 h-4 text-amber-300 shrink-0 animate-pulse" />
        <span className="truncate">{text}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          title="Tutup pengumuman"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
