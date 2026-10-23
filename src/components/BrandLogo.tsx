import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'maroon';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  // isDark = true for light/cream backgrounds (Header, Pages, BrandLoader)
  // isDark = false for dark maroon/velvet backgrounds (Footer, Admin Dashboard, Admin Login)
  const isDark = variant === 'dark';

  // Emblem image sizing: refined, delicate luxury scale (reduced approx 10-15% for balanced luxury aesthetic)
  const emblemClasses =
    size === 'sm'
      ? 'h-5 sm:h-5.5 w-auto max-w-[28px]'
      : size === 'lg'
      ? 'h-9 sm:h-11 md:h-12 w-auto max-w-[55px]'
      : 'h-6 xs:h-6.5 sm:h-7 md:h-7.5 w-auto max-w-[36px]';

  // Responsive font sizes tailored for luxury balance: clean, refined, royal typography
  const titleSize =
    size === 'sm'
      ? 'text-[12px] sm:text-[13px] md:text-[14px]'
      : size === 'lg'
      ? 'text-base sm:text-lg md:text-xl'
      : 'text-[13px] xs:text-[14px] sm:text-[15.5px] md:text-[16.5px]';

  const subtitleSize =
    size === 'sm'
      ? 'text-[6.5px] sm:text-[7px]'
      : size === 'lg'
      ? 'text-[8.5px] sm:text-[9.5px]'
      : 'text-[7.5px] xs:text-[8px] sm:text-[8.5px]';

  const sinceTextSize =
    size === 'sm'
      ? 'text-[6.5px] sm:text-[7px]'
      : size === 'lg'
      ? 'text-[8.5px] sm:text-[9.5px]'
      : 'text-[7.5px] xs:text-[8px] sm:text-[8.5px]';

  return (
    <div
      translate="no"
      className="notranslate flex items-center space-x-2 sm:space-x-2.5 select-none text-left min-w-0"
    >
      {/* Left: Original Gold Knot Emblem without text underneath, cleanly proportioned */}
      <img
        src="/polished_gold_knot_emblem.png"
        onError={(e) => {
          e.currentTarget.src = 'https://i.postimg.cc/BQmz8kzJ/Polished-Gold-Knot-Emblem.png';
        }}
        alt="Wafgaonkar Laxmi Jewellers"
        className={`${emblemClasses} object-contain flex-shrink-0 drop-shadow-xs transition-transform duration-300 hover:scale-105`}
        loading="eager"
        translate="no"
      />

      {/* Right: Brand Title & Subtitle + Since 1951 neatly beside and aligned vertically */}
      <div className="flex flex-col justify-center leading-none min-w-0">
        {/* Main Brand Title in Marathi Display */}
        <span
          translate="no"
          className={`notranslate font-marathi-display font-bold tracking-tight truncate leading-tight ${titleSize} ${
            isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
          }`}
        >
          वाफगांवकर लक्ष्मी ज्वेलर्स
        </span>

        {/* Subtitle with English Brand Name & Since 1951 neatly positioned beside it */}
        {showSubtitle && (
          <div
            translate="no"
            className="notranslate flex items-center space-x-1 sm:space-x-1.5 mt-0.5 sm:mt-1 leading-none min-w-0"
          >
            <span
              className={`font-cinzel tracking-[0.12em] uppercase font-bold truncate ${subtitleSize} ${
                isDark ? 'text-[#500018]' : 'text-[#FAF8F4]/90'
              }`}
            >
              Wafgaonkar Laxmi Jewellers
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D7B95F] flex-shrink-0 opacity-80" aria-hidden="true" />
            <span
              className={`font-cinzel tracking-[0.14em] uppercase font-bold flex-shrink-0 ${sinceTextSize} ${
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
