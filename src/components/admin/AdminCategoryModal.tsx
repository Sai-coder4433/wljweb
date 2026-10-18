import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Sparkles,
  FolderPlus,
  AlertCircle,
  Layers,
  Tag,
  Plus,
  Trash2,
  Camera,
  UploadCloud,
  Loader2,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import { CategoryItem, SubcategoryItem } from '../../types';
import { GalleryImagePicker } from './GalleryImagePicker';
import { uploadImageToStorage } from '../../services/storageService';

interface AdminCategoryModalProps {
  category?: CategoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: CategoryItem) => Promise<void>;
}

export const AdminCategoryModal: React.FC<AdminCategoryModalProps> = ({
  category,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const isEditing = !!category;

  const [formData, setFormData] = useState<Partial<CategoryItem>>(() => {
    if (category) return { ...category, subcategories: Array.isArray(category.subcategories) ? category.subcategories : [] };
    return {
      id: `cat-${Date.now()}`,
      name: '',
      marathiName: '',
      slug: '',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
      metalType: 'Gold',
      itemCount: 0,
      featured: true,
      subcategories: [],
    };
  });

  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [newSubcategoryImage, setNewSubcategoryImage] = useState('');
  const [isUploadingNewSub, setIsUploadingNewSub] = useState(false);
  const [uploadingSubId, setUploadingSubId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Always keep formData in sync when category or modal open state changes
  useEffect(() => {
    if (category) {
      setFormData({
        ...category,
        subcategories: Array.isArray(category.subcategories) ? [...category.subcategories] : [],
      });
    } else {
      setFormData({
        id: `cat-${Date.now()}`,
        name: '',
        marathiName: '',
        slug: '',
        image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
        metalType: 'Gold',
        itemCount: 0,
        featured: true,
        subcategories: [],
      });
    }
    setNewSubcategoryName('');
    setNewSubcategoryImage('');
    setErrorMsg('');
  }, [category, isOpen]);

  // Upload image for draft new subcategory
  const handleUploadNewSubcategoryImage = async (file: File) => {
    try {
      setIsUploadingNewSub(true);
      setErrorMsg('');
      const res = await uploadImageToStorage(file, 'subcategories');
      setNewSubcategoryImage(res.url);
    } catch (err: any) {
      console.error('Error uploading new subcategory image:', err);
      setErrorMsg('उपवर्ग फोटो क्लाऊडवर अपलोड करताना त्रुटी: ' + (err.message || 'त्रुटी'));
    } finally {
      setIsUploadingNewSub(false);
    }
  };

  // Upload image for an existing subcategory
  const handleUploadExistingSubcategoryImage = async (subId: string, file: File) => {
    try {
      setUploadingSubId(subId);
      setErrorMsg('');
      const res = await uploadImageToStorage(file, 'subcategories');
      setFormData((prev) => ({
        ...prev,
        subcategories: (prev.subcategories || []).map((s) =>
          s.id === subId ? { ...s, image: res.url } : s
        ),
      }));
    } catch (err: any) {
      console.error('Error uploading subcategory image:', err);
      setErrorMsg('उपवर्ग फोटो क्लाऊडवर अपलोड करताना त्रुटी: ' + (err.message || 'त्रुटी'));
    } finally {
      setUploadingSubId(null);
    }
  };

  // Subcategory Add / Remove
  const handleAddSubcategory = (customName?: string) => {
    const val = (customName || newSubcategoryName).trim();
    if (!val) {
      setErrorMsg('कृपया उपवर्गाचे नाव टाका');
      return;
    }

    const currentSubs = Array.isArray(formData.subcategories) ? [...formData.subcategories] : [];
    // Prevent duplicate
    if (currentSubs.some((s) => s.marathiName.toLowerCase() === val.toLowerCase() || s.name.toLowerCase() === val.toLowerCase())) {
      setErrorMsg(`'${val}' हा उपवर्ग आधीपासून जोडलेला आहे!`);
      setNewSubcategoryName('');
      return;
    }

    const autoSubSlug =
      val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `sub-${Date.now()}`;

    const newSub: SubcategoryItem = {
      id: `sub-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      name: val,
      marathiName: val,
      slug: autoSubSlug,
      image: newSubcategoryImage || '',
    };

    setFormData((prev) => ({
      ...prev,
      subcategories: [...(prev.subcategories || []), newSub],
    }));
    setNewSubcategoryName('');
    setNewSubcategoryImage('');
    setErrorMsg('');
  };

  const handleRemoveSubcategory = (subId: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: (prev.subcategories || []).filter((s) => s.id !== subId),
    }));
  };

  // Auto-generate slug from English name if not set
  const handleNameChange = (val: string) => {
    setFormData((prev) => {
      const slugVal = prev.slug && isEditing ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return {
        ...prev,
        name: val,
        slug: slugVal,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameVal = formData.name?.trim() || formData.marathiName?.trim();
    const marathiVal = formData.marathiName?.trim() || formData.name?.trim();

    if (!nameVal && !marathiVal) {
      setErrorMsg('कृपया कॅटेगरीचे नाव प्रविष्ट करा');
      return;
    }

    const autoSlug = (formData.slug?.trim() || nameVal?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`).toLowerCase();

    try {
      setSaving(true);
      setErrorMsg('');
      const finalCategory: CategoryItem = {
        id: formData.id || `cat-${Date.now()}`,
        name: nameVal || 'Jewellery Category',
        marathiName: marathiVal || 'दागिने वर्गवारी',
        slug: autoSlug,
        image: formData.image || 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
        metalType: formData.metalType || 'Gold',
        itemCount: Number(formData.itemCount ?? 0),
        featured: formData.featured ?? true,
        subcategories: formData.subcategories || [],
      };
      await onSave(finalCategory);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'कॅटेगरी सेव्ह करताना त्रुटी आली');
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
              <FolderPlus className="w-4 h-4 text-[#E0C068]" />
              {isEditing ? 'कॅटेगरी संपादन करा (Edit Category)' : 'नवीन कॅटेगरी जोडा (Add New Category)'}
            </h3>
            <p className="text-xs text-[#E8DCC4]/70">
              होमपेजवरील गोल आयकॉन्स आणि कॅटलॉग फिल्टरमध्ये रिअल-टाइम दिसेल
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          {/* Category Image from Gallery */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm">
            <GalleryImagePicker
              label="कॅटेगरीचा मुख्य फोटो (गॅलरीतून निवडा)"
              images={formData.image ? [formData.image] : []}
              onChange={(imgs) => setFormData({ ...formData, image: imgs[0] || '' })}
              multiple={false}
              hint="होमपेजवरील गोल आयकॉनसाठी स्पष्ट फोटो (WebP/JPG/PNG)"
              recommendedAspect="1:1 स्क्वेअर गुणोत्तर सर्वोत्तम"
              folder="categories"
            />
          </div>

          {/* Names and Details */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  कॅटेगरीचे नाव (मराठी) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.marathiName || ''}
                  onChange={(e) => setFormData({ ...formData, marathiName: e.target.value })}
                  placeholder="उदा. कंबरपट्टा / मंगळसूत्र"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  Category Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Waist Belt / Mangalsutra"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  Slug / कोड (URL मध्ये वापरला जाणारा) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="उदा. mangalsutra, kambarpatta"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5A4D41] mb-1">
                  धातूचा प्रकार (Metal Type)
                </label>
                <select
                  value={formData.metalType || 'Gold'}
                  onChange={(e) => setFormData({ ...formData, metalType: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                >
                  <option value="Gold">सोने (Gold)</option>
                  <option value="Diamond">हिरे (Diamond)</option>
                  <option value="Gold & Diamond">सोने व हिरे</option>
                  <option value="Silver">चांदी (Silver)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured ?? true}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-[#3C0015] focus:ring-[#8B2131]"
                />
                <span className="text-xs font-medium text-[#29231F]">
                  होमपेजवरील 'कॅटेगरीनुसार खरेदी करा' विभागात प्रदर्शित करा (Featured on Home)
                </span>
              </label>
            </div>
          </div>

          {/* Subcategories Management Section */}
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD5]">
              <div>
                <label className="text-xs font-serif font-bold text-[#3C0015] flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#8B2131]" />
                  उप-वर्गवारी / प्रकार (Subcategories)
                </label>
                <p className="text-[11px] text-[#7A6B5D] mt-0.5">
                  उदा. हार कॅटेगरीसाठी: ठुशी, कोल्हापुरी साज, चोकर, चंद्रहार, बकुळ हार
                </p>
              </div>
              <span className="text-[11px] bg-[#FAF0D8] text-[#A37B30] font-medium px-2 py-0.5 rounded-full">
                {formData.subcategories?.length || 0} उपवर्ग
              </span>
            </div>

            {/* Storage note banner */}
            <div className="text-[11px] text-[#5A4D41] bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#E5DFD5] flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <UploadCloud className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                प्रत्येक उपवर्गाचा फोटो थेट Firebase Cloud Storage वर सेव्ह होतो.
              </span>
              <span className="text-[10px] text-[#A37B30] font-serif font-bold">
                wlj_jewellers/subcategories/
              </span>
            </div>

            {/* Input to add subcategory with optional photo picker */}
            <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-[#D5C9B8] space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubcategory();
                    }
                  }}
                  placeholder="नवीन उपवर्ग टाईप करा (उदा. ठुशी, पाटल्या, झुमके)..."
                  className="flex-grow px-3 py-2 text-xs bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
                />

                {/* Subcategory Photo Picker */}
                {newSubcategoryImage ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D7B95F] flex-shrink-0 group">
                    <img
                      src={newSubcategoryImage}
                      alt="New subcategory preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setNewSubcategoryImage('')}
                      className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="फोटो काढा"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label
                    className={`px-2.5 py-2 rounded-lg border border-[#D5C9B8] bg-white hover:bg-[#FAF0D8] text-[#5A4D41] text-xs flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap flex-shrink-0 ${
                      isUploadingNewSub ? 'opacity-50 pointer-events-none' : ''
                    }`}
                    title="या उपवर्गाचा फोटो गॅलरीतून निवडा"
                  >
                    {isUploadingNewSub ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8B2131]" />
                        <span className="text-[11px]">अपलोड...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="w-3.5 h-3.5 text-[#8B2131]" />
                        <span className="text-[11px]">फोटो निवडा</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isUploadingNewSub}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleUploadNewSubcategoryImage(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                )}

                <button
                  type="button"
                  onClick={() => handleAddSubcategory()}
                  className="px-3.5 py-2 bg-[#3C0015] hover:bg-[#500018] text-[#E0C068] text-xs font-serif font-bold rounded-lg shadow-xs flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  + जोडा
                </button>
              </div>

              {newSubcategoryImage && (
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Check className="w-3 h-3 text-emerald-600" />
                  फोटो क्लाऊड स्टोरेजवर अपलोड झाला! '+ जोडा' वर क्लिक करून उपवर्ग जोडा.
                </div>
              )}
            </div>

            {/* Existing Subcategories Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 max-h-60 overflow-y-auto">
              {(formData.subcategories || []).map((sub) => {
                const isUploadingThis = uploadingSubId === sub.id;
                const isCloud = sub.image && sub.image.includes('firebasestorage.googleapis.com');

                return (
                  <div
                    key={sub.id}
                    className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#D5C9B8] hover:border-[#D7B95F] transition-all flex items-center justify-between gap-2.5 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* Subcategory circular photo or upload trigger */}
                      <div className="relative flex-shrink-0">
                        {sub.image ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#D7B95F]/70 bg-white shadow-xs">
                            <img
                              src={sub.image}
                              alt={sub.marathiName}
                              className="w-full h-full object-cover"
                            />
                            <label
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
                              title="फोटो बदला"
                            >
                              <Camera className="w-3.5 h-3.5" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={isUploadingThis}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleUploadExistingSubcategoryImage(sub.id, e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        ) : (
                          <label
                            className={`w-10 h-10 rounded-full border-2 border-dashed border-[#D5C9B8] hover:border-[#8B2131] bg-white flex flex-col items-center justify-center cursor-pointer transition-colors text-[#8B2131] ${
                              isUploadingThis ? 'opacity-50 pointer-events-none' : ''
                            }`}
                            title="या उपवर्गाचा फोटो गॅलरीतून निवडा"
                          >
                            {isUploadingThis ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#8B2131]" />
                            ) : (
                              <>
                                <Camera className="w-3.5 h-3.5" />
                                <span className="text-[8px] font-sans font-medium text-[#7A6B5D] leading-none mt-0.5">
                                  फोटो
                                </span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isUploadingThis}
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleUploadExistingSubcategoryImage(sub.id, e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>

                      {/* Subcategory details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif font-bold text-xs text-[#3C0015] truncate">
                            {sub.marathiName || sub.name}
                          </span>
                          {isCloud && (
                            <span
                              className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.2 rounded font-medium flex-shrink-0"
                              title="Firebase Storage मध्ये सेव्ह झाले"
                            >
                              ☁️ Cloud
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#7A6B5D] font-mono truncate">
                          {sub.slug}
                        </div>
                      </div>
                    </div>

                    {/* Controls: Change photo button + Delete */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <label
                        className="p-1.5 rounded-lg border border-[#D5C9B8] hover:bg-white text-[#5A4D41] hover:text-[#3C0015] transition-colors cursor-pointer"
                        title="गॅलरीतून फोटो बदला"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isUploadingThis}
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleUploadExistingSubcategoryImage(sub.id, e.target.files[0]);
                            }
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => handleRemoveSubcategory(sub.id)}
                        className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                        title="उपवर्ग काढून टाका"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {(!formData.subcategories || formData.subcategories.length === 0) && (
                <div className="col-span-full text-xs text-[#7A6B5D]/80 italic py-3 text-center bg-[#FAF8F5] rounded-lg border border-dashed border-[#D5C9B8]">
                  अद्याप कोणतेही उपवर्ग जोडलेले नाहीत. वर नाव टाईप करून व फोटो निवडून '+ जोडा' वर क्लिक करा.
                </div>
              )}
            </div>

            {/* Quick Suggestions based on Category */}
            <div className="pt-2 border-t border-[#F0EAE1]">
              <span className="text-[10px] text-[#7A6B5D] uppercase tracking-wider font-semibold block mb-1.5">
                झटपट उपवर्ग निवडा (Quick Add Suggestions):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'पेशवाई ठुशी', 'कोल्हापुरी साज', 'शाही चोकर', 'चंद्रहार', 'बकुळ हार',
                  'पारंपरिक वटी', 'काळे मणी मंगळसूत्र', 'नाजूक मंगळसूत्र', 'हिऱ्यांचे मंगळसूत्र',
                  'शिंदेशाही तोडे', 'गहू तोडे व गोठ', 'नक्षीदार पाटल्या', 'सुवर्ण पिच्छोडी',
                  'अँटिक मयूर झुमके', 'मोत्याची बुगडी', 'सुवर्ण टॉप्स', 'पारंपरिक कुड्या',
                  'राजेशाही मुद्रिका', 'सॉलिटेअर अंगठी', 'ब्राह्मणी नथ', 'चाफा नथ', 'मराठा नथ'
                ].map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handleAddSubcategory(sug)}
                    className="text-[10px] px-2 py-0.5 bg-[#FAF8F5] hover:bg-[#FAF0D8] text-[#5A4D41] hover:text-[#3C0015] rounded border border-[#D5C9B8] transition-colors cursor-pointer"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-[#E5DFD5] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-[#D5C9B8] text-xs font-medium text-[#5A4D41] hover:bg-white transition-colors cursor-pointer"
            >
              रद्द करा (Cancel)
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>सेव्ह होत आहे...</>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#E0C068]" />
                  कॅटेगरी सेव्ह करा (Save Category)
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
