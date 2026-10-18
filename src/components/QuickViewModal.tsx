import React from 'react';
import { X, Heart, ShoppingBag, MessageSquare, ArrowRight, ShieldCheck, MessageCircle, Eye } from 'lucide-react';
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
      ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला या दागिन्याबद्दल माहिती व आजचे दर हवे आहेत: ${product.marathiName} (SKU: ${product.sku}, शुद्धता: ${product.purity})`
      : `Hello Wafgaonkar Laxmi Jewellers, I would like information and gold rates for: ${product.name} (SKU: ${product.sku}, Purity: ${product.purity})`
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F4] rounded-2xl max-w-2xl w-full overflow-hidden border border-[#D7B95F]/40 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-[#3C0015] hover:bg-[#3C0015] hover:text-[#F3F0EA] transition-colors flex items-center justify-center shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image Stage: 4:5 Portrait Ratio */}
          <div className="relative aspect-[4/5] bg-[#F3F0EA] overflow-hidden flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#3C0015]/90 text-[#D7B95F] text-[11px] font-cinzel font-semibold flex items-center space-x-1 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{product.purity}</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between text-left space-y-4 font-marathi-serif">
            <div>
              <div className="text-[11px] text-[#D7B95F] font-cinzel uppercase tracking-wider mb-1 font-semibold">
                {isMr ? product.marathiCategory : product.category} • {product.weight}
              </div>

              <h3 className="font-marathi-display text-xl font-bold text-[#3C0015] mb-2 leading-tight">
                {isMr ? product.marathiName : product.name}
              </h3>

              {/* Hallmarked Purity Badge Notice replacing price */}
              <div className="py-2.5 px-3 rounded-xl bg-[#F3F0EA] border border-[#D7B95F]/35 mb-3">
                <span className="text-[11px] text-[#766A61] block font-marathi-serif">
                  {isMr ? 'सोन्याचे दर व चौकशी:' : 'Gold Rate & Enquiry:'}
                </span>
                <span className="font-marathi-serif text-xs font-bold text-[#3C0015]">
                  {isMr ? 'हॉलमार्क प्रमाणित • थेट WhatsApp वर संपर्क' : 'BIS Hallmarked • Enquire on WhatsApp'}
                </span>
              </div>

              <p className="text-xs text-[#766A61] line-clamp-3 leading-relaxed mb-4">
                {isMr ? product.marathiDescription : product.description}
              </p>

              <div className="space-y-1.5 text-[11px] text-[#766A61] pb-3 border-b border-[#D7B95F]/20">
                <div>• १००% बीआयएस (BIS 916) सरकारी हॉलमार्क</div>
                <div>• अस्सल पारंपरिक महाराष्ट्रीयन कारागिरी</div>
                <div>• पारदर्शक वजन व आयुष्यभराचा बायबॅक सपोर्ट</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#3C0015] text-[#F3F0EA] hover:bg-[#500018] text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm border border-[#D7B95F]/40"
              >
                <MessageCircle className="w-4 h-4 text-[#D7B95F]" />
                <span>{isMr ? 'WhatsApp वर चौकशी करा' : 'Enquire on WhatsApp'}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`py-2 px-3 rounded-full text-xs font-medium border flex items-center justify-center space-x-1 transition-colors ${
                    isWishlisted
                      ? 'border-[#3C0015] bg-[#3C0015] text-[#F3F0EA]'
                      : 'border-[#D7B95F]/35 bg-white text-[#29231F] hover:bg-[#F3F0EA]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current text-[#D7B95F]' : ''}`} />
                  <span>{isMr ? (isWishlisted ? 'पसंतीत जोडले' : 'पसंती') : (isWishlisted ? 'Saved' : 'Wishlist')}</span>
                </button>

                <button
                  onClick={() => {
                    onViewDetails(product);
                    onClose();
                  }}
                  className="py-2 px-3 rounded-full text-xs font-medium border border-[#D7B95F]/35 bg-white hover:bg-[#F3F0EA] text-[#29231F] transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5 text-[#3C0015]" />
                  <span>{isMr ? 'सविस्तर पहा' : 'View Details'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

