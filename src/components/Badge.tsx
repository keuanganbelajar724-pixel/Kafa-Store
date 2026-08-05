import React from 'react';
import { BadgeColor } from '../types';

interface BadgeProps {
  text: string;
  color?: BadgeColor;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ text, color = 'emerald', size = 'sm' }) => {
  const colorClasses: Record<BadgeColor, string> = {
    green: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    emerald: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30',
    blue: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
    red: 'bg-rose-500 text-white font-semibold shadow-sm border-rose-600',
    amber: 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40 font-semibold',
    purple: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
    gold: 'bg-gradient-to-r from-amber-500/30 to-yellow-500/30 text-amber-300 border-amber-400/50 font-bold',
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px] font-bold' : 'px-2.5 py-1 text-xs font-bold';

  return (
    <span
      className={`inline-flex items-center rounded-full border uppercase tracking-wider ${colorClasses[color]} ${sizeClasses}`}
    >
      {text}
    </span>
  );
};
