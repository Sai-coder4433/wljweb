import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Check, Link, Sparkles, Loader2, CloudCheck } from 'lucide-react';
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
}

export const GalleryImagePicker: React.FC<GalleryImagePickerProps> = ({
  label,
  images,
  onChange,
  multiple = true,
  maxImages = 5,
  hint = 'गॅलरीतून फोटो निवडा किंवा ड्रॅग करा (PNG, JPG, WebP)',
  recommendedAspect = '1:1 किंवा 4:3',
  folder = 'jewellery',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlField, setShowUrlField] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    await processFiles(Array.from(e.target.files));
    // Reset file input value so re-selecting same file triggers change
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processFiles = async (files: File[]) => {
    setIsProcessing(true);
    const validFiles = files.filter((f) => f.type.startsWith('image/'));
    const newImages: string[] = [];

    for (const file of validFiles) {
      try {
        const uploadResult = await uploadImageToStorage(file, folder);
        newImages.push(uploadResult.url);
      } catch (err) {
        console.error('Error uploading gallery image:', err);
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
    if (!urlInput.trim()) return;
    if (multiple) {
      onChange([...images, urlInput.trim()].slice(0, maxImages));
    } else {
      onChange([urlInput.trim()]);
    }
    setUrlInput('');
    setShowUrlField(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-serif tracking-wider uppercase text-[#5A4D41] flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#A37B30]" />
          <span>{label}</span>
          <span className="text-[11px] text-[#8C7A6B] normal-case font-sans">
            ({images.length}/{multiple ? maxImages : 1})
          </span>
        </label>
        <button
          type="button"
          onClick={() => setShowUrlField(!showUrlField)}
          className="text-xs text-[#8B2131] hover:text-[#500018] flex items-center gap-1 transition-colors underline underline-offset-2"
        >
          <Link className="w-3 h-3" />
          {showUrlField ? 'फोटो अपलोड वापरा' : 'थेट इमेज लिंक (URL)'}
        </button>
      </div>

      {/* Direct URL input accordion */}
      {showUrlField && (
        <div className="flex gap-2 p-2.5 bg-[#FAF8F5] border border-[#E5DFD5] rounded-lg animate-in fade-in duration-200">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/jewellery-photo.jpg"
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#D5C9B8] rounded focus:outline-none focus:border-[#8B2131]"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-3 py-1.5 bg-[#3C0015] text-[#F3F0EA] text-xs font-medium rounded hover:bg-[#500018] transition-colors"
          >
            जोडा
          </button>
        </div>
      )}

      {/* Drag & Drop Upload Dropzone */}
      {(!multiple && images.length === 0) || (multiple && images.length < maxImages) ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-[#8B2131] bg-[#F7EBEF]'
              : 'border-[#D5C9B8] hover:border-[#A37B30] bg-[#FAF8F5] hover:bg-[#F5EFE6]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />

          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <Loader2 className="w-7 h-7 text-[#8B2131] animate-spin" />
              <p className="text-xs font-medium text-[#3C0015]">
                फायरबेस क्लाऊड स्टोरेजवर फोटो अपलोड होत आहे, कृपया थांबा...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-2 space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#8B2131] shadow-inner group-hover:scale-105 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#29231F]">
                  <span className="text-[#8B2131] font-semibold underline underline-offset-2">
                    गॅलरीतून निवडा
                  </span>{' '}
                  किंवा येथे ड्रॅग & ड्रॉप करा
                </p>
                <p className="text-[11px] text-[#7A6B5D] mt-0.5">
                  {hint} • {recommendedAspect}
                </p>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EADBCE]/60 text-[10px] text-[#695444] font-medium">
                <Sparkles className="w-2.5 h-2.5 text-[#A37B30]" />
                फायरबेस क्लाऊड स्टोरेज सक्षम (Firebase Storage Sync)
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Thumbnails preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              className="group relative rounded-lg overflow-hidden border border-[#D5C9B8] bg-white shadow-sm aspect-square flex items-center justify-center"
            >
              <img
                src={imgUrl}
                alt={`Uploaded ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />

              {/* Primary badge for first image */}
              {idx === 0 && multiple && (
                <span className="absolute top-1.5 left-1.5 bg-[#3C0015] text-[#E0C068] text-[9px] font-serif uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                  मुख्य फोटो
                </span>
              )}

              {/* Cloud Storage indicator badge */}
              {imgUrl.includes('firebasestorage.googleapis.com') && (
                <span className="absolute bottom-1.5 left-1.5 bg-[#1F000B]/90 text-[#E0C068] text-[9px] font-serif px-1.5 py-0.5 rounded shadow flex items-center gap-1 backdrop-blur-xs">
                  <UploadCloud className="w-2.5 h-2.5" />
                  Cloud Storage
                </span>
              )}

              {/* Overlay action controls on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                {multiple && idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(idx)}
                    title="मुख्य फोटो बनवा"
                    className="p-1.5 rounded-full bg-white text-[#29231F] hover:bg-[#E0C068] transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  title="काढून टाका"
                  className="p-1.5 rounded-full bg-[#8B2131] text-white hover:bg-red-700 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
