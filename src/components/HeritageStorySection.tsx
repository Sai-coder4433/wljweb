import React from 'react';
import { ArrowRight, History, Award } from 'lucide-react';
import { Language } from '../types';

interface HeritageStorySectionProps {
  currentLang: Language;
  onOpenAboutModal: () => void;
}

export const HeritageStorySection: React.FC<HeritageStorySectionProps> = ({
  currentLang,
  onOpenAboutModal,
}) => {
  const isMr = currentLang === 'mr';

  return (
    <section className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-[#EFE4D2]/50 rounded-3xl p-8 md:p-14 border border-[#B8903C]/30 luxury-shadow relative overflow-hidden">
        
        {/* Subtle decorative heritage watermark */}
        <div className="absolute -right-16 -bottom-16 text-[#B8903C]/10 font-cinzel text-[180px] font-bold select-none pointer-events-none">
          1951
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Archival Style Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#B8903C]/40 shadow-xl bg-white p-2">
              <div className="rounded-xl overflow-hidden aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200&auto=format&fit=crop"
                  alt="Wafgaonkar Laxmi Jewellers Heritage 1951"
                  loading="lazy"
                  className="w-full h-full object-cover filter sepia-[0.15] contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D1017]/80 via-transparent to-transparent"></div>
                
                {/* Archival Badge */}
                <div className="absolute bottom-4 inset-x-4 p-3 bg-[#F7F1E6]/95 backdrop-blur-md rounded-lg border border-[#B8903C]/40 text-center shadow-lg">
                  <div className="font-cinzel text-xs font-bold text-[#9D7A35] uppercase tracking-widest">
                    Original Pedhi Estd.
                  </div>
                  <div className="font-marathi-display text-xl font-bold text-[#5A1720]">
                    इ. स. १९५१
                  </div>
                  <div className="text-[11px] font-marathi-serif text-[#3A2922]">
                    पुणे — महाराष्ट्राचा गौरवशाली वारसा
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Storytelling Copy from Prompt */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#9D7A35] font-cinzel text-xs uppercase tracking-[0.25em]">
              <History className="w-4 h-4 text-[#B8903C]" />
              <span>{isMr ? 'आमचा गौरवशाली प्रवास' : 'Our Glorious Legacy'}</span>
            </div>

            <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#5A1720] tracking-tight leading-snug">
              {isMr ? '१९५१ पासून जपलेला विश्वास' : 'A Sacred Trust Cherished Since 1951'}
            </h2>

            <div className="w-20 h-0.5 bg-[#B8903C]"></div>

            {/* Exact Marathi Copy Mandated by Prompt */}
            <div className="font-marathi-serif text-lg md:text-xl text-[#2B211D] leading-relaxed space-y-4">
              <p className="italic text-[#5A1720] font-semibold border-l-3 border-[#B8903C] pl-4 py-1">
                {isMr ? (
                  <>
                    “एका पिढीकडून दुसऱ्या पिढीकडे,<br />
                    सोन्यापेक्षाही मौल्यवान काही असेल,<br />
                    तर तो म्हणजे विश्वास.”
                  </>
                ) : (
                  <>
                    “Passed down from one generation to the next,<br />
                    if anything is more precious than pure gold,<br />
                    it is the unbroken bond of trust.”
                  </>
                )}
              </p>

              <p className="text-base md:text-lg text-[#3A2922]/90">
                {isMr ? (
                  '१९५१ पासून वाफगावकर लक्ष्मी ज्वेलर्सने कारागिरी, गुणवत्ता आणि ग्राहकांच्या विश्वासाची ही परंपरा मनापासून जपली आहे. महाराष्ट्राच्या संस्कृतीचा अभिमान बाळगून आम्ही प्रत्येक दागिना एका पवित्र सोहळ्यासारखा घडवतो.'
                ) : (
                  'Since 1951, Wafgaonkar Laxmi Jewellers has diligently preserved this golden tradition of consummate craftsmanship, uncompromised purity, and familial trust across more than seven decades.'
                )}
              </p>
            </div>

            {/* Read Story CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenAboutModal}
                className="inline-flex items-center space-x-2 text-base md:text-lg font-marathi-serif font-bold text-[#5A1720] hover:text-[#B8903C] transition-colors group cursor-pointer border-b border-[#5A1720] pb-1"
              >
                <span>{isMr ? 'आमची कहाणी वाचा' : 'Read Our Full Story'}</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform text-[#B8903C]" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
