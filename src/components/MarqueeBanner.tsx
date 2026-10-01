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

  // Row 1 — Marathi heritage phrases (scrolls LEFT)
  const marathiItemsRow1 = [
    '१९५१ पासून विश्वास',
    'उत्कृष्ट कारागिरी',
    'कालातीत सौंदर्य',
    'पिढ्यान्पिढ्यांची परंपरा',
    '१००% BIS हॉलमार्क शुद्धता',
    'पारंपरिक व आधुनिक नक्षीकाम',
  ];

  // Row 2 — English prestige phrases (scrolls RIGHT, reversed)
  const englishItemsRow2 = [
    'SINCE 1951 • MASTER JEWELLERS',
    'CERTIFIED BIS HALLMARK GOLD',
    'ROYAL MAHARASHTRIAN HERITAGE',
    'TRADITIONAL PESHWAI CRAFTS',
    'TIMELESS BRIDAL COLLECTIONS',
    'PURE GOLD • PURE TRUST',
  ];

  const marathiItemsRow2 = [
    'शुद्ध सोने • शुद्ध विश्वास',
    'परंपरेची शान',
    'पेशवाई कारागिरी',
    'शाही वधू संग्रह',
    'BIS प्रमाणित शुद्धता',
    'महाराष्ट्राचा वारसा',
  ];

  const row1Items = isMr ? marathiItemsRow1 : englishItemsRow2;
  const row2Items = isMr ? marathiItemsRow2 : englishItemsRow2.slice().reverse();

  const repeated1 = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const repeated2 = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

  const isMaroon = variant === 'maroon';

  if (!isMaroon) {
    // Cream variant — keep simple
    return (
      <div className="w-full overflow-hidden py-3 sm:py-3.5 border-y border-[#D7B95F]/25 bg-[#FAF8F4] select-none">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {repeated1.map((phrase, idx) => (
            <div key={idx} className="flex items-center mx-4 sm:mx-6">
              <span className="font-marathi-serif tracking-widest text-xs sm:text-sm font-medium text-[#29231F]/90">
                {phrase}
              </span>
              <span className="ml-4 sm:ml-6 inline-block w-1.5 h-1.5 rounded-full bg-[#D7B95F] opacity-80" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── MAROON VELVET PREMIUM MARQUEE ──
  return (
    <div className="relative w-full select-none overflow-hidden">

      {/* Glowing gold top border line */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#D7B95F] to-transparent velvet-glow-line" />

      {/* Thin gold shimmer hairline */}
      <div className="w-full h-px bg-[#D7B95F]/20" />

      {/* Main velvet body */}
      <div className="velvet-bg relative py-0 overflow-hidden">

        {/* Subtle golden diagonal pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #D7B95F 0px,
              #D7B95F 1px,
              transparent 1px,
              transparent 18px
            )`,
          }}
        />

        {/* ── ROW 1 : scrolls LEFT — Marathi text, ivory/cream color ── */}
        <div className="relative overflow-hidden py-2.5 sm:py-3 border-b border-[#D7B95F]/15">
          <div className="animate-marquee flex items-center whitespace-nowrap">
            {repeated1.map((phrase, idx) => (
              <div key={idx} className="flex items-center mx-5 sm:mx-8">
                {/* Diamond bullet */}
                <span className="mr-4 sm:mr-5 text-[#D7B95F] text-[8px] opacity-80 leading-none">◆</span>
                <span className="font-marathi-serif tracking-[0.18em] text-xs sm:text-[13px] font-semibold text-[#F3F0EA]/90 uppercase">
                  {phrase}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROW 2 : scrolls RIGHT — English labels, GOLD SHIMMER text ── */}
        <div className="relative overflow-hidden py-2 sm:py-2.5">
          <div className="animate-marquee-reverse flex items-center whitespace-nowrap">
            {repeated2.map((phrase, idx) => (
              <div key={idx} className="flex items-center mx-5 sm:mx-8">
                {/* Star bullet */}
                <span className="mr-3 sm:mr-4 text-[#D7B95F]/70 text-[7px] leading-none">✦</span>
                <span className="font-cinzel tracking-[0.22em] text-[9px] sm:text-[11px] font-bold gold-shimmer-text">
                  {phrase}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Thin gold shimmer hairline */}
      <div className="w-full h-px bg-[#D7B95F]/20" />

      {/* Glowing gold bottom border line */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#D7B95F] to-transparent velvet-glow-line" style={{ animationDelay: '1.2s' }} />
    </div>
  );
};
