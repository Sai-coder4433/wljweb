import React from 'react';
import { X, Trash2, Heart, MessageCircle } from 'lucide-react';
import { Product, Language } from '../types';
import { BRAND_CONFIG } from '../config';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currentLang: Language;
  onRemoveFromWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currentLang,
  onRemoveFromWishlist,
  onSelectProduct,
}) => {
  const isMr = currentLang === 'mr';
  if (!isOpen) return null;

  // Generate WhatsApp message for all wishlisted items
  const handleInquireAll = () => {
    if (wishlistProducts.length === 0) return;
    const itemsList = wishlistProducts
      .map((p, i) => `${i + 1}. ${isMr ? p.marathiName : p.name} (${p.sku}) - ₹${p.price.toLocaleString('en-IN')}`)
      .join('\n');

    const msg = isMr
      ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला माझ्या पसंतीच्या खालील दागिन्यांची उपलब्धता आणि माहिती हवी आहे:\n\n${itemsList}\n\nकृपया या दागिन्यांबद्दल मार्गदर्शन करावे.`
      : `Hello Wafgaonkar Laxmi Jewellers, I would like to inquire about these items saved in my wishlist:\n\n${itemsList}\n\nPlease share availability and details.`;

    window.open(`https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FCF8F1] h-full flex flex-col justify-between font-marathi-serif shadow-2xl border-l border-[#D4AF37]/40 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#D4AF37]/30 flex items-center justify-between bg-[#F7F1E6]">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-[#4B0F1A] fill-[#4B0F1A]" />
            <h3 className="font-marathi-display text-lg font-bold text-[#4B0F1A]">
              {isMr ? 'माझी निवड (Wishlist)' : 'My Wishlist'}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#4B0F1A] text-[#F7F1E6] font-bold">
              {wishlistProducts.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#2F2521] hover:bg-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="p-5 flex-grow overflow-y-auto space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <Heart className="w-12 h-12 text-[#D4AF37]/40" />
              <h4 className="font-marathi-display text-lg font-bold text-[#4B0F1A]">
                {isMr ? 'निवड यादी रिकामी आहे' : 'Your Wishlist is Empty'}
              </h4>
              <p className="text-xs text-[#76685F] max-w-xs leading-relaxed">
                {isMr 
                  ? 'दागिन्यांच्या कार्डवरील हृदयाच्या चिन्हावर क्लिक करून आपले आवडते दागिने जतन करा आणि व्हॉट्सॲपवर एकत्र चौकशी करा.' 
                  : 'Click the heart icon on any jewellery card to save your favored designs here.'}
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="p-3.5 rounded-xl bg-white border border-[#D4AF37]/25 shadow-xs flex items-start space-x-3 text-left"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-lg object-contain bg-[#FCF8F1] border border-[#D4AF37]/20 flex-shrink-0 cursor-pointer p-1"
                />

                <div className="flex-grow min-w-0">
                  <h4 
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="font-marathi-serif text-sm font-bold text-[#2F2521] hover:text-[#4B0F1A] transition-colors truncate cursor-pointer"
                  >
                    {isMr ? product.marathiName : product.name}
                  </h4>
                  <div className="text-[11px] text-[#76685F] font-cinzel">
                    {product.purity} • {product.weight}
                  </div>
                  <div className="font-cinzel text-sm font-bold text-[#4B0F1A] mt-1">
                    ₹ {product.price.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveFromWishlist(product)}
                  className="text-[#76685F] hover:text-[#4B0F1A] p-1 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Enquiry Action */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-[#D4AF37]/30 bg-[#F7F1E6] space-y-2">
            <button
              onClick={handleInquireAll}
              className="w-full py-3 px-6 rounded-full bg-[#4B0F1A] hover:bg-[#72263A] text-[#F7F1E6] text-xs sm:text-sm font-marathi-serif font-bold transition-all shadow-xs flex items-center justify-center space-x-2 border border-[#D4AF37]/50"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>{isMr ? 'WhatsApp वर सर्व दागिन्यांची चौकशी करा' : 'Inquire All on WhatsApp'}</span>
            </button>
            <p className="text-[11px] text-center text-[#76685F]">
              {isMr ? 'थेट आमच्या सुवर्ण सल्लागारांशी संपर्क साधा' : 'Connect directly with our jewellery consultants'}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
