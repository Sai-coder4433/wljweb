import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Language } from '../types';

interface BridalEditorialSectionProps {
  currentLang: Language;
  onNavigateBridal: () => void;
  onSelectBridalCategory: (categoryName: string) => void;
}

export const BridalEditorialSection: React.FC<BridalEditorialSectionProps> = ({
  currentLang,
  onNavigateBridal,
  onSelectBridalCategory,
}) => {
  const isMr = currentLang === 'mr';

  const bridalCategories = [
    { name: 'वधू हार', enName: 'Bridal Haar', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop' },
    { name: 'ठुशी', enName: 'Royal Thushi', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop' },
    { name: 'चंद्रहार', enName: 'Chandrahar', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop' },
    { name: 'कोल्हापुरी साज', enName: 'Kolhapuri Saaj', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop' },
    { name: 'नथ', enName: 'Brahmani Nath', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop' },
    { name: 'बांगड्या व पाटल्या', enName: 'Patlya & Bangles', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop' },
    { name: 'मंगळसूत्र', enName: 'Vati Mangalsutra', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop' },
    { name: 'कर्णफुले व झुमके', enName: 'Jhumkas & Earrings', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-[#3D1017] text-[#F3F0EA] overflow-hidden">
      {/* Background Architectural Texture */}
      <div className="absolute inset-0 bg-pattern-jharokha opacity-15 pointer-events-none"></div>
      
      {/* Subtle Warm Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4B56A]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#B8903C]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Top Editorial Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#D4B56A]/15 border border-[#D4B56A]/30 text-[#D4B56A] text-xs uppercase tracking-widest font-cinzel mb-4">
              <Sparkles className="w-3 h-3 text-[#D4B56A]" />
              <span>{isMr ? 'शाही महाराष्ट्रीयन वधू संग्रह' : 'Royal Maharashtrian Bridal Suite'}</span>
            </div>

            <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#F3F0EA] mb-5 drop-shadow">
              {isMr ? 'तिच्या आयुष्यातील सर्वात खास दिवसासाठी' : 'For The Most Sacred Day Of Her Life'}
            </h2>

            <p className="font-marathi-serif text-base md:text-xl text-[#EFE4D2]/90 leading-relaxed mb-8 max-w-xl">
              {isMr
                ? '“परंपरेचा साज, प्रेमाची आठवण आणि आयुष्यभर जपता येईल असा दागिना.”'
                : '“The adornment of heritage, the sacred memory of love, and heirlooms cherished for generations.”'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateBridal}
                className="px-8 py-3.5 rounded-full bg-[#D4B56A] text-[#3D1017] hover:bg-[#B8903C] hover:text-[#F3F0EA] font-marathi-serif font-bold text-sm md:text-base transition-all duration-300 shadow-xl flex items-center space-x-2 group transform hover:-translate-y-0.5"
              >
                <span>{isMr ? 'वधू संग्रह पहा' : 'Explore Bridal Collection'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-[#3D1017] group-hover:text-[#F3F0EA]" />
              </button>

              <div className="text-xs text-[#D4B56A] font-marathi-serif flex items-center gap-1.5">
                <Heart className="w-4 h-4 fill-[#D4B56A]" />
                <span>{isMr ? 'पारंपरिक विवाह सल्लागार उपलब्ध' : 'Bridal Consultants Available'}</span>
              </div>
            </div>
          </div>

          {/* Bridal Feature Portrait */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4B56A]/50 shadow-2xl p-2 bg-[#5A1720]">
              <div className="rounded-xl overflow-hidden aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200&auto=format&fit=crop"
                  alt="Peshwai Bridal Gold Jewellery"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D1017]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 inset-x-4 p-3 bg-[#3D1017]/80 backdrop-blur-md rounded-lg border border-[#D4B56A]/30 text-center">
                  <div className="font-marathi-display text-base font-bold text-[#D4B56A]">
                    {isMr ? 'अस्सल पेशवाई सुवर्ण भूषणे' : 'Peshwai Bridal Treasures'}
                  </div>
                  <div className="text-[11px] text-[#EFE4D2]/80 font-cinzel">
                    100% 22K (916) BIS HALLMARKED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Traditional Maharashtrian Bridal Categories Grid */}
        <div className="pt-8 border-t border-[#B8903C]/30">
          <div className="text-center mb-8">
            <h3 className="font-marathi-display text-xl md:text-2xl text-[#D4B56A] font-bold">
              {isMr ? 'वधूचे आठ पारंपरिक मुख्य अलंकार' : 'Eight Essential Maharashtrian Bridal Ornaments'}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {bridalCategories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => onSelectBridalCategory(cat.name)}
                className="group p-3 rounded-xl bg-[#5A1720]/60 hover:bg-[#5A1720] border border-[#D4B56A]/30 hover:border-[#D4B56A] transition-all duration-300 cursor-pointer text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border border-[#D4B56A]/60 mb-2.5 bg-[#2B211D]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                  />
                </div>
                <div className="font-marathi-serif text-xs md:text-sm font-bold text-[#F3F0EA] group-hover:text-[#D4B56A] transition-colors leading-tight">
                  {isMr ? cat.name : cat.enName}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
