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

  // Emblem image sizing
  const emblemSize =
    size === 'sm'
      ? 'w-7 h-7 sm:w-8 sm:h-8'
      : size === 'lg'
      ? 'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20'
      : 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10';

  // Responsive font sizes tailored for luxury balance: compact on mobile, prominent on desktop
  const textSize =
    size === 'sm'
      ? 'text-[12.5px] sm:text-base md:text-lg'
      : size === 'lg'
      ? 'text-lg sm:text-2xl md:text-3xl'
      : 'text-[13.5px] xs:text-[14.5px] sm:text-lg md:text-xl lg:text-2xl';

  return (
    <div className="flex items-center space-x-2 sm:space-x-2.5 select-none text-left min-w-0">
      {/* Left: Polished Gold Knot Emblem */}
      <img
        src="https://i.postimg.cc/BQmz8kzJ/Polished-Gold-Knot-Emblem.png"
        alt="Wafgaonkar Laxmi Jewellers Emblem"
        className={`${emblemSize} object-contain flex-shrink-0 drop-shadow-xs transition-transform duration-300 hover:scale-105`}
        loading="eager"
      />

      <div className="flex flex-col justify-center leading-tight min-w-0">
        {/* Main Brand Title */}
        <span
          className={`font-marathi-display font-bold tracking-tight truncate ${textSize} ${
            isDark ? 'text-[#3C0015]' : 'text-[#F3F0EA]'
          }`}
        >
          वाफगांवकर लक्ष्मी ज्वेलर्स
        </span>

        {/* Subtitle - Bold, clearly visible and prominent */}
        {showSubtitle && (
          <div className="mt-0.5 min-w-0">
            {/* Mobile View: English Name and directly below Since 1951 */}
            <div className="flex flex-col sm:hidden leading-none">
              <span
                className={`font-cinzel tracking-[0.14em] uppercase text-[8.5px] font-bold truncate ${
                  isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
                }`}
              >
                Wafgaonkar Laxmi Jewellers
              </span>
              <span
                className={`font-cinzel tracking-[0.2em] uppercase text-[8px] font-bold mt-0.5 ${
                  isDark ? 'text-[#8B2131]' : 'text-[#E0C068]'
                }`}
              >
                Since 1951
              </span>
            </div>

            {/* Desktop View: Full subtitle with Since 1951 bold & clearly visible below */}
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className={`font-cinzel tracking-[0.16em] uppercase text-[10px] md:text-[11px] font-bold ${
                  isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
                }`}
              >
                Wafgaonkar Laxmi Jewellers
              </span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span
                  className={`font-cinzel tracking-[0.22em] uppercase text-[9px] md:text-[9.5px] font-bold ${
                    isDark ? 'text-[#8B2131]' : 'text-[#E0C068]'
                  }`}
                >
                  Since 1951
                </span>
                <span className="w-1 h-1 rounded-full bg-[#8B2131] opacity-70 flex-shrink-0" />
                <span className={`text-[8.5px] md:text-[9px] font-marathi-serif ${isDark ? 'text-[#766A61]' : 'text-[#FAF8F4]/70'}`}>
                  १९५१ पासून विश्वासाची परंपरा
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
