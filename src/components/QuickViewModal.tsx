import React from 'react';
import { X, Heart, ShoppingBag, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product, Language } from '../types';
import { BRAND_CONFIG } from '../config';

interface QuickViewModalProps {
  product: Product | null;
  currentLang: Language;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currentLang,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onViewDetails,
}) => {
  if (!product) return null;
  const isMr = currentLang === 'mr';

  const whatsappMessage = encodeURIComponent(
    isMr
      ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला या दागिन्याबद्दल माहिती हवी आहे: ${product.marathiName} (किंमत: ₹${product.price.toLocaleString('en-IN')})`
      : `Hello Wafgaonkar Laxmi Jewellers, I would like information about: ${product.name} (Price: ₹${product.price.toLocaleString('en-IN')})`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F7F1E6] rounded-2xl max-w-3xl w-full overflow-hidden border border-[#B8903C]/40 luxury-shadow relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 text-[#3A2922] hover:bg-[#5A1720] hover:text-[#F7F1E6] transition-colors flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Stage */}
          <div className="relative aspect-square bg-white flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#5A1720]/90 text-[#D4B56A] text-[11px] font-cinzel font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{product.purity}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between text-left space-y-4 font-marathi-serif">
            <div>
              <div className="text-[11px] text-[#9D7A35] font-cinzel uppercase tracking-wider mb-1">
                {isMr ? product.marathiCategory : product.category} • {product.weight}
              </div>

              <h3 className="font-marathi-display text-xl md:text-2xl font-bold text-[#5A1720] mb-2 leading-tight">
                {isMr ? product.marathiName : product.name}
              </h3>

              <div className="flex items-baseline space-x-2 mb-3">
                <span className="font-marathi-display text-2xl font-bold text-[#2B211D]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#3A2922]/50 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#3A2922]/80 line-clamp-3 leading-relaxed mb-4">
                {isMr ? product.marathiDescription : product.description}
              </p>

              <div className="space-y-1 text-[11px] text-[#3A2922]/70 pb-3 border-b border-[#B8903C]/20">
                <div>• १००% बीआयएस (BIS 916) सरकारी हॉलमार्क</div>
                <div>• सुरक्षित आणि मोफत विमायुक्त डिलिव्हरी</div>
                <div>• आयुष्यभराचा एक्सचेंज व बायबॅक सपोर्ट</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-full bg-[#5A1720] text-[#F7F1E6] hover:bg-[#3D1017] hover:text-[#D4B56A] text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4B56A]" />
                <span>{isMr ? 'बॅगमध्ये जोडा' : 'Add to Bag'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5B] text-[11px] font-bold transition-all flex items-center justify-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isMr ? 'चौकशी करा' : 'WhatsApp'}</span>
                </a>

                <button
                  onClick={() => {
                    onViewDetails(product);
                    onClose();
                  }}
                  className="py-2 px-3 rounded-full border border-[#5A1720] text-[#5A1720] hover:bg-[#5A1720] hover:text-[#F7F1E6] text-[11px] font-bold transition-all flex items-center justify-center space-x-1"
                >
                  <span>{isMr ? 'संपूर्ण तपशील' : 'Full Details'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
