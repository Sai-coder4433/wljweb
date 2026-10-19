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

  // Emblem image sizing: refined, elegant luxury scale
  const emblemClasses =
    size === 'sm'
      ? 'h-7 sm:h-8 md:h-8.5 w-auto max-w-[42px]'
      : size === 'lg'
      ? 'h-13 sm:h-16 md:h-18 w-auto'
      : 'h-8 xs:h-8.5 sm:h-9.5 md:h-11 lg:h-[46px] w-auto max-w-[60px]';

  // Responsive font sizes tailored for luxury balance: clean, refined, royal typography
  const titleSize =
    size === 'sm'
      ? 'text-[12.5px] sm:text-sm md:text-base'
      : size === 'lg'
      ? 'text-lg sm:text-xl md:text-2xl'
      : 'text-[13.5px] xs:text-[14.5px] sm:text-[16px] md:text-[18px] lg:text-[19.5px]';

  const subtitleSize =
    size === 'sm'
      ? 'text-[7.5px] sm:text-[8px] md:text-[8.5px]'
      : size === 'lg'
      ? 'text-[10px] sm:text-[11px]'
      : 'text-[8px] xs:text-[8.5px] sm:text-[9px] md:text-[10px]';

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
