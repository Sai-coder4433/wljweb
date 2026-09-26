import React from 'react';
import { Language } from '../types';

interface MarqueeBannerProps {
  currentLang?: Language;
  variant?: 'maroon' | 'cream';
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  currentLang = 'mr',
  variant = 'maroon',
}) => {
  const isMr = currentLang === 'mr';

  const marathiItems = [
    '१९५१ पासून विश्वास',
    'उत्कृष्ट कारागिरी',
    'कालातीत सौंदर्य',
    'पिढ्यान्पिढ्यांची परंपरा',
    '१००% BIS हॉलमार्क शुद्धता',
    'पारंपरिक व आधुनिक नक्षीकाम',
  ];

  const englishItems = [
    'Tradition of Trust Since 1951',
    'Exquisite Master Craftsmanship',
    'Timeless Maharashtrian Beauty',
    'Generations of Pure Trust',
    '100% Certified BIS Hallmark',
    'Royal Heritage Collections',
  ];

  const items = isMr ? marathiItems : englishItems;
  // Repeat items for seamless continuous looping marquee
  const repeated = [...items, ...items, ...items, ...items];

  const isMaroon = variant === 'maroon';

  return (
    <div
      className={`w-full overflow-hidden py-3 sm:py-3.5 border-y select-none transition-colors duration-500 ${
        isMaroon
          ? 'bg-[#4B0F1A] border-[#D4AF37]/30 text-[#F7F1E6]'
          : 'bg-[#FCF8F1] border-[#D4AF37]/25 text-[#2F2521]'
      }`}
    >
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {repeated.map((phrase, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6">
            <span
              className={`font-marathi-serif tracking-widest text-xs sm:text-sm font-medium ${
                isMaroon ? 'text-[#F7F1E6]/95' : 'text-[#2F2521]/90'
              }`}
            >
              {phrase}
            </span>
            <span className="ml-4 sm:ml-6 inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};
