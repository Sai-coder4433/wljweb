import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, Language } from '../types';

interface BestsellersSectionProps {
  products: Product[];
  currentLang: Language;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateCatalogue: () => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  products,
  currentLang,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onNavigateCatalogue,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const isMr = currentLang === 'mr';

  const tabs = [
    { id: 'all', labelMr: 'सर्व लोकप्रिय', labelEn: 'All Popular' },
    { id: 'Gold', labelMr: 'सोन्याचे दागिने', labelEn: 'Gold' },
    { id: 'Silver', labelMr: 'चांदीचे दागिने', labelEn: 'Silver' },
    { id: 'Mangalsutra', labelMr: 'मंगळसूत्र', labelEn: 'Mangalsutra' },
  ];

  const bestsellers = products.filter((p) => {
    if (activeTab === 'all') return p.bestseller || true;
    if (activeTab === 'Mangalsutra') {
      return p.category.includes('Mangalsutra') || p.subcategory.includes('Mangalsutra');
    }
    return p.metal === activeTab;
  }).slice(0, 4);

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 max-w-7xl mx-auto text-left">
      
      {/* Section Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#B8954A]/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B8954A] font-cinzel font-semibold block mb-1">
            {isMr ? 'ग्राहकांची पहिली पसंती' : 'Most Loved Choices'}
          </span>
          <h2 className="font-marathi-display text-2xl sm:text-3xl font-bold text-[#591923]">
            {isMr ? 'सर्वाधिक पसंतीचे दागिने' : 'Bestsellers'}
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-marathi-serif font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#591923] text-[#F7F2E8]'
                  : 'bg-[#F7F2E8] border border-[#B8954A]/30 text-[#30231E] hover:border-[#B8954A]'
              }`}
            >
              {isMr ? tab.labelMr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Products per row desktop, 3 tablet, 2 mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {bestsellers.map((product) => (
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

      {/* Bottom CTA */}
      <div className="mt-8 text-center">
        <button
          onClick={onNavigateCatalogue}
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full border border-[#B8954A] text-[#591923] hover:bg-[#591923] hover:text-[#F7F2E8] text-xs font-marathi-serif font-semibold transition-all"
        >
          <span>{isMr ? 'सर्व दागिने संग्रह पहा' : 'View Full Catalogue'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </section>
  );
};
