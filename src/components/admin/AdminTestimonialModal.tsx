import React, { useState } from 'react';
import { X, Save, Sparkles, Star, AlertCircle } from 'lucide-react';
import { Testimonial } from '../../types';

interface AdminTestimonialModalProps {
  testimonial?: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (testimonial: Testimonial) => Promise<void>;
}

export const AdminTestimonialModal: React.FC<AdminTestimonialModalProps> = ({
  testimonial,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isEditing = !!testimonial;

  const [formData, setFormData] = useState<Partial<Testimonial>>(() => {
    if (testimonial) return { ...testimonial };
    return {
      id: `testi-${Date.now()}`,
      nameMr: '',
      nameEn: '',
      locationMr: 'चाकण, पुणे',
      locationEn: 'Chakan, Pune',
      occasionMr: 'कौटुंबिक सुवर्ण खरेदी',
      occasionEn: 'Family Gold Heirloom',
      reviewMr: '',
      reviewEn: '',
      rating: 5,
      date: new Date().toLocaleDateString('mr-IN', { month: 'long', year: 'numeric' }),
      active: true,
    };
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameMr?.trim() || !formData.reviewMr?.trim()) {
      setErrorMsg('कृपया ग्राहकाचे नाव आणि अभिप्राय (Review) प्रविष्ट करा');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg('');
      await onSave({
        ...formData,
        nameEn: formData.nameEn?.trim() || formData.nameMr,
        reviewEn: formData.reviewEn?.trim() || formData.reviewMr,
        locationEn: formData.locationEn?.trim() || formData.locationMr,
        occasionEn: formData.occasionEn?.trim() || formData.occasionMr,
      } as Testimonial);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'अभिप्राय सेव्ह करताना त्रुटी आली');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-[#29231F] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#D5C9B8] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#3C0015] text-[#F3F0EA] flex items-center justify-between border-b border-[#A37B30]/30">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#E0C068] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E0C068]" />
              {isEditing ? 'ग्राहक अभिप्राय संपादन (Edit Review)' : 'नवीन ग्राहक अभिप्राय जोडा (Add Testimonial)'}
            </h3>
            <p className="text-xs text-[#E8DCC4]/70">
              होमपेजवरील ग्राहक प्रशंसा विभाग (Customer Testimonials)
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                ग्राहकाचे नाव (मराठी) *
              </label>
              <input
                type="text"
                required
                value={formData.nameMr || ''}
                onChange={(e) => setFormData({ ...formData, nameMr: e.target.value })}
                placeholder="उदा. सौ. कविता शिंदे"
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                Customer Name (English)
              </label>
              <input
                type="text"
                value={formData.nameEn || ''}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="e.g. Mrs. Kavita Shinde"
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                गाव / शहर (मराठी)
              </label>
              <input
                type="text"
                value={formData.locationMr || ''}
                onChange={(e) => setFormData({ ...formData, locationMr: e.target.value })}
                placeholder="उदा. चाकण, पुणे"
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                Location (English)
              </label>
              <input
                type="text"
                value={formData.locationEn || ''}
                onChange={(e) => setFormData({ ...formData, locationEn: e.target.value })}
                placeholder="e.g. Chakan, Pune"
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                प्रसंग / खरेदी (मराठी)
              </label>
              <input
                type="text"
                value={formData.occasionMr || ''}
                onChange={(e) => setFormData({ ...formData, occasionMr: e.target.value })}
                placeholder="उदा. लग्नसोहळा वधू साज"
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                तारीख / महिना
              </label>
              <input
                type="text"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="उदा. मार्च २०२६"
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block text-xs font-medium text-[#5A4D41] mb-1.5">
              स्टार रेटिंग (Rating): {formData.rating} / 5
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="p-1 rounded hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (formData.rating || 5)
                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                ग्राहकाचा अभिप्राय (मराठी) *
              </label>
              <textarea
                rows={3}
                required
                value={formData.reviewMr || ''}
                onChange={(e) => setFormData({ ...formData, reviewMr: e.target.value })}
                placeholder="दागिन्यांची गुणवत्ता, शुद्धता, विश्वास आणि सेवेबद्दल ग्राहकाचे मनोगत..."
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                Review Text (English - optional)
              </label>
              <textarea
                rows={2}
                value={formData.reviewEn || ''}
                onChange={(e) => setFormData({ ...formData, reviewEn: e.target.value })}
                placeholder="English translation of the customer review..."
                className="w-full px-3 py-2 text-sm bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>
          </div>

          <div>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active ?? true}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="rounded text-[#3C0015] focus:ring-[#8B2131]"
              />
              <span className="text-xs font-medium text-[#29231F]">
                संकेतस्थळावर प्रदर्शित करा (Show on Website)
              </span>
            </label>
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
                  अभिप्राय सेव्ह करा (Save Review)
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
