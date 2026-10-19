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

  // Emblem image sizing: prominent height to match the brand typography perfectly
  const emblemClasses =
    size === 'sm'
      ? 'h-9 sm:h-10 md:h-11 w-auto max-w-[55px]'
      : size === 'lg'
      ? 'h-16 sm:h-20 md:h-24 w-auto'
      : 'h-11 sm:h-13 md:h-[58px] lg:h-[64px] w-auto max-w-[80px]';

  // Responsive font sizes tailored for luxury balance: clean, tight, royal typography
  const titleSize =
    size === 'sm'
      ? 'text-[13.5px] sm:text-base md:text-lg'
      : size === 'lg'
      ? 'text-xl sm:text-2xl md:text-3xl'
      : 'text-[15px] xs:text-[16px] sm:text-lg md:text-xl lg:text-[22px]';

  const subtitleSize =
    size === 'sm'
      ? 'text-[8px] sm:text-[9px] md:text-[9.5px]'
      : size === 'lg'
      ? 'text-xs sm:text-sm'
      : 'text-[8.5px] xs:text-[9px] sm:text-[10px] md:text-[11px]';

  return (
    <div className="flex items-center space-x-2 sm:space-x-2.5 select-none text-left min-w-0">
      {/* Left: Main Polished Gold Knot Emblem - Large & Prominent */}
      <img
        src="/polished_gold_knot_emblem.png"
        onError={(e) => {
          e.currentTarget.src = 'https://i.postimg.cc/BQmz8kzJ/Polished-Gold-Knot-Emblem.png';
        }}
        alt="वाफगांवकर लक्ष्मी ज्वेलर्स लोगो"
        className={`${emblemClasses} object-contain flex-shrink-0 drop-shadow-xs transition-transform duration-300 hover:scale-105`}
        loading="eager"
      />

      {/* Right: Brand Title & Subtitle - Tight Lockup with NO extra vertical gaps */}
      <div className="flex flex-col justify-center leading-none min-w-0">
        {/* Main Brand Title */}
        <span
          className={`font-marathi-display font-bold tracking-tight truncate ${titleSize} ${
            isDark ? 'text-[#3C0015]' : 'text-[#F3F0EA]'
          }`}
        >
          वाफगांवकर लक्ष्मी ज्वेलर्स
        </span>

        {/* Subtitle - Wafgaonkar Laxmi Jewellers • Since 1951 */}
        {showSubtitle && (
          <div className="flex items-center space-x-1 sm:space-x-1.5 mt-1 sm:mt-1.5 leading-none min-w-0">
            <span
              className={`font-cinzel tracking-[0.14em] uppercase font-bold truncate ${subtitleSize} ${
                isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
              }`}
            >
              Wafgaonkar Laxmi Jewellers
            </span>
            <span className="w-1 h-1 rounded-full bg-[#8B2131] flex-shrink-0 opacity-75" />
            <span
              className={`font-cinzel tracking-wider uppercase font-bold flex-shrink-0 ${subtitleSize} ${
                isDark ? 'text-[#8B2131]' : 'text-[#E0C068]'
              }`}
            >
              Since 1951
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
