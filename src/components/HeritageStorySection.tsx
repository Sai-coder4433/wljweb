import React from 'react';
import { History, ShieldCheck, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';
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

  const trustPoints = [
    {
      titleMr: '१००% BIS हॉलमार्क हमी',
      titleEn: '100% BIS Hallmark Guarantee',
      descMr: 'भारत सरकार मान्यताप्राप्त HUID हॉलमार्कसह प्रत्येक सुवर्ण दागिन्याची अचूक शुद्धता.',
      descEn: 'Govt. of India certified HUID hallmark guaranteeing absolute gold purity.',
      icon: ShieldCheck,
    },
    {
      titleMr: 'अस्सल महाराष्ट्रीयन कारागिरी',
      titleEn: 'Authentic Maharashtrian Craftsmanship',
      descMr: 'पेशवेकालीन ठुशी, कोल्हापुरी साज व पारंपरिक नक्षीकामाची सात दशकांची परंपरा.',
      descEn: 'Seven decades of master goldsmithing in Peshwai Thushi, Saaj, and bridal heirlooms.',
      icon: Award,
    },
    {
      titleMr: 'पारदर्शक व्यवहार व अचूक वजन',
      titleEn: 'Transparent Purity & Weight',
      descMr: 'दागिन्यांचे ग्रॉस व नेट वजन आणि रोजच्या सोन्याच्या दराची संपूर्ण पारदर्शकता.',
      descEn: 'Honest gross & net weight measurements with transparent daily gold rates.',
      icon: CheckCircle2,
    },
    {
      titleMr: 'तिसऱ्या पिढीचा अखंड स्नेह',
      titleEn: 'Generations of Family Trust',
      descMr: '१९५१ पासून चाकण व परिसरातील लाखो कुटुंबांचे हक्काचे व विश्वासाचे सुवर्ण दालन.',
      descEn: 'Serving families across Pune and Chakan with enduring affection since 1951.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="heritage-story-section" className="py-14 md:py-24 px-4 md:px-8 max-w-7xl mx-auto text-left">
      {/* 01. MAIN STORY CARD */}
      <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-10 md:p-14 border border-[#D7B95F]/35 shadow-xs relative overflow-hidden mb-10">
        
        {/* Subtle decorative heritage watermark */}
        <div className="absolute -right-12 -bottom-12 text-[#D7B95F]/08 font-cinzel text-[160px] md:text-[220px] font-bold select-none pointer-events-none">
          1951
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Heritage Archival Style Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D7B95F]/40 shadow-xl bg-white p-2">
              <div className="rounded-xl overflow-hidden aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200&auto=format&fit=crop"
                  alt="Wafgaonkar Laxmi Jewellers Heritage 1951"
                  loading="lazy"
                  className="w-full h-full object-cover filter sepia-[0.12] contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#26000D]/85 via-transparent to-transparent" />
                
                {/* Archival Badge */}
                <div className="absolute bottom-4 inset-x-4 p-3.5 bg-[#FAF8F4]/95 backdrop-blur-md rounded-xl border border-[#D7B95F]/40 text-center shadow-md">
                  <div className="font-cinzel text-xs font-bold text-[#D7B95F] uppercase tracking-widest">
                    FOUNDED IN CHAKAN
                  </div>
                  <div className="font-marathi-display text-xl sm:text-2xl font-bold text-[#3C0015]">
                    इ. स. १९५१
                  </div>
                  <div className="text-[11px] font-marathi-serif text-[#766A61] mt-0.5">
                    पुणे — महाराष्ट्राचा ७५ वर्षांचा गौरवशाली वारसा
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Marathi Brand Storytelling */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 text-[#D7B95F] font-cinzel text-xs uppercase tracking-[0.25em] font-semibold">
              <History className="w-4 h-4 text-[#D7B95F]" />
              <span>{isMr ? 'आमचा गौरवशाली प्रवास' : 'Our Glorious Legacy'}</span>
            </div>

            <h2 className="font-marathi-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#3C0015] tracking-tight leading-snug">
              {isMr ? '१९५१ पासून जपलेला विश्वास' : 'A Sacred Trust Cherished Since 1951'}
            </h2>

            <div className="w-20 h-0.5 bg-[#D7B95F]" />

            {/* Marathi Poetic Heritage Copy */}
            <div className="font-marathi-serif text-base sm:text-lg text-[#29231F] leading-relaxed space-y-4">
              <p className="italic text-[#3C0015] font-semibold border-l-3 border-[#D7B95F] pl-4 py-1 bg-[#D7B95F]/10 rounded-r-lg">
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

              <p className="text-sm sm:text-base text-[#29231F]/90 leading-relaxed">
                {isMr ? (
                  '१९५१ मध्ये चाकणच्या ऐतिहासिक भूमीत सुरू झालेली वाफगांवकर लक्ष्मी ज्वेलर्सची सुवर्ण परंपरा आज तीन पिढ्यांचा विश्वास बनली आहे. प्रत्येक दागिन्यामध्ये १००% सरकारी बीआयएस हॉलमार्क, अस्सल कारागिरी आणि कौटुंबिक स्नेह जपत आम्ही आपल्या शुभ क्षणांना अधिक मंगलमय करतो.'
                ) : (
                  'Founded in 1951 in the historic town of Chakan, Wafgaonkar Laxmi Jewellers has preserved an unbroken legacy of purity, artisan fidelity, and familial trust across more than seven decades.'
                )}
              </p>
            </div>

            {/* Read Story CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenAboutModal}
                className="inline-flex items-center space-x-2 text-sm sm:text-base font-marathi-serif font-bold text-[#3C0015] hover:text-[#500018] transition-colors cursor-pointer border-b-2 border-[#D7B95F] pb-1"
              >
                <span>{isMr ? 'आमची संपूर्ण कहाणी जाणून घ्या' : 'Read Our Full Heritage Journey'}</span>
                <span className="text-[#D7B95F]">→</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 02. SEPARATE TRUST & QUALITY VERIFICATION SECTION (Mandated in Requirement 7) */}
      <div className="pt-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#D7B95F] font-bold block mb-1">
            VERIFIED PURITY & INTEGRITY
          </span>
          <h3 className="font-marathi-display text-xl sm:text-2xl font-bold text-[#3C0015]">
            {isMr ? 'शुद्धतेची ४ सुवर्ण मानके' : '4 Pillars of Hallmarked Trust'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {trustPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF8F4] p-5 sm:p-6 rounded-2xl border border-[#D7B95F]/30 hover:border-[#D7B95F] shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#3C0015]/10 border border-[#D7B95F]/40 flex items-center justify-center text-[#3C0015]">
                  <Icon className="w-5 h-5 text-[#3C0015]" />
                </div>
                <div>
                  <h4 className="font-marathi-serif font-bold text-sm sm:text-base text-[#3C0015]">
                    {isMr ? point.titleMr : point.titleEn}
                  </h4>
                  <p className="font-marathi-serif text-xs text-[#766A61] mt-1 leading-relaxed">
                    {isMr ? point.descMr : point.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
