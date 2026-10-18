import React, { useState } from 'react';
import { X, Save, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Product, CategoryItem } from '../../types';
import { GalleryImagePicker } from './GalleryImagePicker';

interface AdminProductModalProps {
  product?: Product | null;
  categories?: CategoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  onOpenAddCategory?: () => void;
}

const DEFAULT_CATEGORY_OPTIONS = [
  { slug: 'gold', name: 'Gold Jewellery', mr: 'सोन्याचे दागिने' },
  { slug: 'diamond', name: 'Diamond Jewellery', mr: 'हिऱ्यांचे दागिने' },
  { slug: 'silver', name: 'Silver Jewellery', mr: 'चांदीचे दागिने' },
  { slug: 'necklaces', name: 'Haar & Necklaces', mr: 'हार व नेकलेस' },
  { slug: 'earrings', name: 'Karnaphule & Jhumke', mr: 'कर्णफुले व झुमके' },
  { slug: 'bangles', name: 'Bangdya & Patlya', mr: 'बांगड्या व पाटल्या' },
  { slug: 'rings', name: 'Angathya & Rings', mr: 'अंगठ्या' },
  { slug: 'nath', name: 'Maharashtrian Nath', mr: 'अस्सल महाराष्ट्रीयन नथ' },
  { slug: 'mangalsutra', name: 'Mangalsutra', mr: 'मंगळसूत्र' },
  { slug: 'bracelets', name: 'Bracelets & Kadas', mr: 'कडा व ब्रॅसलेट' },
  { slug: 'pendants', name: 'Pendants', mr: 'पेंडंट' },
  { slug: 'chains', name: 'Chains', mr: 'सोन्याची चेन' },
];

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  product,
  categories,
  isOpen,
  onClose,
  onSave,
  onOpenAddCategory,
}) => {
  if (!isOpen) return null;

  const isEditing = !!product;

  // Use dynamic categories if available
  const categoryOptions = (categories && categories.length > 0)
    ? categories.map((c) => ({ slug: c.slug, name: c.name, mr: c.marathiName }))
    : DEFAULT_CATEGORY_OPTIONS;


  const [formData, setFormData] = useState<Partial<Product>>(() => {
    if (product) return { ...product };
    return {
      id: `prod-${Date.now()}`,
      name: '',
      marathiName: '',
      sku: `WLJ-${Math.floor(1000 + Math.random() * 9000)}`,
      category: 'gold',
      marathiCategory: 'सोन्याचे दागिने',
      subcategory: 'Necklace',
      marathiSubcategory: 'हार',
      collection: 'Royal Heritage',
      marathiCollection: 'शाही वारसा संग्रह',
      metal: 'Gold',
      marathiMetal: 'सोने',
      purity: '22K (916 BIS Hallmark)',
      weight: '15.00 gm',
      images: [
        'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop',
      ],
      description: 'Handcrafted royal gold jewellery with certified hallmark purity.',
      marathiDescription: 'अस्सल २२ कॅरेट शुद्ध हॉलमार्क सोन्यामध्ये घडवलेले पारंपारिक राजेशाही दागिने.',
      inStock: true,
      stockCount: 5,
      featured: true,
      bestseller: false,
      newArrival: true,
      isBridal: false,
      gender: 'Women',
      marathiGender: 'महिला',
      specifications: [
        { label: 'Purity Certification', marathiLabel: 'शुद्धता प्रमाणपत्र', value: 'BIS 916 Hallmarked' },
        { label: 'Crafting Pedhi', marathiLabel: 'दालन पेढी', value: 'Chakan Showrooms' },
      ],
    };
  });

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categoryOptions.find((c) => c.slug === e.target.value);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        category: selected.slug,
        marathiCategory: selected.mr,
      }));
    }
  };

  const handleImagesChange = (newImages: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.marathiName?.trim()) {
      setErrorMsg('कृपया इंग्रजी आणि मराठी दोन्ही नावे प्रविष्ट करा');
      return;
    }
    if (!formData.images || formData.images.length === 0) {
      setErrorMsg('कृपया किमान १ फोटो गॅलरीतून अपलोड करा');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg('');
      const firstImage = formData.images && formData.images.length > 0 ? formData.images[0] : '';
      await onSave({
        ...formData,
        image: firstImage,
      } as Product);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'उत्पादन सेव्ह करताना त्रुटी आली');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-[#29231F] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#D5C9B8] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#3C0015] text-[#F3F0EA] flex items-center justify-between border-b border-[#A37B30]/30">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#E0C068] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E0C068]" />
              {isEditing ? 'दागिना / उत्पादन संपादन करा (Edit Product)' : 'नवीन दागिना जोडा (Add New Product)'}
            </h3>
            <p className="text-xs text-[#E8DCC4]/70">
              क्लाऊड फायरबेस डेटाबेसवर रिअल-टाइम सेव्ह होईल
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* Section 1: Gallery Image Upload */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm">
            <GalleryImagePicker
              label="दागिन्यांचे फोटो (गॅलरीतून अपलोड करा)"
              images={formData.images || []}
              onChange={handleImagesChange}
              multiple={true}
              maxImages={6}
              hint="गॅलरी किंवा कॅमेऱ्यातून थेट फोटो निवडा (WebP/JPG/PNG)"
              recommendedAspect="1:1 स्क्वेअर गुणोत्तर सर्वोत्तम"
              folder="products"
            />
          </div>

          {/* Section 2: Product Basic Info */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm space-y-4">
            <h4 className="text-xs font-serif tracking-wider uppercase text-[#8B2131] font-bold border-b pb-2 border-[#E5DFD5]">
              १. मूलभूत तपशील (Basic Details)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  नाव (मराठी) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.marathiName || ''}
                  onChange={(e) => setFormData({ ...formData, marathiName: e.target.value })}
                  placeholder="उदा. राजेशाही पेशवाई ठुशी"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Royal Peshwai Thushi"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  SKU कोड *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku || ''}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="WLJ-1001"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#5A4D41]">
                    वर्ग (Category) *
                  </label>
                  {onOpenAddCategory && (
                    <button
                      type="button"
                      onClick={onOpenAddCategory}
                      className="text-[11px] text-[#8B2131] hover:underline font-medium cursor-pointer"
                    >
                      + नवीन कॅटेगरी
                    </button>
                  )}
                </div>
                <select
                  value={formData.category}
                  onChange={handleCategorySelect}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.mr} ({cat.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  उपवर्ग / प्रकार (Subcategory)
                </label>
                <input
                  type="text"
                  value={formData.marathiSubcategory || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marathiSubcategory: e.target.value,
                      subcategory: e.target.value,
                    })
                  }
                  placeholder="उदा. ठुशी, कोल्हापुरी साज, कडे"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />

                {/* Available Subcategories chips for selected Category */}
                {(() => {
                  const currentCategoryObj = categories.find(
                    (c) => c.slug === formData.category || c.id === formData.category
                  );
                  const currentSubcategories = currentCategoryObj?.subcategories || [];
                  if (currentSubcategories.length === 0) return null;

                  return (
                    <div className="mt-2">
                      <span className="text-[10px] text-[#7A6B5D] font-medium block mb-1">
                        या कॅटेगरीमधील उपवर्ग (क्लिक करून निवडा):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentSubcategories.map((sub) => {
                          const isSelected =
                            formData.marathiSubcategory === sub.marathiName ||
                            formData.subcategory === sub.slug ||
                            formData.subcategory === sub.name;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  marathiSubcategory: sub.marathiName,
                                  subcategory: sub.name || sub.marathiName,
                                })
                              }
                              className={`text-[10px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#3C0015] text-[#E0C068] border-[#3C0015] font-bold'
                                  : 'bg-[#FAF8F5] hover:bg-[#FAF0D8] text-[#3C0015] border-[#D5C9B8]'
                              }`}
                            >
                              {sub.marathiName || sub.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  संग्रह (Collection)
                </label>
                <input
                  type="text"
                  value={formData.marathiCollection || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marathiCollection: e.target.value,
                      collection: e.target.value,
                    })
                  }
                  placeholder="उदा. शाही वारसा संग्रह, लग्नसोहळा"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Metal, Purity & Weight */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm space-y-4">
            <h4 className="text-xs font-serif tracking-wider uppercase text-[#8B2131] font-bold border-b pb-2 border-[#E5DFD5]">
              २. धातू, शुद्धता आणि वजन (Metal, Purity & Weight)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  धातू (Metal)
                </label>
                <select
                  value={formData.metal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      metal: e.target.value as any,
                      marathiMetal:
                        e.target.value === 'Gold'
                          ? 'सोने'
                          : e.target.value === 'Diamond'
                          ? 'हिरे व सोने'
                          : 'चांदी',
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                >
                  <option value="Gold">सोने (Gold)</option>
                  <option value="Diamond">हिरे (Diamond)</option>
                  <option value="Silver">चांदी (Silver)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  कॅरेट / शुद्धता (Purity)
                </label>
                <input
                  type="text"
                  value={formData.purity || ''}
                  onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                  placeholder="22K (916 BIS Hallmark)"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  दागिन्याचे वजन (Weight)
                </label>
                <input
                  type="text"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="उदा. 24.50 gm"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Descriptions */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm space-y-4">
            <h4 className="text-xs font-serif tracking-wider uppercase text-[#8B2131] font-bold border-b pb-2 border-[#E5DFD5]">
              ३. दागिन्याचे वर्णन (Descriptions)
            </h4>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                वर्णन (मराठी)
              </label>
              <textarea
                rows={2}
                value={formData.marathiDescription || ''}
                onChange={(e) => setFormData({ ...formData, marathiDescription: e.target.value })}
                placeholder="दागिन्याची कारागिरी, पारंपरिक महत्त्व आणि वैशिष्ट्ये..."
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                Description (English)
              </label>
              <textarea
                rows={2}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description, craftsmanship notes..."
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
              />
            </div>
          </div>

          {/* Section 5: Badges and Stock */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm space-y-3">
            <h4 className="text-xs font-serif tracking-wider uppercase text-[#8B2131] font-bold border-b pb-2 border-[#E5DFD5]">
              ४. लेबल्स आणि स्टॉक स्थिती (Badges & Stock Status)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E5DFD5] bg-[#FAF8F5] cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={formData.inStock ?? true}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="rounded text-[#3C0015] focus:ring-[#8B2131]"
                />
                <span className="text-xs font-medium text-[#29231F]">स्टॉकमध्ये उपलब्ध (In Stock)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E5DFD5] bg-[#FAF8F5] cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={formData.featured ?? false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-[#3C0015] focus:ring-[#8B2131]"
                />
                <span className="text-xs font-medium text-[#29231F]">निवडक (Featured)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E5DFD5] bg-[#FAF8F5] cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={formData.bestseller ?? false}
                  onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                  className="rounded text-[#3C0015] focus:ring-[#8B2131]"
                />
                <span className="text-xs font-medium text-[#29231F]">लोकप्रिय (Bestseller)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E5DFD5] bg-[#FAF8F5] cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={formData.newArrival ?? false}
                  onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                  className="rounded text-[#3C0015] focus:ring-[#8B2131]"
                />
                <span className="text-xs font-medium text-[#29231F]">नवीन (New Arrival)</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E5DFD5] bg-[#FAF8F5] cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isBridal ?? false}
                  onChange={(e) => setFormData({ ...formData, isBridal: e.target.checked })}
                  className="rounded text-[#3C0015] focus:ring-[#8B2131]"
                />
                <span className="text-xs font-medium text-[#29231F]">वधू साज (Bridal)</span>
              </label>
            </div>
          </div>

          {/* Modal Footer */}
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
                  डेटाबेसवर सेव्ह करा (Save to Cloud)
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
