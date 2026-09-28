import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer fine
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isClickable = !!target.closest('button, a, input, [role="button"], select, textarea');
      const isImg = !!target.closest('img, .cursor-pointer');

      setIsHoveringClickable(isClickable);
      setIsHoveringImage(isImg && !isClickable);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 ${
          isHoveringClickable
            ? 'w-8 h-8 border-[#3F1C46] bg-[#3F1C46]/10 scale-110'
            : isHoveringImage
            ? 'w-10 h-10 border-[#D7B95F] bg-[#D7B95F]/10 scale-125'
            : 'w-3.5 h-3.5 border-[#4A2252]/70 bg-[#3F1C46]/20'
        }`}
      />
    </div>
  );
};
