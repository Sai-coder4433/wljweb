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

  // Responsive font sizes tailored for luxury balance: compact on mobile, prominent on desktop
  const textSize =
    size === 'sm'
      ? 'text-[13px] sm:text-base md:text-lg'
      : size === 'lg'
      ? 'text-lg sm:text-2xl md:text-3xl'
      : 'text-[14px] xs:text-[15px] sm:text-lg md:text-xl lg:text-2xl';

  return (
    <div className="flex items-center select-none text-left min-w-0">
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
            {/* Mobile View: Concise, elegant, bold */}
            <div className="flex items-center space-x-1.5 sm:hidden">
              <span
                className={`font-cinzel tracking-[0.14em] uppercase text-[9px] font-bold truncate ${
                  isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
                }`}
              >
                Wafgaonkar
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B2131] flex-shrink-0" />
              <span
                className={`font-cinzel tracking-wider text-[9px] font-bold flex-shrink-0 ${
                  isDark ? 'text-[#8B2131]' : 'text-[#E0C068]'
                }`}
              >
                Since 1951
              </span>
            </div>

            {/* Desktop View: Full subtitle - bold & clearly visible */}
            <div className="hidden sm:flex items-center space-x-2">
              <span
                className={`font-cinzel tracking-[0.16em] uppercase text-[10.5px] md:text-[11.5px] font-bold ${
                  isDark ? 'text-[#3C0015]' : 'text-[#FAF8F4]'
                }`}
              >
                Wafgaonkar Laxmi Jewellers
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B2131] flex-shrink-0" />
              <span
                className={`font-cinzel tracking-widest text-[10.5px] md:text-[11.5px] font-bold ${
                  isDark ? 'text-[#8B2131]' : 'text-[#E0C068]'
                }`}
              >
                Since 1951
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
