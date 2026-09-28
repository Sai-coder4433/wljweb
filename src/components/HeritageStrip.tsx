import React from 'react';
import { Award, HeartHandshake, Sparkles, Gem, Clock } from 'lucide-react';
import { Language } from '../types';

interface HeritageStripProps {
  currentLang: Language;
}

export const HeritageStrip: React.FC<HeritageStripProps> = ({ currentLang }) => {
  const isMr = currentLang === 'mr';

  const pillars = [
    {
      icon: Clock,
      title: isMr ? '१९५१ पासून' : 'Since 1951',
      subtitle: isMr ? 'परंपरा' : 'Heritage & Legacy',
    },
    {
      icon: HeartHandshake,
      title: isMr ? '७०+ वर्षे' : '70+ Years',
      subtitle: isMr ? 'विश्वास' : 'Unbroken Trust',
    },
    {
      icon: Sparkles,
      title: isMr ? 'अनेक पिढ्यांचा' : 'Generations Of',
      subtitle: isMr ? 'आशीर्वाद' : 'Family Blessings',
    },
    {
      icon: Gem,
      title: isMr ? 'अभिजात' : 'Exquisite',
      subtitle: isMr ? 'कारागिरी' : 'Fine Artistry',
    },
  ];

  return (
    <section className="bg-[#EFE4D2]/80 border-y border-[#B8903C]/30 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-3.5 md:space-x-4 group justify-center md:justify-start"
              >
                {/* Gold minimal icon circle */}
                <div className="w-12 h-12 rounded-full bg-[#F3F0EA] border border-[#B8903C]/40 flex items-center justify-center text-[#B8903C] group-hover:bg-[#5A1720] group-hover:text-[#D4B56A] group-hover:border-[#5A1720] transition-all duration-300 shadow-sm flex-shrink-0">
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Typography */}
                <div className="text-left">
                  <div className="font-marathi-display text-lg md:text-xl font-bold text-[#5A1720] leading-tight group-hover:text-[#3D1017] transition-colors">
                    {pillar.title}
                  </div>
                  <div className="font-marathi-serif text-xs md:text-sm text-[#9D7A35] font-medium tracking-wide">
                    {pillar.subtitle}
                  </div>
                </div>

                {/* Subtle vertical separator on desktop */}
                {idx < pillars.length - 1 && (
                  <div className="hidden md:block h-8 w-[1px] bg-[#B8903C]/25 ml-auto"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
