import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { OCCASIONS } from '../data/jewelleryData';
import { Language } from '../types';

interface ShopByOccasionProps {
  currentLang: Language;
  onSelectOccasion: (occasionName: string) => void;
}

export const ShopByOccasion: React.FC<ShopByOccasionProps> = ({
  currentLang,
  onSelectOccasion,
}) => {
  const isMr = currentLang === 'mr';

  return (
    <section className="py-16 md:py-24 bg-[#EFE4D2]/40 border-y border-[#B8903C]/20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[#9D7A35] font-cinzel text-xs uppercase tracking-[0.25em] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B8903C]" />
              <span>{isMr ? 'जीवनातील अनमोल क्षण' : 'Curated For Your Milestones'}</span>
            </div>
            <h2 className="font-marathi-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#5A1720] tracking-tight">
              {isMr ? 'प्रत्येक खास क्षणासाठी' : 'Jewellery For Every Sacred Occasion'}
            </h2>
          </div>
          <p className="font-marathi-serif text-[#3A2922]/80 text-sm md:text-base max-w-md">
            {isMr
              ? 'लग्नघरातील सनई-चौघड्यांपासून ते दररोजच्या साध्या-सुबक आनंदापर्यंत — सोनेरी सोबती.'
              : 'From grand ceremonial wedding bells to intimate daily celebrations — your enduring golden companion.'}
          </p>
        </div>

        {/* Large Editorial Lifestyle Photography Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {OCCASIONS.map((occ) => (
            <div
              key={occ.id}
              onClick={() => onSelectOccasion(occ.name)}
              className="group relative h-[380px] md:h-[440px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-700 border border-[#B8903C]/20 hover:border-[#D4B56A]"
            >
              {/* Background Lifestyle Image */}
              <img
                src={occ.image}
                alt={occ.name}
                loading="lazy"
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-106"
              />

              {/* Sophisticated Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B211D]/90 via-[#3D1017]/40 to-transparent transition-opacity duration-300"></div>

              {/* Decorative Frame on Hover */}
              <div className="absolute inset-4 rounded-xl border border-transparent group-hover:border-[#D4B56A]/50 transition-all duration-500 pointer-events-none"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-[#F7F1E6]">
                <span className="text-[11px] uppercase tracking-[0.2em] font-cinzel text-[#D4B56A] font-semibold mb-1.5">
                  {occ.name}
                </span>

                <h3 className="font-marathi-display text-2xl md:text-3xl font-bold mb-2 text-[#F7F1E6] group-hover:text-[#D4B56A] transition-colors">
                  {isMr ? occ.marathiName : occ.name}
                </h3>

                <p className="font-marathi-serif text-sm text-[#EFE4D2]/85 line-clamp-2 mb-4 leading-relaxed">
                  {isMr ? occ.marathiTagline : occ.tagline}
                </p>

                {/* Animated Link */}
                <div className="flex items-center space-x-2 text-xs md:text-sm font-marathi-serif font-bold text-[#D4B56A] group-hover:text-[#F7F1E6] transition-colors">
                  <span>{isMr ? 'दागिने निवडा' : 'View Ornaments'}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
