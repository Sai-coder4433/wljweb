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
        <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#D7B95F] font-semibold block mb-1.5">
          ROYAL HERITAGE ANTHOLOGY
        </span>
        <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#3F1C46] tracking-tight">
          {isMr ? 'निवडक संग्रह' : 'Curated Collections'}
        </h2>
        <div className="w-16 h-[1.5px] bg-[#D7B95F] mx-auto mt-3" />
      </div>

      {/* Asymmetric Editorial Composition: [ LARGE FEATURE ] [ STACKED SMALL 1 / STACKED SMALL 2 ] */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7 items-stretch">
        
        {/* LEFT: One Large Hero Collection Tile (lg:col-span-7) — Card 1: Soft Mauve tint */}
        <div
          onClick={() => onSelectCollection(primaryCol.categoryFilter)}
          className="lg:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] bg-[#BDA9C4]/20 shadow-xs hover:shadow-xl transition-all duration-500 border border-[#BDA9C4]/40 hover:border-[#D7B95F] flex flex-col justify-end"
        >
          {/* Background Image: scales 1.025 on hover */}
          <img
            src={primaryCol.image}
            alt={primaryCol.nameMr}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />

          {/* Deep Cinematic Gradient with Soft Mauve character */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3F1C46] via-[#3F1C46]/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
          
          {/* Soft Lilac hover overlay */}
          <div className="absolute inset-0 bg-[#D8C9D8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Overlay Typography: Text moves upward, gold line expands beneath */}
          <div className="relative z-10 p-7 sm:p-9 text-[#FAF8F4] flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-1.5">
            <span className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#D7B95F] font-semibold mb-1">
              FEATURED ATELIER • {primaryCol.nameEn.toUpperCase()}
            </span>
            <h3 className="font-marathi-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF8F4]">
              {isMr ? primaryCol.nameMr : primaryCol.nameEn}
            </h3>

            {/* Expanding Gold Line */}
            <div className="w-0 group-hover:w-28 h-[2px] bg-[#D7B95F] my-3 transition-all duration-500 ease-out" />

            <div className="flex items-center space-x-2 text-xs sm:text-sm font-marathi-serif text-[#D7B95F] pt-1">
              <span className="font-semibold">{isMr ? 'पहा' : 'Explore'}</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Two Stacked Images (lg:col-span-5) — Card 2: Warm Ivory, Card 3: Soft Lilac */}
        <div className="lg:col-span-5 flex flex-col gap-5 md:gap-7">
          {secondaryCols.map((col, idx) => {
            const isCard2 = idx === 0; // Card 2: Warm Ivory
            const cardBg = isCard2 ? 'bg-[#FAF8F4]' : 'bg-[#D8C9D8]/20';
            const cardBorder = isCard2 ? 'border-[#D7B95F]/35' : 'border-[#D8C9D8]/45';

            return (
              <div
                key={col.id}
                onClick={() => onSelectCollection(col.categoryFilter)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer min-h-[220px] sm:min-h-[245px] ${cardBg} shadow-xs hover:shadow-lg transition-all duration-500 border ${cardBorder} hover:border-[#D7B95F] flex flex-col justify-end flex-1`}
              >
                <img
                  src={col.image}
                  alt={col.nameMr}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#3F1C46] via-[#3F1C46]/45 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Soft Lilac hover overlay */}
                <div className="absolute inset-0 bg-[#D8C9D8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 p-6 text-[#FAF8F4] flex items-end justify-between transform transition-transform duration-500 group-hover:-translate-y-1">
                  <div>
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#D7B95F] font-semibold block mb-0.5">
                      {col.nameEn.toUpperCase()}
                    </span>
                    <h3 className="font-marathi-display text-xl sm:text-2xl font-bold tracking-tight text-[#FAF8F4]">
                      {isMr ? col.nameMr : col.nameEn}
                    </h3>
                    {/* Expanding Gold Line */}
                    <div className="w-0 group-hover:w-20 h-[1.5px] bg-[#D7B95F] my-2 transition-all duration-500 ease-out" />
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs font-marathi-serif text-[#D7B95F] font-semibold pl-3">
                    <span>{isMr ? 'पहा' : 'View'}</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
