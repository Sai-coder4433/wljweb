import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

export interface CollectionItemData {
  id: string;
  nameMr: string;
  nameEn: string;
  subtitleMr: string;
  subtitleEn: string;
  categoryFilter: string;
  purityBadgeMr: string;
  purityBadgeEn: string;
  purityCategory: '22k' | '24k' | 'silver' | 'diamond' | 'all';
  image: string;
}

const COLLECTIONS_DATA: CollectionItemData[] = [
  {
    id: 'bridal',
    nameMr: 'शाही वधू संग्रह',
    nameEn: 'Imperial Bridal Collection',
    subtitleMr: 'वधूच्या सर्वात खास दिवसासाठी राजेशाही सुवर्ण साज',
    subtitleEn: 'Royal heirloom jewellery curated for the auspicious wedding day',
    categoryFilter: 'gold',
    purityBadgeMr: '२२ कॅरेट ९१६ हॉलमार्क',
    purityBadgeEn: '22K 916 BIS Hallmark',
    purityCategory: '22k',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'traditional',
    nameMr: 'पारंपरिक महाराष्ट्रीयन साज',
    nameEn: 'Traditional Maharashtrian Collection',
    subtitleMr: 'अस्सल पेशवाई ठुशी, २१-पानांचा कोल्हापुरी साज व ब्राह्मणी नथ',
    subtitleEn: 'Authentic Peshwai Thushi, Kolhapuri Saaj & Brahmani Nath',
    categoryFilter: 'necklaces',
    purityBadgeMr: '२२ कॅरेट शुद्ध सोने',
    purityBadgeEn: '22K Authentic Gold',
    purityCategory: '22k',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'temple',
    nameMr: 'मंदिर शैली नक्षीकाम',
    nameEn: 'Temple Jewellery Collection',
    subtitleMr: 'देवी महालक्ष्मीच्या आशीर्वादाने परिपूर्ण बारीक कोरीव काम',
    subtitleEn: 'Handcrafted nakshi motifs & goddess Laxmi sacred carvings',
    categoryFilter: 'gold',
    purityBadgeMr: '२२ कॅरेट नक्षीकाम',
    purityBadgeEn: '22K Nakshi Gold',
    purityCategory: '22k',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'daily',
    nameMr: 'दैनंदिन सुवर्ण साज',
    nameEn: 'Daily Wear Jewellery',
    subtitleMr: 'दररोजच्या सौंदर्यासाठी वजनाने हलके, नाजूक व मजबूत दागिने',
    subtitleEn: 'Lightweight, modern and comfortable pieces for every day',
    categoryFilter: 'rings',
    purityBadgeMr: '२२ कॅरेट / १८ कॅरेट',
    purityBadgeEn: '22K / 18K Hallmarked',
    purityCategory: '22k',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'silver',
    nameMr: 'शुद्ध चांदी संग्रह',
    nameEn: 'Pure Silver Articles & Jewellery',
    subtitleMr: 'पारंपरिक घुंगरू पैंजण, नक्षीदार जोडवी व मंगल पूजा भांडी',
    subtitleEn: 'Sterling payal, handcrafted jodvi & auspicious silver pooja utensils',
    categoryFilter: 'silver',
    purityBadgeMr: '९२.५ शुद्ध चांदी',
    purityBadgeEn: '92.5 Sterling Silver',
    purityCategory: 'silver',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 'festive',
    nameMr: 'सण-उत्सव विशेष संग्रह',
    nameEn: 'Festive & Auspicious Jewellery',
    subtitleMr: 'गुढीपाडवा, दसरा आणि दिवाळी शुभ मुहूर्तासाठी खास डिझाइन्स',
    subtitleEn: 'Celebrated auspicious designs for Gudi Padwa, Dussehra & Diwali',
    categoryFilter: 'all',
    purityBadgeMr: '२४K व २२K प्रमाणित',
    purityBadgeEn: '24K & 22K Certified',
    purityCategory: '24k',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
  },
];

interface FeaturedCollectionsProps {
  currentLang: Language;
  onSelectCollection: (categoryFilter: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  currentLang,
  onSelectCollection,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | '22k' | '24k' | 'silver'>('all');
  const isMr = currentLang === 'mr';

  const filteredCollections = activeFilter === 'all'
    ? COLLECTIONS_DATA
    : COLLECTIONS_DATA.filter((c) => c.purityCategory === activeFilter);

  return (
    <section id="collections-section" className="py-14 md:py-22 px-4 md:px-8 max-w-7xl mx-auto text-left scroll-mt-24">
      {/* Editorial Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
        <div className="inline-flex items-center space-x-2 text-[#D7B95F] font-cinzel text-xs uppercase tracking-[0.25em] mb-2 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#D7B95F]" />
          <span>ROYAL HERITAGE ANTHOLOGY</span>
        </div>
        <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#3C0015] tracking-tight">
          {isMr ? 'निवडक संग्रह' : 'Curated Collections'}
        </h2>
        <div className="w-16 h-[1.5px] bg-[#D7B95F] mx-auto mt-3 mb-2" />
        <p className="font-marathi-serif text-xs sm:text-sm md:text-base text-[#766A61] mt-2">
          {isMr
            ? 'वधू, पारंपरिक, मंदिर नक्षीकाम, दैनंदिन वापर, चांदी आणि सण-उत्सवासाठी खास तयार केलेले सुवर्ण संग्रह.'
            : 'Explore our mastercrafted collections for Bridal, Traditional, Temple Artistry, Daily Wear, Silver, and Festive moments.'}
        </p>

        {/* Purity & Category Filters (Mandated in Requirement 5) */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#3C0015] text-[#FAF8F4] shadow-xs border border-[#D7B95F]'
                : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
            }`}
          >
            {isMr ? 'सर्व संग्रह (६)' : 'All Collections (6)'}
          </button>
          <button
            onClick={() => setActiveFilter('22k')}
            className={`px-4 py-1.5 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeFilter === '22k'
                ? 'bg-[#3C0015] text-[#FAF8F4] shadow-xs border border-[#D7B95F]'
                : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
            }`}
          >
            {isMr ? '२२K हॉलमार्क सुवर्ण' : '22K Hallmarked Gold'}
          </button>
          <button
            onClick={() => setActiveFilter('24k')}
            className={`px-4 py-1.5 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeFilter === '24k'
                ? 'bg-[#3C0015] text-[#FAF8F4] shadow-xs border border-[#D7B95F]'
                : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
            }`}
          >
            {isMr ? '२४K शुभ मुहूर्त' : '24K Festive Gold'}
          </button>
          <button
            onClick={() => setActiveFilter('silver')}
            className={`px-4 py-1.5 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeFilter === 'silver'
                ? 'bg-[#3C0015] text-[#FAF8F4] shadow-xs border border-[#D7B95F]'
                : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
            }`}
          >
            {isMr ? '९२.५ शुद्ध चांदी' : '92.5 Fine Silver'}
          </button>
        </div>
      </div>

      {/* 6 Curated Collection Cards in Balanced Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredCollections.map((col) => (
          <div
            key={col.id}
            onClick={() => onSelectCollection(col.categoryFilter)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer min-h-[380px] sm:min-h-[420px] bg-[#FAF8F4] shadow-xs hover:shadow-xl transition-all duration-500 border border-[#D7B95F]/35 hover:border-[#D7B95F] flex flex-col justify-end transform hover:-translate-y-1.5"
          >
            {/* Background Image: scales 1.05 on hover */}
            <img
              src={col.image}
              alt={isMr ? col.nameMr : col.nameEn}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Cinematic Gradient with Royal Crimson character */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#20000B]/95 via-[#3C0015]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Purity Hallmark Badge on Top */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1A0007]/85 border border-[#D7B95F]/60 text-[#D7B95F] text-[10px] font-cinzel font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs">
                <ShieldCheck className="w-3 h-3 text-[#D7B95F]" />
                <span>{isMr ? col.purityBadgeMr : col.purityBadgeEn}</span>
              </span>
            </div>

            {/* Overlay Typography */}
            <div className="relative z-10 p-6 sm:p-7 text-[#FAF8F4] flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-1">
              <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#D7B95F] font-semibold mb-1 block">
                {col.nameEn.toUpperCase()}
              </span>
              
              <h3 className="font-marathi-display text-xl sm:text-2xl font-bold tracking-tight text-[#FAF8F4]">
                {isMr ? col.nameMr : col.nameEn}
              </h3>

              {/* Expanding Gold Line */}
              <div className="w-0 group-hover:w-20 h-[1.5px] bg-[#D7B95F] my-2.5 transition-all duration-500 ease-out" />

              <p className="font-marathi-serif text-xs sm:text-sm text-[#FAF8F4]/80 line-clamp-2 mb-3 leading-relaxed">
                {isMr ? col.subtitleMr : col.subtitleEn}
              </p>

              <div className="flex items-center space-x-2 text-xs sm:text-sm font-marathi-serif text-[#D7B95F] pt-1 font-semibold">
                <span>{isMr ? 'संग्रहातील दागिने पहा' : 'Explore Collection'}</span>
                <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
