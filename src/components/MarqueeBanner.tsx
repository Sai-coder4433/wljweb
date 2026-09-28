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
          ? 'bg-[#3F1C46] border-[#D7B95F]/30 text-[#F3F0EA]'
          : 'bg-[#FAF8F4] border-[#D7B95F]/25 text-[#45234B]'
      }`}
    >
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {repeated.map((phrase, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6">
            <span
              className={`font-marathi-serif tracking-widest text-xs sm:text-sm font-medium ${
                isMaroon ? 'text-[#F3F0EA]/95' : 'text-[#45234B]/90'
              }`}
            >
              {phrase}
            </span>
            <span className="ml-4 sm:ml-6 inline-block w-1.5 h-1.5 rounded-full bg-[#D7B95F] opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};
