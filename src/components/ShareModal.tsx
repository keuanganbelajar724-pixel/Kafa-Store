import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Share2, MessageCircle, Send } from 'lucide-react';
import { StoreSettings } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, settings }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    currentUrl
  )}&color=10b981&bgcolor=0f172a`;

  const shareText = `Yuk cek ${settings.storeName} - ${settings.tagline}! Akses katalog produk digital & muamalah terpercaya:`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-white text-center overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
          <Share2 className="w-3.5 h-3.5" />
          <span>Bagikan Katalog Toko</span>
        </div>

        <h3 className="text-xl font-black text-white mb-1">{settings.storeName}</h3>
        <p className="text-xs text-slate-400 mb-4">{settings.tagline}</p>

        {/* QR Code Container */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 inline-block my-2 shadow-inner">
          <img
            src={qrApiUrl}
            alt="Scan QR Code Toko"
            className="w-44 h-44 mx-auto rounded-xl border border-emerald-500/30 p-1 bg-slate-900"
          />
          <p className="text-[11px] text-emerald-400 font-bold mt-2 flex items-center justify-center gap-1">
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan dengan Kamera HP</span>
          </p>
        </div>

        {/* Copy Link Input */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1.5">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent px-2 text-xs text-slate-300 w-full focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
            </button>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Share WhatsApp</span>
            </a>

            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span>Share Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
