import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowLeft, KeyRound, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onExit: () => void;
  cloudPassword?: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onExit, cloudPassword }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = password.trim();

    // Check custom password from cloud or localStorage or default 19511951
    const customStored = localStorage.getItem('wlj_admin_master_password') || localStorage.getItem('wlj_admin_custom_pin');
    const validPassword = cloudPassword || customStored || '19511951';

    if (entered === validPassword || (entered === '19511951' && !customStored)) {
      sessionStorage.setItem('wlj_admin_session_token', 'auth_' + Date.now());
      onLoginSuccess();
    } else {
      setError(true);
      setErrorMessage('चुकीचा पासवर्ड! कृपया योग्य प्रशासक पासवर्ड टाका.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1F000B] text-[#F3F0EA] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Golden Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A37B30]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#3C0015]/40 rounded-full blur-2xl pointer-events-none" />

      {/* Back to store button */}
      <button
        onClick={onExit}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-serif tracking-wider uppercase text-[#E0C068]/80 hover:text-[#E0C068] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        मुख्य संकेतस्थळावर परत जा
      </button>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#2B0311]/95 border border-[#A37B30]/40 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        
        {/* Brand Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center">
            <BrandLogo size="md" variant="maroon" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A37B30]/20 border border-[#A37B30]/40 text-[#E0C068] text-xs font-serif tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              प्रशासकीय नियंत्रण कक्ष • ADMIN PORTAL
            </div>
            <p className="text-xs text-[#E8DCC4]/70 mt-2 font-serif">
              वाफगांवकर लक्ष्मी ज्वेलर्स व्यवस्थापन प्रणाली
            </p>
          </div>
        </div>

        {/* Password Form (NO PASSWORD MENTION ANYWHERE) */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-serif tracking-wider uppercase text-[#E0C068] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                प्रशासक पासवर्ड (Password)
              </span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                autoFocus
                placeholder="सुरक्षा पासवर्ड प्रविष्ट करा..."
                className="w-full bg-[#180008] border border-[#A37B30]/50 rounded-xl pl-4 pr-11 py-3 text-sm text-[#F3F0EA] placeholder:text-[#E8DCC4]/30 focus:outline-none focus:border-[#E0C068] focus:ring-1 focus:ring-[#E0C068] tracking-wider transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A37B30] hover:text-[#E0C068] transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="mt-2 text-xs text-red-300 flex items-center gap-1.5 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {errorMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#A37B30] via-[#C9A050] to-[#A37B30] text-[#1F000B] font-serif font-bold text-sm tracking-wider uppercase shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            प्रवेश करा (LOGIN)
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#A37B30]/20 text-center text-[11px] text-[#E8DCC4]/50">
          सुरक्षित क्लाऊड फायरबेस रियल-टाइम डेटाबेस कनेक्शन • चाकण, पुणे
        </div>
      </div>
    </div>
  );
};
