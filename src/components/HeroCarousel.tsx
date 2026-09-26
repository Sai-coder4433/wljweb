import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface HeroSlide {
  id: number;
  image: string;
  mobileImage: string;
  smallLabelMr?: string;
  smallLabelEn?: string;
  headlineMr: string;
  headlineEn: string;
  ctaMr: string;
  ctaEn: string;
  targetCategory?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2000&auto=format&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop',
    smallLabelMr: '१९५१ पासून',
    smallLabelEn: 'Since 1951',
    headlineMr: 'परंपरेचा साज,\nआजच्या सौंदर्यासाठी.',
    headlineEn: 'The Elegance of Tradition,\nFor Modern Beauty.',
    ctaMr: 'संग्रह पहा',
    ctaEn: 'Explore Collections',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2000&auto=format&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
    smallLabelMr: 'अस्सल सुवर्ण कलाकृती',
    smallLabelEn: 'Authentic Gold Craftsmanship',
    headlineMr: 'सोन्याच्या प्रत्येक दागिन्यात,\nविश्वासाची परंपरा.',
    headlineEn: 'In Every Golden Adornment,\nA Tradition of Trust.',
    ctaMr: 'दागिने पहा',
    ctaEn: 'Browse Jewellery',
    targetCategory: 'gold',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2000&auto=format&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
    smallLabelMr: 'शाही लग्नसराई',
    smallLabelEn: 'Royal Weddings',
    headlineMr: 'आपल्या खास क्षणांसाठी\nएक खास साज.',
    headlineEn: 'For Your Cherished Moments,\nA Distinctive Adornment.',
    ctaMr: 'संग्रह पहा',
    ctaEn: 'Explore Collections',
  },
];

interface HeroCarouselProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
  onSelectCategory: (category: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  currentLang,
  onNavigate,
  onSelectCategory,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMr = currentLang === 'mr';

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
    resetTimer();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    resetTimer();
  };

  const current = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-[#4B0F1A]">
      {/* 65-75vh container on desktop */}
      <div className="relative w-full h-[58vh] sm:h-[64vh] md:h-[70vh] lg:h-[74vh] max-h-[720px]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Cinematic Background Image: slowly scales from 1.03 -> 1 */}
              <picture>
                <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
                <img
                  src={slide.image}
                  alt={isMr ? slide.headlineMr : slide.headlineEn}
                  className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-100' : 'scale-[1.03]'
                  }`}
                />
              </picture>

              {/* Sophisticated Editorial Vignette & Gradient - Calm Warm Darkness */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#2F2521]/90 via-[#2F2521]/55 to-transparent"></div>

              {/* Minimal Text Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-left">
                  <div className="max-w-xl space-y-4">
                    
                    {/* Small Label: e.g. "१९५१ पासून" with letter-spacing animation */}
                    {slide.smallLabelMr && (
                      <div className="overflow-hidden">
                        <span 
                          className={`inline-block text-xs md:text-sm font-cinzel tracking-[0.25em] text-[#D4AF37] uppercase font-semibold transition-all duration-700 ease-out ${
                            isActive ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 tracking-normal'
                          }`}
                        >
                          {isMr ? slide.smallLabelMr : slide.smallLabelEn}
                        </span>
                      </div>
                    )}

                    {/* Heading: line-by-line reveal with overflow hidden */}
                    <div className="space-y-1">
                      {(isMr ? slide.headlineMr : slide.headlineEn).split('\n').map((line, lIdx) => (
                        <div key={lIdx} className="overflow-hidden">
                          <h1
                            className={`font-marathi-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FCF8F1] font-bold leading-[1.18] tracking-tight transition-all duration-800 ease-out ${
                              isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                            style={{
                              transitionDelay: `${200 + lIdx * 160}ms`,
                            }}
                          >
                            {line}
                          </h1>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button follows slightly after with hover arrow translation */}
                    <div 
                      className={`pt-3 transition-all duration-700 ease-out delay-500 ${
                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                    >
                      <button
                        onClick={() => {
                          if (slide.targetCategory) {
                            onSelectCategory(slide.targetCategory);
                          } else {
                            onSelectCategory('all');
                          }
                          onNavigate('catalogue');
                        }}
                        className="group inline-flex items-center space-x-2.5 px-7 py-3 sm:px-9 sm:py-3.5 rounded-full bg-[#4B0F1A] hover:bg-[#72263A] text-[#F7F1E6] text-xs sm:text-sm font-marathi-serif font-bold transition-all border border-[#D4AF37]/50 shadow-md hover:border-[#D4AF37] hover:scale-[1.02]"
                      >
                        <span>{isMr ? slide.ctaMr : slide.ctaEn}</span>
                        <span className="text-[#D4AF37] transform transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Minimal Slide Arrows (Desktop) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#2F2521]/40 hover:bg-[#2F2521]/80 text-[#FCF8F1] items-center justify-center transition-colors border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#2F2521]/40 hover:bg-[#2F2521]/80 text-[#FCF8F1] items-center justify-center transition-colors border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Minimal Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                resetTimer();
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? 'w-6 h-1.5 bg-[#D4AF37]'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
