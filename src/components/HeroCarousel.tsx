import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Language } from '../types';

interface HeroSlide {
  id: number;
  image: string;
  mobileImage: string;
  smallLabelMr: string;
  smallLabelEn: string;
  headlineMr: string;
  headlineEn: string;
  subtextMr: string;
  subtextEn: string;
  ctaMr: string;
  ctaEn: string;
  targetCategory?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2200&auto=format&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1100&auto=format&fit=crop',
    smallLabelMr: 'इ. स. १९५१ पासून विश्वासाची परंपरा',
    smallLabelEn: 'TRADITION OF TRUST • SINCE 1951',
    headlineMr: 'परंपरेचा राजेशाही साज,\nआजच्या चिरंतन सौंदर्यासाठी.',
    headlineEn: 'Heirloom Royal Artistry,\nFor Timeless Modern Grace.',
    subtextMr: 'शुद्ध २२ कॅरेट सोने, १००% सरकारी हॉलमार्क आणि सात दशकांची विश्वासार्ह कारागिरी.',
    subtextEn: 'Certified 22K pure gold, authentic BIS hallmark, and seven decades of family trust.',
    ctaMr: 'कॅटलॉग पहा',
    ctaEn: 'Explore Catalogue',
    targetCategory: 'all',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2200&auto=format&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1100&auto=format&fit=crop',
    smallLabelMr: 'शाही लग्नसोहळा वधू संग्रह',
    smallLabelEn: 'IMPERIAL BRIDAL TROUSSEAU',
    headlineMr: 'महाराष्ट्राच्या वैभवाचा मानबिंदू,\nप्रत्येक वधूचे स्वप्न.',
    headlineEn: 'The Crown of Maharashtrian Heritage,\nEvery Bride’s Reverence.',
    subtextMr: 'अस्सल पेशवाई ठुशी, कोल्हापुरी साज, नथ आणि नक्षीदार तोड्यांचा परिपूर्ण संगम.',
    subtextEn: 'Mastercrafted Thushi, Kolhapuri Saaj, Nath, and heritage Tode for the royal bride.',
    ctaMr: 'वधू संग्रह पहा',
    ctaEn: 'View Bridal Collection',
    targetCategory: 'gold',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2200&auto=format&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1100&auto=format&fit=crop',
    smallLabelMr: 'दालन दर्शन • चाकण',
    smallLabelEn: 'VISIT OUR SHOWROOMS • CHAKAN',
    headlineMr: 'प्रत्यक्ष दालनाला भेट द्या,\nअस्सल सुवर्ण अनुभूती घ्या.',
    headlineEn: 'Experience Tactile Brilliance,\nAt Our Flagship Showrooms.',
    subtextMr: 'चाकण येथील जुनी बाजारपेठ व माणिक चौक शाखांमध्ये आपले सहर्ष स्वागत आहे.',
    subtextEn: 'Welcoming families across Pune & Chakan at our Juni Bazarpeth & Manik Chowk pedhis.',
    ctaMr: 'दालनाची माहिती',
    ctaEn: 'Showroom Details',
    targetCategory: 'visit',
  },
];

interface HeroCarouselProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenStoreLocator?: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  currentLang,
  onNavigate,
  onSelectCategory,
  onOpenStoreLocator,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMr = currentLang === 'mr';

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
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

  const handleCtaClick = (slide: HeroSlide) => {
    if (slide.targetCategory === 'visit') {
      if (onOpenStoreLocator) {
        onOpenStoreLocator();
      } else {
        const el = document.getElementById('visit-store-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onSelectCategory(slide.targetCategory || 'all');
      onNavigate('catalogue');
    }
  };

  return (
    <section id="hero-carousel" className="relative w-full overflow-hidden bg-[#2C0010] scroll-mt-20">
      {/* Wide 16:9 Ratio Banner with balanced desktop & mobile height */}
      <div className="relative w-full aspect-[16/9] min-h-[440px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[620px] max-h-[720px]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Cinematic Visual Photography */}
              <picture>
                <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
                <img
                  src={slide.image}
                  alt={isMr ? slide.headlineMr : slide.headlineEn}
                  className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                    isActive ? 'scale-100' : 'scale-105'
                  }`}
                />
              </picture>

              {/* Sophisticated Editorial Vignette & Crimson-Gold Lighting Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1E000A]/95 via-[#3C0015]/75 to-transparent/30" />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />

              {/* Text & Content Layer */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full text-left">
                  <div className="max-w-2xl space-y-3 sm:space-y-4">
                    
                    {/* Hallmark & Heritage Trust Badge */}
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3C0015]/80 border border-[#D7B95F]/50 backdrop-blur-xs shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D7B95F]" />
                      <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#FAF8F4] font-bold">
                        {isMr ? slide.smallLabelMr : slide.smallLabelEn}
                      </span>
                    </div>

                    {/* Headline with Marathi Serif Elegance */}
                    <h1
                      className={`font-marathi-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF8F4] leading-[1.2] drop-shadow-md transition-all duration-700 ease-out whitespace-pre-line ${
                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                    >
                      {isMr ? slide.headlineMr : slide.headlineEn}
                    </h1>

                    {/* Gold Divider Accent */}
                    <div className="w-20 h-[2px] bg-gradient-to-r from-[#D7B95F] to-transparent my-2" />

                    {/* Subtext description */}
                    <p
                      className={`font-marathi-serif text-xs sm:text-base md:text-lg text-[#FAF8F4]/90 max-w-xl leading-relaxed drop-shadow-xs transition-all duration-700 delay-100 ${
                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                      }`}
                    >
                      {isMr ? slide.subtextMr : slide.subtextEn}
                    </p>

                    {/* CTAs */}
                    <div
                      className={`pt-2 flex flex-wrap items-center gap-3 transition-all duration-700 delay-200 ${
                        isActive ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                      }`}
                    >
                      <button
                        onClick={() => handleCtaClick(slide)}
                        className="inline-flex items-center space-x-2.5 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#D7B95F] via-[#E5CCA0] to-[#D7B95F] text-[#3C0015] font-marathi-serif text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-md hover:scale-[1.02] border border-[#D7B95F] cursor-pointer"
                      >
                        <span>{isMr ? slide.ctaMr : slide.ctaEn}</span>
                        <ArrowRight className="w-4 h-4 text-[#3C0015]" />
                      </button>

                      <button
                        onClick={() => {
                          const el = document.getElementById('visit-store-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center space-x-2 px-5 sm:px-6 py-3 rounded-full bg-[#3C0015]/70 hover:bg-[#3C0015] text-[#FAF8F4] font-marathi-serif text-xs sm:text-sm font-semibold transition-all border border-[#D7B95F]/40 shadow-xs cursor-pointer backdrop-blur-xs"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#D7B95F]" />
                        <span>{isMr ? 'दालन दर्शन (चाकण)' : 'Visit Showrooms'}</span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1A0007]/60 hover:bg-[#3C0015] text-[#FAF8F4] border border-[#D7B95F]/40 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-[#FAF8F4]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1A0007]/60 hover:bg-[#3C0015] text-[#FAF8F4] border border-[#D7B95F]/40 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-[#FAF8F4]" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                resetTimer();
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentSlide
                  ? 'w-8 bg-[#D7B95F]'
                  : 'w-2 bg-[#FAF8F4]/40 hover:bg-[#FAF8F4]/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
