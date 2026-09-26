import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, Language } from '../types';

interface NewArrivalsProps {
  products: Product[];
  currentLang: Language;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateCatalogue: () => void;
}

export const NewArrivalsCarousel: React.FC<NewArrivalsProps> = ({
  products,
  currentLang,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onNavigateCatalogue,
}) => {
  const isMr = currentLang === 'mr';

  // Filter or prioritize new arrivals
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const displayItems = newArrivals.length >= 4 ? newArrivals : products.slice(0, 4);

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#B8954A]/20 gap-3">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B8954A] font-cinzel font-semibold block mb-1">
            {isMr ? 'नवीन निर्मिती' : 'Fresh Additions'}
          </span>
          <h2 className="font-marathi-display text-2xl sm:text-3xl font-bold text-[#591923]">
            {isMr ? 'नवीन आगमन' : 'New Arrivals'}
          </h2>
        </div>

        <button
          onClick={onNavigateCatalogue}
          className="inline-flex items-center space-x-1.5 text-xs font-marathi-serif font-bold text-[#591923] hover:text-[#B8954A] transition-colors self-start sm:self-end"
        >
          <span>{isMr ? 'सर्व नवीन दागिने पहा' : 'View All New Arrivals'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Grid: Desktop 4, Tablet 3, Mobile 2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            currentLang={currentLang}
            isWishlisted={wishlistIds.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            onQuickView={onQuickView}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>

    </section>
  );
};
