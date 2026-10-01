import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product, Language } from '../types';

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

  // Price formatting
  const formattedPrice = product.price > 0 
    ? `₹ ${product.price.toLocaleString('en-IN')}`
    : (isMr ? 'किंमतीसाठी चौकशी करा' : 'Inquire for Price');

  return (
    <div
      className="group relative bg-[#FAF8F4] rounded-2xl overflow-hidden border border-[#D7B95F]/25 hover:border-[#D7B95F] hover:bg-[#D7B95F]/08 transition-all duration-500 ease-out flex flex-col shadow-xs hover:shadow-xl cursor-pointer text-left transform hover:-translate-y-[3px]"
      onClick={() => onSelectProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage - object-contain with generous padding */}
      <div className="relative aspect-[4/4] w-full overflow-hidden bg-white p-5 flex items-center justify-center border-b border-[#D7B95F]/15">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-contain object-center transform transition-all duration-700 ease-out ${
            isHovered ? 'scale-[1.025]' : 'scale-100'
          } ${hasMultipleImages && isHovered ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Secondary Image crossfade if available */}
        {hasMultipleImages && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-contain object-center p-5 transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-[1.025]' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
            isWishlisted
              ? 'bg-[#3C0015] text-[#D7B95F]'
              : 'bg-[#F3F0EA]/90 text-[#29231F] hover:text-[#3C0015] hover:bg-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D7B95F]' : ''}`} />
        </button>

        {/* Royal Velvet Maroon hover overlay panel */}
        <div className="absolute inset-x-0 bottom-0 bg-[#3C0015]/90 backdrop-blur-xs text-[#F3F0EA] py-2 px-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-[11px] font-marathi-serif font-bold tracking-wide">
            {isMr ? 'अधिक माहिती पहा' : 'View Specifications'}
          </span>
          <span className="text-xs text-[#D7B95F] transform transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>

      {/* Product Info Block */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
        <div>
          {/* Short Type / Purity */}
          <div className="text-[11px] font-cinzel tracking-wider text-[#766A61] uppercase font-semibold mb-1">
            {product.purity} • {product.weight}
          </div>

          {/* Product Name */}
          <h3 className="font-marathi-serif font-bold text-sm sm:text-base text-[#29231F] group-hover:text-[#3C0015] transition-colors line-clamp-1 leading-snug">
            {isMr ? product.marathiName : product.name}
          </h3>

          {/* Micro Gold Line */}
          <div className="w-0 group-hover:w-16 h-[1.5px] bg-[#D7B95F] mt-2 transition-all duration-500 ease-out" />
        </div>

        {/* Price & Details Link */}
        <div className="pt-2 border-t border-[#D7B95F]/15 flex items-center justify-between">
          <div className="font-cinzel text-base sm:text-lg font-bold text-[#3C0015] tracking-tight">
            {formattedPrice}
          </div>

          <span className="inline-flex items-center text-xs font-marathi-serif font-semibold text-[#766A61] group-hover:text-[#3C0015] transition-colors">
            <span>{isMr ? 'अधिक माहिती' : 'Details'}</span>
            <span className="ml-1 text-[#D7B95F] transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </div>
  );
};
