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
            isDark ? 'text-[#4B0F1A]' : 'text-[#F7F1E6]'
          }`}
        >
          वाफगावकर लक्ष्मी ज्वेलर्स
        </span>

        {/* Subtitle - Sleek on mobile, full on tablet/desktop */}
        {showSubtitle && (
          <div className="mt-0.5 min-w-0">
            {/* Mobile View: Concise, elegant, perfectly proportioned */}
            <div className="flex items-center space-x-1.5 sm:hidden">
              <span
                className={`font-cinzel tracking-[0.14em] uppercase text-[8px] font-semibold truncate ${
                  isDark ? 'text-[#76685F]' : 'text-[#D4AF37]'
                }`}
              >
                Wafgaonkar
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37] flex-shrink-0" />
              <span
                className={`font-cinzel tracking-wider text-[8px] font-medium flex-shrink-0 ${
                  isDark ? 'text-[#D4AF37]' : 'text-[#D4AF37]'
                }`}
              >
                Since 1951
              </span>
            </div>

            {/* Desktop View: Full subtitle */}
            <div className="hidden sm:flex items-center space-x-2">
              <span
                className={`font-cinzel tracking-[0.16em] uppercase text-[9px] md:text-[10px] font-medium ${
                  isDark ? 'text-[#76685F]' : 'text-[#D4AF37]'
                }`}
              >
                Wafgaonkar Laxmi Jewellers
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              <span
                className={`font-cinzel tracking-wider text-[9px] md:text-[10px] ${
                  isDark ? 'text-[#76685F]' : 'text-[#D4AF37]'
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
