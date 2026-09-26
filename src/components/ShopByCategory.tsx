import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/jewelleryData';
import { Language } from '../types';

interface ShopByCategoryProps {
  currentLang: Language;
  onSelectCategory: (categorySlug: string) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  currentLang,
  onSelectCategory,
}) => {
  const isMr = currentLang === 'mr';

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center space-x-2 text-[#9D7A35] font-cinzel text-xs uppercase tracking-[0.25em] mb-2.5">
          <span className="w-6 h-[1px] bg-[#B8903C]"></span>
          <span>{isMr ? 'पारंपरिक व आधुनिक श्रेणी' : 'Exclusive Categories'}</span>
          <span className="w-6 h-[1px] bg-[#B8903C]"></span>
        </div>
        
        <h2 className="font-marathi-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#5A1720] tracking-tight mb-3">
          {isMr ? 'आपल्या आवडीचा साज निवडा' : 'Choose Your Preferred Adornment'}
        </h2>
        
        <p className="font-marathi-serif text-[#3A2922]/80 text-base md:text-lg leading-relaxed">
          {isMr 
            ? 'परंपरेपासून आधुनिकतेपर्यंत — प्रत्येक क्षणासाठी खास दागिने.' 
            : 'From age-old heritage traditions to modern luxury — crafted for every sacred milestone.'}
        </p>
      </div>

      {/* Categories Grid (12 items) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug)}
            className="group relative bg-[#EFE4D2]/40 rounded-xl overflow-hidden border border-[#B8903C]/20 hover:border-[#B8903C] transition-all duration-500 cursor-pointer luxury-shadow-hover flex flex-col"
          >
            {/* Image Container with Gentle Zoom */}
            <div className="relative aspect-square w-full overflow-hidden bg-white">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B211D]/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Gold Hairline Corner Accent on hover */}
              <div className="absolute inset-2 border border-transparent group-hover:border-[#D4B56A]/60 rounded-lg transition-all duration-500 pointer-events-none"></div>

              {/* Badges */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F7F1E6]/90 backdrop-blur-sm text-[#5A1720] text-[11px] font-cinzel font-semibold border border-[#B8903C]/30 shadow-sm">
                  {cat.itemCount}+ {isMr ? 'नमुने' : 'Designs'}
                </span>
              </div>
            </div>

            {/* Card Content with Upward Lift */}
            <div className="p-4 md:p-5 flex flex-col justify-between flex-grow transition-transform duration-300 group-hover:-translate-y-1">
              <div>
                <h3 className="font-marathi-display text-lg md:text-xl font-bold text-[#5A1720] group-hover:text-[#3D1017] transition-colors">
                  {isMr ? cat.marathiName : cat.name}
                </h3>
                <p className="text-xs text-[#9D7A35] font-cinzel tracking-wider mt-0.5 uppercase">
                  {cat.name}
                </p>
              </div>

              {/* Animated CTA Arrow */}
              <div className="mt-4 pt-2.5 border-t border-[#B8903C]/20 flex items-center justify-between text-xs font-marathi-serif font-bold text-[#5A1720] group-hover:text-[#B8903C] transition-colors">
                <span>{isMr ? 'संग्रह पहा' : 'Explore Category'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300 text-[#B8903C]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
