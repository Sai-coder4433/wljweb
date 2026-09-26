import React from 'react';
import { 
  ShieldCheck, 
  Receipt, 
  Gem, 
  Sparkles, 
  Users, 
  Infinity 
} from 'lucide-react';
import { Language } from '../types';

interface WhyChooseUsProps {
  currentLang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ currentLang }) => {
  const isMr = currentLang === 'mr';

  const reasons = [
    {
      icon: ShieldCheck,
      title: isMr ? 'BIS प्रमाणित सोने' : '100% BIS Hallmarked',
      desc: isMr ? 'प्रत्येक दागिन्यावर HUID सह १००% सरकारी शुद्धतेचा शिक्का.' : 'Govt verified HUID hallmark guaranteeing uncompromised purity.',
    },
    {
      icon: Receipt,
      title: isMr ? 'पारदर्शक किंमत' : 'Transparent Pricing',
      desc: isMr ? 'सोन्याचे निव्वळ वजन, खड्यांचे वजन आणि घडणावळ याचे स्पष्ट विवरण.' : 'Itemized breakdown of net weight, stone charges, and making fees.',
    },
    {
      icon: Gem,
      title: isMr ? 'उत्कृष्ट कारागिरी' : 'Master Craftsmanship',
      desc: isMr ? 'पारंपरिक सुवर्णकारांच्या कौशल्यातून घडलेले अमर अलंकार.' : 'Heritage artisans preserving centuries-old jewellery weaving art.',
    },
    {
      icon: Sparkles,
      title: isMr ? 'विश्वासार्ह सेवा' : 'Dedicated Personal Care',
      desc: isMr ? 'प्रत्येक ग्राहकाचा आदर आणि कौटुंबिक आपुलकीची सेवा.' : 'Warm personalized boutique consultation for every bride and family.',
    },
    {
      icon: Users,
      title: isMr ? 'पिढ्यान्पिढ्यांचा अनुभव' : '7 Decades of Legacy',
      desc: isMr ? '१९५१ पासून महाराष्ट्रातील लाखो कुटुंबांचा अतूट विश्वास.' : 'Serving three generations of esteemed patrons across Maharashtra.',
    },
    {
      icon: Infinity,
      title: isMr ? 'आयुष्यभराचा विश्वास' : 'Lifetime Buyback & Care',
      desc: isMr ? 'लाईफटाईम एक्सचेंज, पॉलिशिंग आणि परताव्याची हमी.' : 'Lifetime exchange guarantee, complimentary ultrasonic cleaning & polish.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#EFE4D2]/40 border-b border-[#B8903C]/20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[#9D7A35] font-cinzel text-xs uppercase tracking-[0.25em] mb-2">
            <span className="w-6 h-[1px] bg-[#B8903C]"></span>
            <span>{isMr ? 'आमचे वचन' : 'Our Enduring Promise'}</span>
            <span className="w-6 h-[1px] bg-[#B8903C]"></span>
          </div>
          <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#5A1720] tracking-tight">
            {isMr ? 'वाफगावकर ज्वेलर्सच का?' : 'Why Wafgaonkar Laxmi Jewellers?'}
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#B8903C] to-transparent mx-auto mt-3"></div>
        </div>

        {/* 6 Elegant Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="p-6 md:p-7 rounded-2xl bg-[#F7F1E6] border border-[#B8903C]/25 hover:border-[#B8903C] transition-all duration-300 luxury-shadow flex items-start space-x-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EFE4D2] border border-[#B8903C]/30 flex items-center justify-center text-[#5A1720] group-hover:bg-[#5A1720] group-hover:text-[#D4B56A] transition-all duration-300 flex-shrink-0">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-marathi-display text-lg md:text-xl font-bold text-[#5A1720] mb-1.5 group-hover:text-[#3D1017] transition-colors">
                    {reason.title}
                  </h3>
                  <p className="font-marathi-serif text-xs md:text-sm text-[#3A2922]/80 leading-relaxed">
                    {reason.desc}
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
