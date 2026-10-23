import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Check,
  Link as LinkIcon,
  Sparkles,
  Loader2,
  Camera,
  RefreshCw,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { uploadImageToStorage } from '../../services/storageService';

interface GalleryImagePickerProps {
  label: string;
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
  maxImages?: number;
  hint?: string;
  recommendedAspect?: string;
  folder?: string;
  showCirclePreview?: boolean;
}

export const GalleryImagePicker: React.FC<GalleryImagePickerProps> = ({
  label,
  images,
  onChange,
  multiple = true,
  maxImages = 5,
  hint = 'गॅलरीतून फोटो निवडा किंवा ड्रॅग करा (PNG, JPG, WebP)',
  recommendedAspect = '1:1 स्क्वेअर गुणोत्तर सर्वोत्तम',
  folder = 'jewellery',
  showCirclePreview = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlField, setShowUrlField] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Directly open device file / photo gallery picker
  const handleTriggerPicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    await processFiles(Array.from(e.target.files));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processFiles = async (files: File[]) => {
    setErrorMsg('');
    setIsProcessing(true);
    const validFiles = files.filter((f) => f.type.startsWith('image/'));

    if (validFiles.length === 0) {
      setErrorMsg('कृपया वैध फोटो निवडा (JPG, PNG, WebP इ.)');
      setIsProcessing(false);
      return;
    }

    const newImages: string[] = [];

    for (const file of validFiles) {
      try {
        const uploadResult = await uploadImageToStorage(file, folder);
        if (uploadResult && uploadResult.url) {
          newImages.push(uploadResult.url);
        }
      } catch (err: any) {
        console.error('Error uploading gallery image:', err);
        setErrorMsg('फोटो अपलोड करताना त्रुटी आली: ' + (err?.message || 'अज्ञात त्रुटी'));
      }
    }

    if (newImages.length > 0) {
      if (multiple) {
        const combined = [...images, ...newImages].slice(0, maxImages);
        onChange(combined);
      } else {
        onChange([newImages[0]]);
      }
    }
    setIsProcessing(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const handleSetPrimary = (indexToPrimary: number) => {
    if (indexToPrimary === 0) return;
    const target = images[indexToPrimary];
    const filtered = images.filter((_, idx) => idx !== indexToPrimary);
    onChange([target, ...filtered]);
  };

  const handleAddUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (multiple) {
      onChange([...images, trimmed].slice(0, maxImages));
    } else {
      onChange([trimmed]);
    }
    setUrlInput('');
    setShowUrlField(false);
  };

  // Determine if single category preview should be shown
  const isSingle = !multiple;
  const hasImage = images.length > 0 && !!images[0];
  const isCategoryFolder = folder === 'categories' || showCirclePreview;

  return (
    <div className="space-y-3">
      {/* Hidden File Input — Always present in DOM so clicking trigger button works seamlessly on all devices */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-serif tracking-wider uppercase text-[#3C0015] font-bold flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#A37B30]" />
          <span>{label}</span>
          <span className="text-[11px] text-[#8C7A6B] normal-case font-sans font-normal">
            ({images.length}/{multiple ? maxImages : 1})
          </span>
        </label>
        <button
          type="button"
          onClick={() => setShowUrlField(!showUrlField)}
          className="text-xs text-[#8B2131] hover:text-[#500018] flex items-center gap-1 transition-colors underline underline-offset-2 cursor-pointer font-medium"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlField ? 'फोटो अपलोड वापरा' : 'वेब लिंक (URL) वापरा'}
        </button>
      </div>

      {/* Error alert if any */}
      {errorMsg && (
        <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Direct URL input accordion */}
      {showUrlField && (
        <div className="p-3 bg-[#FAF8F5] border border-[#D5C9B8] rounded-xl space-y-2 animate-in fade-in duration-200">
          <label className="block text-[11px] font-medium text-[#5A4D41]">
            इमेजची वेब लिंक (Image URL) टाका:
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddUrl();
                }
              }}
              placeholder="https://example.com/jewellery-photo.jpg"
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#D5C9B8] rounded-lg focus:outline-none focus:border-[#8B2131]"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-4 py-1.5 bg-[#3C0015] text-[#E0C068] text-xs font-serif font-bold rounded-lg hover:bg-[#500018] transition-colors cursor-pointer"
            >
              जोडा
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          CASE 1: SINGLE IMAGE MODE WITH EXISTING IMAGE (e.g. Category Photo)
          ========================================================================= */}
      {isSingle && hasImage && (
        <div className="bg-[#FAF8F5] border-2 border-[#D5C9B8] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            
            {/* 1. Main Square Preview */}
            <div className="relative group w-32 h-32 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-[#A37B30]/40 shadow-sm bg-white flex-shrink-0 flex items-center justify-center">
              <img
                src={images[0]}
                alt="Selected Category"
                className="w-full h-full object-cover"
              />
              {images[0].includes('firebasestorage.googleapis.com') && (
                <span className="absolute bottom-1.5 left-1.5 bg-[#1F000B]/90 text-[#E0C068] text-[9px] font-serif px-1.5 py-0.5 rounded shadow flex items-center gap-1 backdrop-blur-xs">
                  <UploadCloud className="w-2.5 h-2.5" />
                  Cloud Storage
                </span>
              )}
            </div>

            {/* 2. Circular Icon Preview (For Homepage preview) */}
            {isCategoryFolder && (
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-[#D7B95F]/50 shadow-xs flex-shrink-0">
                <span className="text-[10px] font-cinzel text-[#8B2131] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#A37B30]" />
                  होमपेज गोल आयकॉन प्रिव्ह्यू
                </span>
                <div className="w-20 h-20 rounded-full p-1 border-2 border-[#D7B95F] bg-[#FAF8F4] shadow-sm flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={images[0]}
                      alt="Circle icon preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-[10px] text-[#7A6B5D] mt-1 font-serif">
                  होमपेजवर असा दिसेल
                </span>
              </div>
            )}

            {/* 3. Action Controls */}
            <div className="flex-1 space-y-2.5 text-center sm:text-left w-full sm:w-auto">
              <div>
                <p className="text-xs font-serif font-bold text-[#3C0015]">
                  फोटो निवडलेला आहे
                </p>
                <p className="text-[11px] text-[#7A6B5D] mt-0.5">
                  {hint}
                </p>
              </div>

              {isProcessing ? (
                <div className="flex items-center gap-2 text-xs text-[#8B2131] font-medium bg-[#F7EBEF] p-2 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                  <span>गॅलरीतून नवीन फोटो अपलोड होत आहे, कृपया थांबा...</span>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  {/* Primary Change Photo Button: Directly opens phone/computer gallery */}
                  <button
                    type="button"
                    onClick={handleTriggerPicker}
                    className="px-4 py-2 bg-[#3C0015] hover:bg-[#500018] text-[#E0C068] text-xs font-serif font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#E0C068]" />
                    <span>गॅलरीतून फोटो बदला (Change Photo)</span>
                  </button>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(0)}
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-serif font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>काढा (Remove)</span>
                  </button>
                </div>
              )}

              <div className="inline-flex items-center gap-1 text-[10px] text-[#695444] bg-[#FAF0D8] px-2 py-0.5 rounded-full border border-[#D7B95F]/40">
                <Sparkles className="w-2.5 h-2.5 text-[#A37B30]" />
                स्वयंचलित WebP कॉम्प्रेशन व Firebase Storage सक्षम
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          CASE 2: EMPTY STATE (OR MULTIPLE MODE NOT AT MAX) — DROPZONE & PICKER
          ========================================================================= */}
      {(!isSingle && images.length < maxImages) || (isSingle && !hasImage) ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-200 ${
            isDragging
              ? 'border-[#8B2131] bg-[#F7EBEF] scale-[1.01]'
              : 'border-[#D5C9B8] hover:border-[#A37B30] bg-[#FAF8F5] hover:bg-[#F5EFE6]'
          }`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-4 space-y-2">
              <Loader2 className="w-8 h-8 text-[#8B2131] animate-spin" />
              <p className="text-xs font-serif font-bold text-[#3C0015]">
                फायरबेस क्लाऊड स्टोरेजवर फोटो अपलोड होत आहे, कृपया थांबा...
              </p>
              <p className="text-[11px] text-[#7A6B5D]">
                फोटो ऑप्टिमाइझ करून सुरक्षितपणे सेव्ह केला जात आहे
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#EFE9DF] border border-[#D7B95F]/40 flex items-center justify-center text-[#8B2131] shadow-inner">
                <UploadCloud className="w-7 h-7" />
              </div>

              <div>
                <p className="text-xs sm:text-sm font-serif font-bold text-[#29231F]">
                  गॅलरीतून फोटो निवडा किंवा येथे ड्रॅग & ड्रॉप करा
                </p>
                <p className="text-[11px] text-[#7A6B5D] mt-1">
                  {hint} • {recommendedAspect}
                </p>
              </div>

              {/* Main Primary Action Button: opens mobile photo library or desktop files */}
              <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerPicker}
                  className="px-5 py-2.5 bg-[#3C0015] hover:bg-[#500018] text-[#E0C068] text-xs sm:text-sm font-serif font-bold rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Camera className="w-4 h-4 text-[#E0C068]" />
                  <span>गॅलरीतून फोटो निवडा (Choose from Gallery)</span>
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBCE]/60 text-[10px] text-[#695444] font-medium border border-[#D7B95F]/30">
                <Sparkles className="w-3 h-3 text-[#A37B30]" />
                फायरबेस क्लाऊड स्टोरेज सिंक (Firebase Storage Sync Enabled)
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* =========================================================================
          CASE 3: MULTIPLE IMAGES PREVIEW GRID (e.g. Products)
          ========================================================================= */}
      {multiple && images.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden border-2 border-[#D5C9B8] bg-white shadow-xs aspect-square flex items-center justify-center"
              >
                <img
                  src={imgUrl}
                  alt={`Uploaded ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Primary badge for first image */}
                {idx === 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-[#3C0015] text-[#E0C068] text-[9px] font-serif uppercase tracking-wider px-2 py-0.5 rounded shadow-sm font-bold">
                    मुख्य फोटो
                  </span>
                )}

                {/* Cloud Storage indicator badge */}
                {imgUrl.includes('firebasestorage.googleapis.com') && (
                  <span className="absolute bottom-1.5 left-1.5 bg-[#1F000B]/90 text-[#E0C068] text-[8.5px] font-serif px-1.5 py-0.5 rounded shadow flex items-center gap-1 backdrop-blur-xs">
                    <UploadCloud className="w-2.5 h-2.5" />
                    Cloud
                  </span>
                )}

                {/* Direct Action Overlay (Visible on hover and easy tap on mobile) */}
                <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      title="मुख्य फोटो बनवा"
                      className="px-2 py-1 rounded bg-white text-[#29231F] hover:bg-[#E0C068] text-[10px] font-serif font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      मुख्य
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    title="काढून टाका"
                    className="p-1.5 rounded-full bg-[#8B2131] text-white hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Quick "+ आणखी फोटो जोडा" Card if under max */}
            {images.length < maxImages && (
              <button
                type="button"
                onClick={handleTriggerPicker}
                className="aspect-square rounded-xl border-2 border-dashed border-[#D5C9B8] hover:border-[#A37B30] bg-[#FAF8F5] hover:bg-[#FAF0D8] flex flex-col items-center justify-center gap-1.5 text-[#5A4D41] hover:text-[#3C0015] transition-all cursor-pointer p-2"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#D5C9B8] flex items-center justify-center text-[#8B2131]">
                  <Camera className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-serif font-bold text-center leading-tight">
                  + आणखी जोडा
                </span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
