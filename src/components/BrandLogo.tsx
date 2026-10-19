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

  // Emblem image sizing - enhanced for grand, regal luxury presence
  const emblemSize =
    size === 'sm'
      ? 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10'
      : size === 'lg'
      ? 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'
      : 'w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 lg:w-14 lg:h-14';

  // Responsive font sizes tailored for luxury balance: compact on mobile, prominent on desktop
  const textSize =
    size === 'sm'
      ? 'text-[13px] sm:text-base md:text-lg'
      : size === 'lg'
      ? 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'
      : 'text-[14px] xs:text-[15.5px] sm:text-xl md:text-2xl lg:text-[25px]';

  return (
    <div className="flex items-center space-x-2.5 sm:space-x-3.5 select-none text-left min-w-0">
      {/* Left: Polished Gold Knot Emblem */}
      <img
        src="https://i.postimg.cc/BQmz8kzJ/Polished-Gold-Knot-Emblem.png"
        alt="Wafgaonkar Laxmi Jewellers Emblem"
        className={`${emblemSize} object-contain flex-shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105`}
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
                className={`font-cinzel tracking-[0.14em] uppercase text-[9px] xs:text-[9.5px] font-bold truncate ${
                  isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
                }`}
              >
                Wafgaonkar Laxmi Jewellers
              </span>
              <span
                className={`font-cinzel tracking-[0.2em] uppercase text-[8.5px] xs:text-[9px] font-bold mt-0.5 ${
                  isDark ? 'text-[#8B2131]' : 'text-[#E0C068]'
                }`}
              >
                Since 1951
              </span>
            </div>

            {/* Desktop View: Full subtitle with Since 1951 bold & clearly visible below */}
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className={`font-cinzel tracking-[0.16em] uppercase text-[11px] md:text-[12px] font-bold ${
                  isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
                }`}
              >
                Wafgaonkar Laxmi Jewellers
              </span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span
                  className={`font-cinzel tracking-[0.22em] uppercase text-[9.5px] md:text-[10.5px] font-bold ${
                    isDark ? 'text-[#8B2131]' : 'text-[#E0C068]'
                  }`}
                >
                  Since 1951
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B2131] opacity-70 flex-shrink-0" />
                <span className={`text-[9px] md:text-[10px] font-marathi-serif ${isDark ? 'text-[#766A61]' : 'text-[#FAF8F4]/70'}`}>
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
