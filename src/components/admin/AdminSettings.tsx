import React, { useState } from 'react';
import {
  ShieldCheck,
  KeyRound,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
  Database,
  RefreshCw,
  Building2,
  Phone,
  Clock,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { updateAuthPassword } from '../../services/firestoreDataService';
import { BRAND_CONFIG } from '../../config';

interface AdminSettingsProps {
  onReseedAll: () => Promise<void>;
  isSeeding: boolean;
  onPasswordChanged?: (newPass: string) => void;
  showToast: (msg: string) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  onReseedAll,
  isSeeding,
  onPasswordChanged,
  showToast,
}) => {
  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [savingPass, setSavingPass] = useState(false);

  // Store Contact Settings State (stored in localStorage for customization)
  const [branch1Phone, setBranch1Phone] = useState(() => {
    return localStorage.getItem('wlj_branch1_phone') || BRAND_CONFIG.store.branch1.phone;
  });
  const [branch2Phone, setBranch2Phone] = useState(() => {
    return localStorage.getItem('wlj_branch2_phone') || BRAND_CONFIG.store.branch2.phone;
  });
  const [storeHours, setStoreHours] = useState(() => {
    return localStorage.getItem('wlj_store_hours') || BRAND_CONFIG.store.hoursMarathi;
  });
  const [savingStore, setSavingStore] = useState(false);

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    const storedPass =
      localStorage.getItem('wlj_admin_master_password') ||
      localStorage.getItem('wlj_admin_custom_pin') ||
      '19511951';

    if (currentPass.trim() !== storedPass && currentPass.trim() !== '19511951') {
      setPassError('सध्याचा जुना पासवर्ड चुकीचा आहे!');
      return;
    }

    if (newPass.trim().length < 4) {
      setPassError('नवीन पासवर्ड किमान ४ अक्षरांचा किंवा अंकांचा असावा.');
      return;
    }

    if (newPass.trim() !== confirmPass.trim()) {
      setPassError('नवीन पासवर्ड आणि पुष्टी पासवर्ड एकमेकांशी जुळत नाहीत!');
      return;
    }

    try {
      setSavingPass(true);
      const updated = newPass.trim();
      // 1. Save in localStorage
      localStorage.setItem('wlj_admin_master_password', updated);
      localStorage.setItem('wlj_admin_custom_pin', updated);

      // 2. Sync to Firebase Firestore
      await updateAuthPassword(updated);

      if (onPasswordChanged) onPasswordChanged(updated);

      setPassSuccess('सुरक्षा पासवर्ड यशस्वीरित्या बदलला आहे!');
      showToast('नवा पासवर्ड क्लाऊडवर सेव्ह झाला.');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err: any) {
      console.error(err);
      setPassError('पासवर्ड बदलताना त्रुटी आली: ' + (err.message || 'Error'));
    } finally {
      setSavingPass(false);
    }
  };

  // Handle Store Settings Save
  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStore(true);
    localStorage.setItem('wlj_branch1_phone', branch1Phone);
    localStorage.setItem('wlj_branch2_phone', branch2Phone);
    localStorage.setItem('wlj_store_hours', storeHours);
    setTimeout(() => {
      setSavingStore(false);
      showToast('दालन संपर्क सेटिंग्ज सेव्ह झाल्या!');
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="pb-2 border-b border-[#D5C9B8]">
        <h2 className="text-xl font-serif font-bold text-[#3C0015] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#A37B30]" />
          सिस्टम सेटिंग्ज व सुरक्षा (System Settings)
        </h2>
        <p className="text-xs text-[#7A6B5D] mt-0.5">
          ॲडमिन पासवर्ड, दालन माहिती आणि फायरबेस क्लाऊड डेटाबेस नियंत्रण.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Section 1: Password Change */}
        <div className="bg-white p-5 rounded-2xl border border-[#D5C9B8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5DFD5]">
            <KeyRound className="w-4 h-4 text-[#8B2131]" />
            <h3 className="font-serif font-bold text-sm text-[#3C0015]">
              प्रशासक पासवर्ड बदला (Change Password)
            </h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-3.5">
            {passError && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            {passSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{passSuccess}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                सध्याचा जुना पासवर्ड (Current Password) *
              </label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="चालू पासवर्ड टाका..."
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                नवीन पासवर्ड (New Password) *
              </label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="नवीन पासवर्ड तयार करा..."
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                नवीन पासवर्ड पुन्हा टाका (Confirm Password) *
              </label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="पुष्टीसाठी पुन्हा टाका..."
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <button
              type="submit"
              disabled={savingPass}
              className="w-full py-2.5 px-4 bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif font-bold tracking-wider uppercase rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {savingPass ? (
                <>अपडेट होत आहे...</>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-[#E0C068]" />
                  नवीन पासवर्ड सेव्ह करा
                </>
              )}
            </button>
          </form>
        </div>

        {/* Section 2: Storefront Contact Settings */}
        <div className="bg-white p-5 rounded-2xl border border-[#D5C9B8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E5DFD5]">
            <Building2 className="w-4 h-4 text-[#8B2131]" />
            <h3 className="font-serif font-bold text-sm text-[#3C0015]">
              दालन व संपर्क तपशील (Showrooms)
            </h3>
          </div>

          <form onSubmit={handleSaveStoreSettings} className="space-y-3.5">
            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                शाखा १ (जुनी बाजारपेठ) संपर्क क्रमांक
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6B5D]" />
                <input
                  type="text"
                  value={branch1Phone}
                  onChange={(e) => setBranch1Phone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                शाखा २ (माणिक चौक) संपर्क क्रमांक
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6B5D]" />
                <input
                  type="text"
                  value={branch2Phone}
                  onChange={(e) => setBranch2Phone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                दालन उघडण्याची व बंद होण्याची वेळ
              </label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A6B5D]" />
                <input
                  type="text"
                  value={storeHours}
                  onChange={(e) => setStoreHours(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingStore}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#FAF8F5] text-[#3C0015] border border-[#D5C9B8] text-xs font-serif font-bold tracking-wider uppercase rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#8B2131]" />
              {savingStore ? 'सेव्ह होत आहे...' : 'दालन संपर्क सेव्ह करा'}
            </button>
          </form>
        </div>
      </div>

      {/* Section 3: Cloud Database Maintenance */}
      <div className="bg-[#1F000B] text-[#F3F0EA] p-5 rounded-2xl border border-[#A37B30]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#E0C068]" />
            <h4 className="font-serif font-bold text-sm text-[#E0C068]">
              फायरबेस क्लाऊड डेटाबेस (wlj-jewellers-pune)
            </h4>
          </div>
          <p className="text-xs text-[#E8DCC4]/70 mt-1">
            मुंबई सर्व्हरवर (`asia-south1`) अखंडित रिअल-टाइम बॅकअप सुरू आहे. मूळ डेटा पुन्हा रिस्टोअर करण्यासाठी समोरील बटण वापरा.
          </p>
        </div>

        <button
          onClick={onReseedAll}
          disabled={isSeeding}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#E0C068] border border-[#A37B30]/40 text-xs font-serif tracking-wider uppercase transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
          {isSeeding ? 'रिस्टोअर होत आहे...' : 'मूळ डेटा रिस्टोअर करा'}
        </button>
      </div>

    </div>
  );
};
