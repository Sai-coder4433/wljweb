import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';

interface BrandLoaderProps {
  onComplete: () => void;
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Smooth progress bar to 100% in 700ms
    const timer = setTimeout(() => {
      setProgress(100);
    }, 50);

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 750);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1050);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F3F0EA] transition-opacity duration-300 pointer-events-none ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-5 max-w-sm px-6">
        {/* Brand Mark */}
        <BrandLogo variant="dark" size="lg" showSubtitle={true} />

        {/* Elegant thin champagne-gold progress line animating 0 -> 100% */}
        <div className="w-48 h-[1.5px] bg-[#D7B95F]/25 overflow-hidden rounded-full mt-2">
          <div
            className="h-full bg-[#D7B95F] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span translate="no" className="notranslate font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#766A61] opacity-75">
          Pure Tradition • Since 1951
        </span>
      </div>
    </div>
  );
};
