import React from 'react';
import { Compass, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { Language } from '../types';

interface CraftsmanshipSectionProps {
  currentLang: Language;
}

export const CraftsmanshipSection: React.FC<CraftsmanshipSectionProps> = ({ currentLang }) => {
  const isMr = currentLang === 'mr';

  const blocks = [
    {
      icon: Compass,
      title: isMr ? 'अचूक कारागिरी' : 'Flawless Craftsmanship',
      description: isMr 
        ? 'प्रत्येक दागिन्याच्या बारकाव्यातून व्यक्त होणारी उत्कृष्टता.' 
        : 'Excellence reflected through the micro-precision and detailing of every handcrafted piece.',
    },
    {
      icon: ShieldCheck,
      title: isMr ? 'निवडक गुणवत्ता' : 'Curated Purity',
      description: isMr 
        ? 'गुणवत्तेशी कोणतीही तडजोड न करता निवडलेले दागिने.' 
        : 'Strict 100% BIS Hallmarked gold and authentic jewellery crafted without compromise.',
    },
    {
      icon: HeartHandshake,
      title: isMr ? 'पिढ्यान्पिढ्यांचा विश्वास' : 'Generational Trust',
      description: isMr 
        ? '१९५१ पासून ग्राहकांच्या प्रेमाने जपलेली परंपरा.' 
        : 'A sacred relationship cherished with love and family goodwill since 1951.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F3F0EA] border-b border-[#B8903C]/20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#9D7A35] font-cinzel text-xs uppercase tracking-[0.25em] mb-2">
            <Award className="w-3.5 h-3.5 text-[#B8903C]" />
            <span>{isMr ? 'अभिजात हातकाम' : 'Art of Jewellery Making'}</span>
          </div>
          <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#5A1720] tracking-tight mb-3">
            {isMr ? 'कारागिरी, जी दागिन्यांना ओळख देते' : 'Craftsmanship That Defines Every Jewel'}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B8903C] to-transparent mx-auto mt-3"></div>
        </div>

        {/* 3 Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {blocks.map((block, idx) => {
            const Icon = block.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#EFE4D2]/40 border border-[#B8903C]/25 hover:border-[#D4B56A] transition-all duration-300 text-center luxury-shadow flex flex-col items-center group hover:-translate-y-1"
              >
                {/* Gold minimal circle */}
                <div className="w-16 h-16 rounded-full bg-[#5A1720] text-[#D4B56A] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300 border border-[#D4B56A]/40">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-marathi-display text-2xl font-bold text-[#5A1720] mb-3 group-hover:text-[#3D1017] transition-colors">
                  {block.title}
                </h3>

                <p className="font-marathi-serif text-[#3A2922]/85 text-base leading-relaxed">
                  {block.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
