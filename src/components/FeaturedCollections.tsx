import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface CollectionTile {
  id: string;
  nameMr: string;
  nameEn: string;
  categoryFilter: string;
  image: string;
}

const COLLECTIONS: CollectionTile[] = [
  {
    id: 'paramparik',
    nameMr: 'पारंपरिक संग्रह',
    nameEn: 'Traditional Heritage',
    categoryFilter: 'gold',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'bridal',
    nameMr: 'वधू संग्रह',
    nameEn: 'Bridal Collection',
    categoryFilter: 'gold',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'adhunik',
    nameMr: 'आधुनिक संग्रह',
    nameEn: 'Modern Collection',
    categoryFilter: 'diamond',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
  },
];

interface FeaturedCollectionsProps {
  currentLang: Language;
  onSelectCollection: (categoryFilter: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  currentLang,
  onSelectCollection,
}) => {
  const isMr = currentLang === 'mr';
  const primaryCol = COLLECTIONS[0]; // पारंपरिक संग्रह (Large)
  const secondaryCols = COLLECTIONS.slice(1); // वधू संग्रह & आधुनिक संग्रह (Two stacked)

  return (
    <section className="py-14 md:py-22 px-4 md:px-8 max-w-7xl mx-auto text-left">
      {/* Editorial Heading */}
      <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
        <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1.5">
          ROYAL HERITAGE ANTHOLOGY
        </span>
        <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#4B0F1A] tracking-tight">
          {isMr ? 'निवडक संग्रह' : 'Curated Collections'}
        </h2>
        <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-3" />
      </div>

      {/* Asymmetric Editorial Composition: [ LARGE FEATURE ] [ STACKED SMALL 1 / STACKED SMALL 2 ] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7 items-stretch">
        
        {/* LEFT: One Large Hero Collection Tile (lg:col-span-7) */}
        <div
          onClick={() => onSelectCollection(primaryCol.categoryFilter)}
          className="lg:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] bg-[#2F2521] shadow-xs hover:shadow-xl transition-all duration-500 border border-[#D4AF37]/30 hover:border-[#D4AF37] flex flex-col justify-end"
        >
          {/* Background Image: scales 1.03 on hover */}
          <img
            src={primaryCol.image}
            alt={primaryCol.nameMr}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Deep Cinematic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F2521] via-[#2F2521]/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

          {/* Overlay Typography: Text moves upward, gold line expands beneath */}
          <div className="relative z-10 p-7 sm:p-9 text-[#FCF8F1] flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-1.5">
            <span className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-1">
              FEATURED ATELIER • {primaryCol.nameEn.toUpperCase()}
            </span>
            <h3 className="font-marathi-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FCF8F1]">
              {isMr ? primaryCol.nameMr : primaryCol.nameEn}
            </h3>

            {/* Expanding Gold Line */}
            <div className="w-0 group-hover:w-28 h-[2px] bg-[#D4AF37] my-3 transition-all duration-500 ease-out" />

            <div className="flex items-center space-x-2 text-xs sm:text-sm font-marathi-serif text-[#D4AF37] pt-1">
              <span className="font-semibold">{isMr ? 'पहा' : 'Explore'}</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Two Smaller Stacked Images (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-5 md:gap-7">
          {secondaryCols.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.categoryFilter)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer min-h-[220px] sm:min-h-[245px] bg-[#2F2521] shadow-xs hover:shadow-lg transition-all duration-500 border border-[#D4AF37]/30 hover:border-[#D4AF37] flex flex-col justify-end flex-1"
            >
              <img
                src={col.image}
                alt={col.nameMr}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2F2521] via-[#2F2521]/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              <div className="relative z-10 p-6 text-[#FCF8F1] flex items-end justify-between transform transition-transform duration-500 group-hover:-translate-y-1">
                <div>
                  <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block mb-0.5">
                    {col.nameEn.toUpperCase()}
                  </span>
                  <h3 className="font-marathi-display text-xl sm:text-2xl font-bold tracking-tight text-[#FCF8F1]">
                    {isMr ? col.nameMr : col.nameEn}
                  </h3>
                  {/* Expanding Gold Line */}
                  <div className="w-0 group-hover:w-20 h-[1.5px] bg-[#D4AF37] my-2 transition-all duration-500 ease-out" />
                </div>

                <div className="flex items-center space-x-1.5 text-xs font-marathi-serif text-[#D4AF37] font-semibold pl-3">
                  <span>{isMr ? 'पहा' : 'View'}</span>
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
