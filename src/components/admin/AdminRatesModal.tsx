import React, { useState } from 'react';
import { X, Save, TrendingUp, Sparkles, Check, AlertCircle } from 'lucide-react';
import { DailyRates } from '../../types';

interface AdminRatesModalProps {
  rates: DailyRates;
  isOpen: boolean;
  onClose: () => void;
  onSave: (rates: DailyRates) => Promise<void>;
}

export const AdminRatesModal: React.FC<AdminRatesModalProps> = ({
  rates,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [gold24K, setGold24K] = useState(rates.gold24K_10g || 76850);
  const [gold22K, setGold22K] = useState(rates.gold22K_10g || Math.round((rates.gold24K_10g || 76850) * 0.916));
  const [gold18K, setGold18K] = useState(rates.gold18K_10g || Math.round((rates.gold24K_10g || 76850) * 0.75));
  const [silver1kg, setSilver1kg] = useState(rates.silver1kg || 94800);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-calculate 22K & 18K when 24K changes
  const handle24KChange = (val: number) => {
    setGold24K(val);
    setGold22K(Math.round(val * 0.916));
    setGold18K(Math.round(val * 0.75));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setErrorMsg('');
      const updated: DailyRates = {
        gold24K_10g: Number(gold24K),
        gold22K_10g: Number(gold22K),
        gold18K_10g: Number(gold18K),
        silver1kg: Number(silver1kg),
        gold22K_1g: Math.round(Number(gold22K) / 10),
        silver1g: Math.round(Number(silver1kg) / 1000),
        lastUpdated: new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' }) + ' अपडेट',
        source: 'manual',
      };
      await onSave(updated);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'दर सेव्ह करताना त्रुटी आली');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-[#29231F] w-full max-w-lg rounded-2xl shadow-2xl border border-[#D5C9B8] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#3C0015] text-[#F3F0EA] flex items-center justify-between border-b border-[#A37B30]/30">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#E0C068] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#E0C068]" />
              आजचे सोने-चांदी भाव अपडेट करा
            </h3>
            <p className="text-xs text-[#E8DCC4]/70">
              संकेतस्थळावरील लाइव्ह टिकर बार त्वरित अपडेट होईल
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#5A4D41] mb-1">
              २४ कॅरेट शुद्ध सोने (१० ग्रॅम) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8C7A6B]">₹</span>
              <input
                type="number"
                required
                value={gold24K}
                onChange={(e) => handle24KChange(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131] font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                २२ कॅरेट हॉलमार्क (१० ग्रॅम)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8C7A6B]">₹</span>
                <input
                  type="number"
                  required
                  value={gold22K}
                  onChange={(e) => setGold22K(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
              <span className="text-[10px] text-[#8C7A6B] mt-0.5 block">
                प्रति १ ग्रॅम: ₹{Math.round(gold22K / 10)}
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                १८ कॅरेट दागिना सोने (१० ग्रॅम)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8C7A6B]">₹</span>
                <input
                  type="number"
                  required
                  value={gold18K}
                  onChange={(e) => setGold18K(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
              <span className="text-[10px] text-[#8C7A6B] mt-0.5 block">
                प्रति १ ग्रॅम: ₹{Math.round(gold18K / 10)}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#5A4D41] mb-1">
              शुद्ध चांदी भाव (प्रति १ किलो) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8C7A6B]">₹</span>
              <input
                type="number"
                required
                value={silver1kg}
                onChange={(e) => setSilver1kg(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>
            <span className="text-[10px] text-[#8C7A6B] mt-0.5 block">
              प्रति १ ग्रॅम चांदी: ₹{Math.round(silver1kg / 1000)}
            </span>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-[#D5C9B8] text-xs font-medium text-[#5A4D41] hover:bg-white transition-colors cursor-pointer"
            >
              रद्द करा
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? 'अपडेट होत आहे...' : 'लाईव्ह भाव अपडेट करा'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
