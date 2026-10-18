import React, { useState } from 'react';
import { X, Save, Sparkles, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { HeroSlide } from '../../types';
import { GalleryImagePicker } from './GalleryImagePicker';

interface AdminHeroModalProps {
  slide?: HeroSlide | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (slide: HeroSlide) => Promise<void>;
}

export const AdminHeroModal: React.FC<AdminHeroModalProps> = ({
  slide,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isEditing = !!slide;

  const [formData, setFormData] = useState<Partial<HeroSlide>>(() => {
    if (slide) return { ...slide };
    return {
      id: `hero-${Date.now()}`,
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2200&auto=format&fit=crop',
      mobileImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1100&auto=format&fit=crop',
      smallLabelMr: 'इ. स. १९५१ पासून विश्वासाची परंपरा',
      smallLabelEn: 'TRADITION OF TRUST • SINCE 1951',
      headlineMr: 'परंपरेचा राजेशाही साज,\nआजच्या चिरंतन सौंदर्यासाठी.',
      headlineEn: 'Heirloom Royal Artistry,\nFor Timeless Modern Grace.',
      subtextMr: 'शुद्ध २२ कॅरेट सोने, १००% सरकारी हॉलमार्क आणि सात दशकांची विश्वासार्ह कारागिरी.',
      subtextEn: 'Certified 22K pure gold, authentic BIS hallmark, and seven decades of family trust.',
      ctaMr: 'कॅटलॉग पहा',
      ctaEn: 'Explore Catalogue',
      targetCategory: 'all',
      order: 1,
      active: true,
    };
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      setErrorMsg('कृपया मुख्य हिरो बॅनर फोटो गॅलरीतून निवडा');
      return;
    }
    if (!formData.headlineMr?.trim() || !formData.headlineEn?.trim()) {
      setErrorMsg('कृपया मराठी आणि इंग्रजी मुख्य मथळा (Headline) भरा');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg('');
      await onSave({
        ...formData,
        mobileImage: formData.mobileImage || formData.image,
      } as HeroSlide);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'बॅनर सेव्ह करताना त्रुटी आली');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-[#29231F] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#D5C9B8] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#3C0015] text-[#F3F0EA] flex items-center justify-between border-b border-[#A37B30]/30">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#E0C068] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E0C068]" />
              {isEditing ? 'हिरो बॅनर स्लाइड संपादन करा' : 'नवीन हिरो बॅनर स्लाइड जोडा'}
            </h3>
            <p className="text-xs text-[#E8DCC4]/70">
              होमपेजवरील मुख्य कॅरोसेल बॅनर (Hero Carousel)
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* Banner Images */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm space-y-4">
            <h4 className="text-xs font-serif tracking-wider uppercase text-[#8B2131] font-bold border-b pb-2 border-[#E5DFD5]">
              १. बॅनर इमेजेस (Banner Visuals)
            </h4>

            <div>
              <GalleryImagePicker
                label="डेस्कटॉप बॅनर फोटो (गॅलरीतून अपलोड)"
                images={formData.image ? [formData.image] : []}
                onChange={(imgs) => setFormData({ ...formData, image: imgs[0] || '' })}
                multiple={false}
                hint="वाइड लँडस्केप फोटो निवडा (16:9 किंवा 21:9)"
                recommendedAspect="1920x900 किंवा 16:9"
                folder="hero"
              />
            </div>

            <div>
              <GalleryImagePicker
                label="मोबाईल स्क्रीनसाठी बॅनर फोटो (ऐच्छिक / Optional)"
                images={formData.mobileImage ? [formData.mobileImage] : []}
                onChange={(imgs) => setFormData({ ...formData, mobileImage: imgs[0] || '' })}
                multiple={false}
                hint="मोबाईलसाठी पोट्रेट किंवा स्क्वेअर फोटो (रिकामे ठेवल्यास मुख्य फोटो वापरला जाईल)"
                recommendedAspect="800x1000 किंवा 4:5"
                folder="hero"
              />
            </div>
          </div>

          {/* Headlines & Labels */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm space-y-4">
            <h4 className="text-xs font-serif tracking-wider uppercase text-[#8B2131] font-bold border-b pb-2 border-[#E5DFD5]">
              २. मथळा व मजकूर (Headlines & Labels)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  लहान लेबल (मराठी)
                </label>
                <input
                  type="text"
                  value={formData.smallLabelMr || ''}
                  onChange={(e) => setFormData({ ...formData, smallLabelMr: e.target.value })}
                  placeholder="उदा. इ. स. १९५१ पासून विश्वासाची परंपरा"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  Small Label (English)
                </label>
                <input
                  type="text"
                  value={formData.smallLabelEn || ''}
                  onChange={(e) => setFormData({ ...formData, smallLabelEn: e.target.value })}
                  placeholder="e.g. TRADITION OF TRUST • SINCE 1951"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  मुख्य मथळा (Headline मराठी) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.headlineMr || ''}
                  onChange={(e) => setFormData({ ...formData, headlineMr: e.target.value })}
                  placeholder="उदा. परंपरेचा राजेशाही साज, आजच्या चिरंतन सौंदर्यासाठी."
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  Headline (English) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.headlineEn || ''}
                  onChange={(e) => setFormData({ ...formData, headlineEn: e.target.value })}
                  placeholder="e.g. Heirloom Royal Artistry, For Timeless Modern Grace."
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  उपमजकूर (Subtext मराठी)
                </label>
                <textarea
                  rows={2}
                  value={formData.subtextMr || ''}
                  onChange={(e) => setFormData({ ...formData, subtextMr: e.target.value })}
                  placeholder="उदा. शुद्ध २२ कॅरेट सोने, १००% सरकारी हॉलमार्क..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  Subtext (English)
                </label>
                <textarea
                  rows={2}
                  value={formData.subtextEn || ''}
                  onChange={(e) => setFormData({ ...formData, subtextEn: e.target.value })}
                  placeholder="e.g. Certified 22K pure gold, authentic BIS hallmark..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
            </div>
          </div>

          {/* CTA Button and Navigation Target */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm space-y-4">
            <h4 className="text-xs font-serif tracking-wider uppercase text-[#8B2131] font-bold border-b pb-2 border-[#E5DFD5]">
              ३. कॉल-टू-ॲक्शन आणि क्रम (CTA & Sequence)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  बटण मजकूर (मराठी)
                </label>
                <input
                  type="text"
                  value={formData.ctaMr || ''}
                  onChange={(e) => setFormData({ ...formData, ctaMr: e.target.value })}
                  placeholder="उदा. कॅटलॉग पहा"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  Button Text (English)
                </label>
                <input
                  type="text"
                  value={formData.ctaEn || ''}
                  onChange={(e) => setFormData({ ...formData, ctaEn: e.target.value })}
                  placeholder="e.g. Explore Catalogue"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  बटण क्लिक केल्यावर
                </label>
                <select
                  value={formData.targetCategory || 'all'}
                  onChange={(e) => setFormData({ ...formData, targetCategory: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                >
                  <option value="all">संपूर्ण कॅटलॉग (All Catalogue)</option>
                  <option value="gold">सोन्याचे दागिने (Gold Collection)</option>
                  <option value="diamond">हिरे संग्रह (Diamond)</option>
                  <option value="silver">चांदी संग्रह (Silver)</option>
                  <option value="necklaces">हार व नेकलेस (Necklaces)</option>
                  <option value="visit">शाखा दर्शन (Visit Stores)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  क्रम (Display Order)
                </label>
                <input
                  type="number"
                  min={1}
                  value={formData.order ?? 1}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active ?? true}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded text-[#3C0015] focus:ring-[#8B2131]"
                />
                <span className="text-xs font-medium text-[#29231F]">
                  होमपेजवर सक्रिय ठेवा (Active on Homepage)
                </span>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#E5DFD5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl border border-[#D5C9B8] text-xs font-medium text-[#5A4D41] hover:bg-white transition-colors cursor-pointer"
            >
              रद्द करा (Cancel)
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>सेव्ह होत आहे...</>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#E0C068]" />
                  हिरो बॅनर सेव्ह करा (Save Banner)
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
