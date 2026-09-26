import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, Language } from '../types';

interface FeaturedJewellerySectionProps {
  products: Product[];
  currentLang: Language;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateCatalogue: () => void;
}

export const FeaturedJewellerySection: React.FC<FeaturedJewellerySectionProps> = ({
  products,
  currentLang,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onNavigateCatalogue,
}) => {
  const isMr = currentLang === 'mr';

  // 8 products maximum as strictly mandated
  const previewProducts = products.slice(0, 8);

  return (
    <section className="py-14 md:py-24 px-4 md:px-8 max-w-7xl mx-auto text-left">
      {/* Section Heading */}
      <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
        <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1.5">
          SIGNATURE CREATIONS • 100% HALLMARK
        </span>
        <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#4B0F1A] tracking-tight mb-2">
          {isMr ? 'निवडक दागिने' : 'Featured Jewellery'}
        </h2>
        {/* Small gold line beneath heading */}
        <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto my-3" />
        <p className="font-marathi-serif text-sm md:text-base text-[#76685F]">
          {isMr 
            ? 'उत्कृष्ट कारागिरी आणि अस्सल शुद्धतेचा मनमोहक मिलाफ.' 
            : 'Handpicked masterworks of pure gold and certified gems.'}
        </p>
      </div>

      {/* Product Grid: 4 columns desktop, 3 tablet, 2 mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {previewProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentLang={currentLang}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>

      {/* "सर्व दागिने पहा →" Button */}
      <div className="text-center">
        <button
          onClick={onNavigateCatalogue}
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#4B0F1A] hover:bg-[#72263A] text-[#F7F1E6] font-marathi-serif text-sm font-semibold transition-all border border-[#D4AF37]/40 shadow-xs hover:border-[#D4AF37] group"
        >
          <span>{isMr ? 'सर्व दागिने पहा' : 'View All Jewellery'}</span>
          <ArrowRight className="w-4 h-4 text-[#D4AF37] transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
