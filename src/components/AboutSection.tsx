import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface AboutSectionProps {
  currentLang: Language;
  onOpenAboutModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  currentLang,
  onOpenAboutModal,
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
    <section ref={sectionRef} className="py-14 md:py-24 px-4 md:px-8 max-w-7xl mx-auto text-left">
      <div className="bg-[#FAF8F4] rounded-3xl border border-[#D7B95F]/35 p-6 md:p-12 lg:p-14 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center">
          
          {/* LEFT: Large Image with slow reveal */}
          <div className="md:col-span-6 relative rounded-2xl overflow-hidden border border-[#D7B95F]/40 aspect-[4/5] sm:aspect-[4/4] md:aspect-[4/5] shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
              alt="Wafgaonkar Master Goldsmith Craftsmanship"
              className={`w-full h-full object-cover object-center transform transition-all duration-1000 ease-out ${
                isVisible ? 'scale-100 opacity-100' : 'scale-105 opacity-60'
              } group-hover:scale-105`}
            />
            {/* Cinematic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C0010]/75 via-[#2C0010]/15 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-5 left-5 right-5 text-[#FAF8F4]">
              <span className="text-[10px] uppercase tracking-widest text-[#D7B95F] font-cinzel font-semibold block">
                AUTHENTIC CRAFTSMANSHIP
              </span>
              <span className="font-marathi-display text-base sm:text-lg font-bold text-[#FAF8F4]">
                {isMr ? '१९५१ पासूनची अखंड परंपरा' : 'Master Craftsmanship Since 1951'}
              </span>
            </div>
          </div>

          {/* RIGHT: Editorial text */}
          <div className="md:col-span-6 space-y-5">
            
            {/* Small: SINCE 1951 */}
            <div
              className={`flex items-center space-x-2 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <span className="w-6 h-[1.5px] bg-[#D7B95F]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#D7B95F] font-cinzel font-bold block">
                SINCE 1951
              </span>
            </div>

            {/* Large Heading line-by-line reveal */}
            <div className="overflow-hidden">
              <h2
                className={`font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#3C0015] tracking-tight leading-[1.2] transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {isMr ? (
                  <>
                    <span>पिढ्यान्पिढ्या जपलेला</span>
                    <br />
                    <span>विश्वास.</span>
                  </>
                ) : (
                  <>
                    <span>Generations of Pure,</span>
                    <br />
                    <span>Enduring Trust.</span>
                  </>
                )}
              </h2>
            </div>

            {/* Short text */}
            <p
              className={`font-marathi-serif text-[#29231F] text-sm sm:text-base leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {isMr
                ? '१९५१ मध्ये चाकण येथे स्थापन झालेली आमची पेढी आज तीन पिढ्यांचा अतूट कौटुंबिक स्नेह आणि १००% प्रमाणित शुद्धतेचे प्रतीक बनली आहे. प्रत्येक दागिन्यात परंपरेचा मान आणि आधुनिक सौंदर्याची चमक ओतली आहे.'
                : 'Founded in 1951 in Chakan, our house represents three generations of family affection, certified hallmark purity, and reverent craftsmanship that celebrates Maharashtra’s richest jewellery heritage.'}
            </p>

            {/* Small gold line that draws itself from left to right */}
            <div className="w-full max-w-xs h-[1.5px] bg-[#D7B95F]/25 overflow-hidden my-4">
              <div
                className={`h-full bg-[#D7B95F] transition-all duration-700 delay-300 ease-out ${
                  isVisible ? 'w-full' : 'w-0'
                }`}
              />
            </div>

            {/* “आमची कहाणी →” */}
            <div
              className={`pt-2 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <button
                onClick={onOpenAboutModal}
                className="inline-flex items-center space-x-2 text-sm sm:text-base font-marathi-serif font-bold text-[#3C0015] hover:text-[#500018] group transition-colors cursor-pointer"
              >
                <span>{isMr ? 'आमची कहाणी' : 'Our Story'}</span>
                <span className="text-[#D7B95F] transform transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
