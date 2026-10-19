import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark'; // for cream backgrounds (Header, Pages)

  // Emblem image sizing: small, compact, elegant scale
  const emblemClasses =
    size === 'sm'
      ? 'h-6 sm:h-7 w-auto max-w-[36px]'
      : size === 'lg'
      ? 'h-12 sm:h-14 md:h-16 w-auto'
      : 'h-7 xs:h-7.5 sm:h-8 md:h-8.5 lg:h-9 w-auto max-w-[45px]';

  const sinceTextSize =
    size === 'sm'
      ? 'text-[6.5px] sm:text-[7px]'
      : size === 'lg'
      ? 'text-[9px] sm:text-[10px]'
      : 'text-[7px] xs:text-[7.5px] sm:text-[8px] md:text-[8.5px]';

  // Responsive font sizes tailored for luxury balance: clean, refined, royal typography
  const titleSize =
    size === 'sm'
      ? 'text-[13px] sm:text-[14.5px] md:text-base'
      : size === 'lg'
      ? 'text-lg sm:text-xl md:text-2xl'
      : 'text-[14px] xs:text-[15px] sm:text-[17px] md:text-[19px] lg:text-[20px]';

  const subtitleSize =
    size === 'sm'
      ? 'text-[7.5px] sm:text-[8px] md:text-[8.5px]'
      : size === 'lg'
      ? 'text-[10px] sm:text-[11px]'
      : 'text-[8.5px] xs:text-[9px] sm:text-[9.5px] md:text-[10.5px]';

  return (
    <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 select-none text-left min-w-0">
      {/* Left: Small Gold Knot Emblem with Since 1951 directly below it */}
      <div className="flex flex-col items-center justify-center flex-shrink-0">
        <img
          src="/polished_gold_knot_emblem.png"
          onError={(e) => {
            e.currentTarget.src = 'https://i.postimg.cc/BQmz8kzJ/Polished-Gold-Knot-Emblem.png';
          }}
          alt="वाफगांवकर लक्ष्मी ज्वेलर्स लोगो"
          className={`${emblemClasses} object-contain drop-shadow-xs transition-transform duration-300 hover:scale-105`}
          loading="eager"
        />
        <span
          className={`font-cinzel ${sinceTextSize} font-bold tracking-[0.2em] uppercase mt-0.5 whitespace-nowrap ${
            isDark ? 'text-[#8B2131]' : 'text-[#E0C068]'
          }`}
        >
          SINCE 1951
        </span>
      </div>

      {/* Right: Brand Title & Subtitle */}
      <div className="flex flex-col justify-center leading-none min-w-0">
        {/* Main Brand Title */}
        <span
          className={`font-marathi-display font-bold tracking-tight truncate ${titleSize} ${
            isDark ? 'text-[#3C0015]' : 'text-[#F3F0EA]'
          }`}
        >
          वाफगांवकर लक्ष्मी ज्वेलर्स
        </span>

        {/* Subtitle - Wafgaonkar Laxmi Jewellers */}
        {showSubtitle && (
          <span
            className={`font-cinzel tracking-[0.14em] uppercase font-bold truncate mt-1 sm:mt-1.5 ${subtitleSize} ${
              isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
            }`}
          >
            Wafgaonkar Laxmi Jewellers
          </span>
        )}
      </div>
    </div>
  );
};
