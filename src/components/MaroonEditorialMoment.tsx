import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface MaroonEditorialMomentProps {
  currentLang: Language;
  onExploreCollections: () => void;
}

export const MaroonEditorialMoment: React.FC<MaroonEditorialMomentProps> = ({
  currentLang,
  onExploreCollections,
}) => {
  const isMr = currentLang === 'mr';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#3F1C46] text-[#F3F0EA] py-16 md:py-24 my-10 overflow-hidden border-y border-[#D7B95F]/35 select-none"
    >
      {/* Background Editorial Watermark Typography (subtle 5-8% opacity) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-[0.04]">
        <span className="font-cinzel text-[18vw] leading-none tracking-widest font-black text-white select-none whitespace-nowrap">
          WAFGAONKAR
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Heritage narrative, animated gold line, CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Small uppercase spaced English label */}
            <div
              className={`flex items-center space-x-3 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <span className="w-8 h-[1px] bg-[#D7B95F]" />
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#D7B95F] font-semibold">
                SINCE 1951 • MASTER JEWELLERS
              </span>
            </div>

            {/* Large Marathi Heading with sophisticated line breaks and line reveal */}
            <div className="overflow-hidden">
              <h2
                className={`font-marathi-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3F0EA] tracking-tight leading-[1.15] transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {isMr ? (
                  <>
                    <span>१९५१ पासून जपलेला</span>
                    <br />
                    <span className="text-[#D7B95F]">अतूट विश्वास.</span>
                  </>
                ) : (
                  <>
                    <span>A Legacy of Pure Trust</span>
                    <br />
                    <span className="text-[#D7B95F]">Since 1951.</span>
                  </>
                )}
              </h2>
            </div>

            {/* Animated Gold Line */}
            <div className="w-full max-w-md h-[1.5px] bg-[#D7B95F]/20 overflow-hidden my-4">
              <div
                className={`h-full bg-[#D7B95F] transition-all duration-1000 delay-200 ease-out ${
                  isVisible ? 'w-full' : 'w-0'
                }`}
              />
            </div>

            {/* Editorial Paragraph */}
            <p
              className={`font-marathi-serif text-sm sm:text-base md:text-lg text-[#F3F0EA]/85 max-w-xl leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {isMr
                ? 'चाकणच्या जुन्या बाजारपेठेत तीन पिढ्यांपूर्वी सुरू झालेली शुद्ध सुवर्णाची परंपरा, आजही प्रत्येक दागिन्यात तितक्याच पावित्र्याने आणि निष्ठेने जपली जात आहे.'
                : 'Beginning over seven decades ago in Chakan, our heritage of certified purity and master goldsmithing continues to grace your cherished auspicious moments.'}
            </p>

            {/* CTA Button */}
            <div
              className={`pt-2 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              <button
                onClick={onExploreCollections}
                className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-[#FAF8F4] hover:bg-[#F3F0EA] text-[#3F1C46] font-marathi-serif text-sm font-bold tracking-wide transition-all duration-300 shadow-md hover:scale-[1.02] border border-[#D7B95F] group"
              >
                <span>{isMr ? 'दागिने संग्रह पहा' : 'Explore Jewels'}</span>
                <ArrowRight className="w-4 h-4 text-[#3F1C46] transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: High-end jewellery artwork partially overlapping with gold frame */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div
              className={`relative mx-auto max-w-sm lg:max-w-none rounded-2xl overflow-hidden border-2 border-[#D7B95F]/50 shadow-2xl transition-all duration-1000 delay-300 transform ${
                isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
              }`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#2A0E33]">
                <img
                  src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop"
                  alt="Wafgaonkar Royal Heritage Jewellery"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Subtle Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2A0E33] via-[#2A0E33]/60 to-transparent p-6 text-left">
                <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[#D7B95F] block font-semibold">
                  TRADITIONAL MAHARASHTRIAN GOLD
                </span>
                <span className="font-marathi-display text-base font-bold text-[#F3F0EA]">
                  {isMr ? 'अस्सल पेशवाई कारागिरी' : 'Authentic Peshwai Craftsmanship'}
                </span>
              </div>
            </div>

            {/* Subtle decorative gold corner tag */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-[#D7B95F]/40 pointer-events-none rounded-bl-xl" />
          </div>

        </div>
      </div>
    </section>
  );
};
