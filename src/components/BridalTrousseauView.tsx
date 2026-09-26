import React, { useState } from 'react';
import { ArrowLeft, Heart, ShieldCheck, Calendar, Phone, MessageSquare } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, Language } from '../types';

interface BridalTrousseauViewProps {
  products: Product[];
  currentLang: Language;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onBackToHome: () => void;
}

export const BridalTrousseauView: React.FC<BridalTrousseauViewProps> = ({
  products,
  currentLang,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onBackToHome,
}) => {
  const [selectedSubtype, setSelectedSubtype] = useState<string>('all');
  const isMr = currentLang === 'mr';

  const bridalProducts = products.filter(p => p.isBridal || p.occasion.includes('Wedding'));

  const subtypes = [
    { id: 'all', label: isMr ? 'सर्व वधू अलंकार' : 'All Bridal Ornaments' },
    { id: 'Haar', label: isMr ? 'हार व चंद्रहार' : 'Haar & Chandrahar' },
    { id: 'Thushi', label: isMr ? 'ठुशी' : 'Peshwai Thushi' },
    { id: 'Nath', label: isMr ? 'ब्राह्मणी नथ' : 'Brahmani Nath' },
    { id: 'Bangles', label: isMr ? 'पाटल्या व तोडे' : 'Patlya & Tode' },
    { id: 'Mangalsutra', label: isMr ? 'मंगळसूत्र' : 'Bridal Mangalsutra' },
  ];

  const filteredBridal = bridalProducts.filter(p => {
    if (selectedSubtype === 'all') return true;
    return p.category.includes(selectedSubtype) || p.subcategory.includes(selectedSubtype);
  });

  return (
    <div className="py-8 md:py-14 px-4 md:px-8 max-w-7xl mx-auto min-h-screen text-left">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-[#9D7A35] font-marathi-serif mb-6">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-1.5 text-[#5A1720] hover:text-[#B8903C] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</span>
        </button>
        <span>/</span>
        <span className="text-[#5A1720] font-semibold">
          {isMr ? 'शाही वधू दालन' : 'Royal Bridal Trousseau'}
        </span>
      </div>

      {/* Hero Banner for Bridal */}
      <div className="relative rounded-3xl overflow-hidden bg-[#3D1017] text-[#F7F1E6] p-8 md:p-14 mb-12 border border-[#B8903C]/40 luxury-shadow">
        <div className="absolute inset-0 bg-pattern-jharokha opacity-15 pointer-events-none"></div>
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4B56A]/15 border border-[#D4B56A]/30 text-[#D4B56A] text-xs uppercase tracking-widest font-cinzel mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4B56A]" />
            <span>{isMr ? 'अस्सल महाराष्ट्रीयन विवाह सोहळा' : 'Authentic Maharashtrian Nuptials'}</span>
          </div>
          <h1 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#F7F1E6]">
            {isMr ? 'शाही वधू दालन' : 'Royal Maharashtrian Bridal Suite'}
          </h1>
          <p className="font-marathi-serif text-base md:text-lg text-[#EFE4D2]/90 leading-relaxed mb-6">
            {isMr
              ? 'लग्नसराईच्या मंगल क्षणांसाठी पेशवाई ठुशी, मोत्यांची नथ, चंद्रहार, कोल्हापुरी साज आणि पारंपरिक पाटल्यांचा समृद्ध संग्रह.'
              : 'Cherish your sacred vows with timeless Peshwai craftsmanship, heirloom pearl naths, and pure 22 Karat gold hallmarks.'}
          </p>

          <div className="flex flex-wrap gap-3 text-xs font-marathi-serif">
            <div className="flex items-center space-x-1.5 bg-[#5A1720] px-3 py-1.5 rounded-full border border-[#D4B56A]/40 text-[#D4B56A]">
              <ShieldCheck className="w-4 h-4" />
              <span>{isMr ? '१००% BIS 916 हॉलमार्क' : '100% BIS 916 Hallmark'}</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#5A1720] px-3 py-1.5 rounded-full border border-[#D4B56A]/40 text-[#D4B56A]">
              <Calendar className="w-4 h-4" />
              <span>{isMr ? 'खाजगी वधू सल्लागार भेट' : 'Private Bridal Fitting'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 font-marathi-serif text-xs md:text-sm">
        {subtypes.map((st) => (
          <button
            key={st.id}
            onClick={() => setSelectedSubtype(st.id)}
            className={`px-5 py-2 rounded-full whitespace-nowrap font-semibold transition-all duration-300 ${
              selectedSubtype === st.id
                ? 'bg-[#5A1720] text-[#F7F1E6] shadow-md border border-[#D4B56A]'
                : 'bg-[#EFE4D2]/60 text-[#3A2922] hover:bg-[#EFE4D2] border border-[#B8903C]/30'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredBridal.map((product) => (
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

    </div>
  );
};
