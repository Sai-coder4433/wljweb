import React, { useState } from 'react';
import { Heart, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product, Language } from '../types';
import { BRAND_CONFIG } from '../config';

interface ProductCardProps {
  product: Product;
  currentLang: Language;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currentLang,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMr = currentLang === 'mr';

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const hasMultipleImages = product.images.length > 1;

  // Build WhatsApp pre-filled enquiry URL
  const whatsappMessage = encodeURIComponent(
    isMr
      ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला या दागिन्याविषयी चौकशी करायची आहे:\n\nदागिना: ${product.marathiName} (${product.name})\nSKU: ${product.sku}\nशुद्धता: ${product.purity}\nअंदाजे वजन: ${product.weight}\nश्रेणी: ${product.marathiCategory}\n\nकृपया आजचा सुवर्ण दर आणि उपलब्धता सांगावी.`
      : `Hello Wafgaonkar Laxmi Jewellers, I would like to enquire about this jewellery design:\n\nDesign: ${product.name}\nSKU: ${product.sku}\nPurity: ${product.purity}\nWeight: ${product.weight}\nCategory: ${product.category}\n\nPlease share today's gold rate and availability.`
  );
  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div
      className="group relative bg-[#FAF8F4] rounded-2xl overflow-hidden border border-[#D7B95F]/25 hover:border-[#D7B95F] transition-all duration-500 ease-out flex flex-col shadow-xs hover:shadow-xl cursor-pointer text-left transform hover:-translate-y-[4px]"
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 9:16 Portrait Image Ratio Stage */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-white flex items-center justify-center border-b border-[#D7B95F]/15">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover object-center transform transition-all duration-700 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${hasMultipleImages && isHovered ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Secondary Image crossfade if available */}
        {hasMultipleImages && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Subtle Luxury Gradient Overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Top Badges: Hallmark Certification & Wishlist */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          {/* Hallmark Badge */}
          <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#FAF8F4]/95 backdrop-blur-xs border border-[#D7B95F]/40 shadow-xs pointer-events-auto">
            <ShieldCheck className="w-3 h-3 text-[#D7B95F]" />
            <span className="font-cinzel text-[9px] uppercase tracking-wider font-bold text-[#3C0015]">
              {product.purity.includes('22K') ? 'BIS 916' : product.purity.includes('24K') ? 'BIS 999' : product.purity.includes('18K') ? 'BIS 750' : 'BIS 925'}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs pointer-events-auto ${
              isWishlisted
                ? 'bg-[#3C0015] text-[#D7B95F]'
                : 'bg-[#FAF8F4]/90 text-[#29231F] hover:text-[#3C0015] hover:bg-white'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D7B95F]' : ''}`} />
          </button>
        </div>

        {/* Bottom Floating Bar on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-[#3C0015]/95 backdrop-blur-xs text-[#F3F0EA] py-2.5 px-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
          <span className="text-xs font-marathi-serif font-bold tracking-wide">
            {isMr ? 'तपशील व नक्षीकाम पहा' : 'View Full Details'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D7B95F] transform transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Product Info Block (No Prices, Clear Hallmark & WhatsApp CTA) */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3 bg-[#FAF8F4]">
        <div>
          {/* Category & Weight Metadata */}
          <div className="flex items-center justify-between text-[11px] font-cinzel tracking-wider text-[#766A61] uppercase font-semibold mb-1">
            <span>{isMr ? product.marathiCategory : product.category}</span>
            <span className="text-[#3C0015] font-bold">{product.weight}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-marathi-serif font-bold text-sm sm:text-base text-[#29231F] group-hover:text-[#3C0015] transition-colors line-clamp-1 leading-snug">
            {isMr ? product.marathiName : product.name}
          </h3>

          {/* Micro Gold Accent Line */}
          <div className="w-0 group-hover:w-16 h-[1.5px] bg-[#D7B95F] mt-2 transition-all duration-500 ease-out" />
        </div>

        {/* Action: Enquire on WhatsApp (Mandated by user prompt) */}
        <div className="pt-2 border-t border-[#D7B95F]/20 flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 px-3 rounded-full bg-[#3C0015] hover:bg-[#500018] text-[#FAF8F4] text-xs font-marathi-serif font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5 border border-[#D7B95F]/40 hover:border-[#D7B95F]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
            <span className="truncate">{isMr ? 'WhatsApp वर चौकशी' : 'Enquire on WhatsApp'}</span>
          </a>

          <button
            onClick={() => onSelectProduct(product)}
            className="px-2.5 py-2 rounded-full border border-[#D7B95F]/35 text-[#3C0015] hover:bg-[#3C0015] hover:text-[#FAF8F4] text-xs font-marathi-serif transition-colors"
            title={isMr ? 'माहिती पहा' : 'View Details'}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
