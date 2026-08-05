import React, { useState } from 'react';
import { Lock, User, KeyRound, X, AlertCircle, Eye, EyeOff, ShieldAlert, Sparkles } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (credentials: { username?: string; password?: string; pin?: string }) => boolean;
  adminUsername?: string;
  adminPassword?: string;
  adminPin?: string;
  showCredentialsHint?: boolean;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
  adminUsername = 'admin',
  adminPassword = 'kafa123',
  adminPin = '1234',
  showCredentialsHint = false,
}) => {
  const [loginMethod, setLoginMethod] = useState<'credentials' | 'pin'>('credentials');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'credentials') {
      if (!usernameInput.trim()) {
        setError('Masukkan Username Admin');
        return;
      }
      if (!passwordInput.trim()) {
        setError('Masukkan Password Admin');
        return;
      }

      const isValid = onAuthenticate({
        username: usernameInput.trim(),
        password: passwordInput.trim(),
      });

      if (isValid) {
        setError('');
        setUsernameInput('');
        setPasswordInput('');
      } else {
        setError('Username atau Password Salah!');
      }
    } else {
      if (!pinInput.trim()) {
        setError('Masukkan PIN Admin');
        return;
      }

      const isValid = onAuthenticate({ pin: pinInput.trim() });
      if (isValid) {
        setError('');
        setPinInput('');
      } else {
        setError('PIN Admin Salah!');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 border border-emerald-500/20">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
            Login Akses Admin Rahasia
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-xs">
            Masuk dengan Username & Password Anda untuk mengelola seluruh konten website.
          </p>

          {/* Toggle Tab Login Method */}
          <div className="w-full grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setLoginMethod('credentials');
                setError('');
              }}
              className={`py-2 rounded-lg transition-all ${
                loginMethod === 'credentials'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              👤 Username & Password
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod('pin');
                setError('');
              }}
              className={`py-2 rounded-lg transition-all ${
                loginMethod === 'pin'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              🔢 PIN Cepat
            </button>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-3.5 text-left">
            {loginMethod === 'credentials' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Username Admin
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={usernameInput}
                      onChange={(e) => {
                        setUsernameInput(e.target.value);
                        setError('');
                      }}
                      placeholder="Masukkan Username"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Password Admin
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setError('');
                      }}
                      placeholder="Masukkan Password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 text-center">
                  PIN Akses Admin
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setError('');
                    }}
                    placeholder="Masukkan PIN"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-center text-lg font-mono tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-500 font-semibold justify-center pt-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-emerald-600/20 active:scale-98 mt-2"
            >
              Masuk Dashboard Admin
            </button>
          </form>

          {/* Default Credentials Info (Only shown if enabled in Settings) */}
          {showCredentialsHint && (
            <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-[11px] text-slate-700 dark:text-slate-300 w-full space-y-1">
              <div className="flex items-center justify-between font-mono">
                <span>Username: <strong className="text-emerald-600 dark:text-emerald-400">{adminUsername}</strong></span>
                <span>Pass: <strong className="text-emerald-600 dark:text-emerald-400">{adminPassword}</strong></span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center pt-1 border-t border-amber-500/20">
                (Saran: Sembunyikan info ini melalui Pengaturan Admin agar lebih aman)
              </div>
            </div>
          )}

          {/* Secret Login Method Hint */}
          <div className="mt-3 text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            <span>Fitur Rahasia: Tekan <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded font-mono text-emerald-600">Ctrl + Shift + A</code> untuk login rahasia kapan saja.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
