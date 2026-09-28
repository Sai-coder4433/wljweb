import React from 'react';
import { X, Award, ShieldCheck, History, Heart } from 'lucide-react';
import { Language } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, currentLang }) => {
  const isMr = currentLang === 'mr';
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F4] rounded-2xl max-w-4xl w-full my-8 overflow-hidden border border-[#D7B95F]/40 shadow-2xl relative animate-in zoom-in-95 duration-200 text-left font-marathi-serif">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#3F1C46] text-[#F3F0EA] hover:bg-[#4A2252] transition-colors flex items-center justify-center shadow-lg border border-[#D7B95F]/40"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header in Royal Maroon */}
        <div className="bg-[#3F1C46] text-[#F3F0EA] p-8 md:p-12 relative overflow-hidden border-b border-[#D7B95F]/30">
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[#D7B95F] font-cinzel text-xs uppercase tracking-[0.25em] mb-3">
              <History className="w-4 h-4 text-[#D7B95F]" />
              <span>{isMr ? '१९५१ पासूनची परंपरा' : 'Legacy Since 1951'}</span>
            </div>

            <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F3F0EA] tracking-tight leading-snug">
              {isMr ? 'वाफगावकर लक्ष्मी ज्वेलर्सची गौरवगाथा' : 'The Legacy of Wafgaonkar Laxmi Jewellers'}
            </h2>

            <p className="text-sm md:text-base text-[#F3F0EA]/90 mt-3 leading-relaxed">
              {isMr
                ? '“एका पिढीकडून दुसऱ्या पिढीकडे, सोन्यापेक्षाही मौल्यवान काही असेल, तर तो म्हणजे विश्वास.”'
                : '“Passed down from one generation to the next, if anything is more precious than gold, it is the sacred bond of trust.”'}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-10">
          
          {/* Section 1: Origin */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 rounded-2xl border border-[#D7B95F]/40 bg-[#F3F0EA] aspect-[4/3] md:aspect-square overflow-hidden shadow-xs relative group">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
                alt="Goldsmith Craftsmanship"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F1C46]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-[#F3F0EA]">
                <p className="text-xs font-marathi-serif text-[#D7B95F] font-bold">
                  {isMr ? 'पिढीजात कारागिरीचे अधिष्ठान' : 'Generations of Fine Craftsmanship'}
                </p>
              </div>
            </div>
            <div className="md:col-span-7 space-y-3">
              <h3 className="font-marathi-display text-2xl font-bold text-[#3F1C46]">
                {isMr ? 'स्थापना आणि सुवर्ण विचार' : 'The Golden Foundation'}
              </h3>
              <p className="text-sm md:text-base text-[#45234B] leading-relaxed">
                {isMr
                  ? 'सन १९५१ मध्ये चाकणच्या ऐतिहासिक बाजारपेठेत एका प्रतिष्ठित सुवर्ण पेढीपासून झालेली सुरुवात आज तीन पिढ्यांचे आणि हजारो कुटुंबांचे विश्वासाचे अधिष्ठान बनली आहे. वाफगावकर घराण्याने प्रत्येक ग्राहकाला केवळ ग्राहक न मानता आपल्या कुटुंबाचा घटक मानले आहे.'
                  : 'Founded in 1951 in the historic market of Chakan, Pune, Wafgaonkar Laxmi Jewellers began as a revered family pedhi rooted in honest weighment, sacred handcrafting, and pure gold purity.'}
              </p>
              <p className="text-sm text-[#766B73] leading-relaxed">
                {isMr
                  ? 'अस्सल पेशवाई अलंकार, कोल्हापुरी साज, नाजूक ठुशी, चंद्रहार आणि ब्राह्मणी नथ या महाराष्ट्रीयन दागिन्यांची मूळ कारागिरी जतन ठेवण्यात आमचे योगदान अतुलनीय आहे.'
                  : 'We have taken immense pride in preserving authentic royal Maratha adornments including handcrafted Kolhapuri Saaj, Peshwai Thushi, and traditional pearls.'}
              </p>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="pt-6 border-t border-[#D7B95F]/30">
            <h3 className="font-marathi-display text-2xl font-bold text-[#3F1C46] text-center mb-8">
              {isMr ? 'प्रवासाचे महत्त्वाचे टप्पे' : 'Chronicles of Our Heritage'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#D7B95F]/30 text-center shadow-xs">
                <div className="font-cinzel text-xl font-bold text-[#3F1C46] mb-1">1951</div>
                <div className="font-marathi-display font-bold text-sm text-[#45234B]">
                  {isMr ? 'पहिली पेढी स्थापन' : 'First Pedhi Founded'}
                </div>
                <div className="text-xs text-[#766B73] mt-1">
                  {isMr ? 'चाकण जुनी बाजारपेठ येथे पारंपारिक सोन्याच्या दागिन्यांची सुरुवात.' : 'Beginning of authentic goldsmithing in Chakan.'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D7B95F]/30 text-center shadow-xs">
                <div className="font-cinzel text-xl font-bold text-[#3F1C46] mb-1">1985</div>
                <div className="font-marathi-display font-bold text-sm text-[#45234B]">
                  {isMr ? 'शाही वधू दालन' : 'Royal Bridal Wing'}
                </div>
                <div className="text-xs text-[#766B73] mt-1">
                  {isMr ? 'महाराष्ट्रीयन लग्नसराईसाठी खास वधू अलंकारांची मालिका.' : 'Comprehensive wedding trousseau studio.'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D7B95F]/30 text-center shadow-xs">
                <div className="font-cinzel text-xl font-bold text-[#3F1C46] mb-1">2005</div>
                <div className="font-marathi-display font-bold text-sm text-[#45234B]">
                  {isMr ? '१००% BIS हॉलमार्क' : '100% BIS Hallmarking'}
                </div>
                <div className="text-xs text-[#766B73] mt-1">
                  {isMr ? 'सरकारी शुद्धतेच्या सर्व मानकांची १००% अंमलबजावणी.' : 'Early pioneer of zero-defect HUID hallmarks.'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#D7B95F]/30 text-center shadow-xs">
                <div className="font-cinzel text-xl font-bold text-[#3F1C46] mb-1">2026</div>
                <div className="font-marathi-display font-bold text-sm text-[#45234B]">
                  {isMr ? 'डिजिटल लक्झरी कॅटलॉग' : 'Digital Luxury Catalogue'}
                </div>
                <div className="text-xs text-[#766B73] mt-1">
                  {isMr ? 'जागतिक दर्जाचा डिजिटल कॅटलॉग अनुभव आणि थेट व्हॉट्सॲप चौकशी.' : 'Bespoke digital catalogue and direct WhatsApp enquiry.'}
                </div>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="p-6 rounded-xl bg-[#3F1C46] text-[#F3F0EA] flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D7B95F]/30">
            <div className="space-y-1">
              <div className="font-marathi-display text-xl font-bold text-[#D7B95F]">
                {isMr ? 'आमचे अखंड वचन' : 'Our Enduring Promise'}
              </div>
              <div className="text-xs md:text-sm text-[#F3F0EA]/90">
                {isMr 
                  ? 'शुद्धतेची हमी, कारागिरीची निष्ठा आणि पिढ्यान्पिढ्यांचा आदर.' 
                  : 'Absolute purity, artisan fidelity, and veneration for family heritage.'}
              </div>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#3F1C46] hover:bg-[#4A2252] text-[#F3F0EA] border border-[#D7B95F]/60 text-xs font-bold whitespace-nowrap transition-colors shadow-xs"
            >
              {isMr ? 'दागिने पहा' : 'Explore Jewels'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

