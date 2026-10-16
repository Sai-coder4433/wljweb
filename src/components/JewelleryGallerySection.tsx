import React, { useState } from 'react';
import { Camera, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { BRAND_CONFIG } from '../config';

interface GalleryPiece {
  id: string;
  nameMr: string;
  nameEn: string;
  category: 'all' | 'bridal' | 'necklaces' | 'bangles' | 'earrings';
  categoryLabelMr: string;
  categoryLabelEn: string;
  purity: string;
  image: string;
}

const GALLERY_PIECES: GalleryPiece[] = [
  {
    id: 'gal-1',
    nameMr: 'शाही पेशवाई ठुशी व नथ संच',
    nameEn: 'Peshwai Thushi & Nath Atelier',
    category: 'bridal',
    categoryLabelMr: 'वधू सुवर्ण साज',
    categoryLabelEn: 'Bridal Atelier',
    purity: '22K 916 BIS Hallmark',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'gal-2',
    nameMr: '२१ पानांचा ऐतिहासिक कोल्हापुरी साज',
    nameEn: 'Historic 21-Pan Kolhapuri Saaj',
    category: 'necklaces',
    categoryLabelMr: 'पारंपरिक हार',
    categoryLabelEn: 'Heritage Necklace',
    purity: '22K 916 BIS Hallmark',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'gal-3',
    nameMr: 'शिंदेशाही तोडे व गोठ जोड',
    nameEn: 'Shindeshahi Tode & Goth Pair',
    category: 'bangles',
    categoryLabelMr: 'बांगड्या व तोडे',
    categoryLabelEn: 'Bangles & Tode',
    purity: '22K 916 BIS Hallmark',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'gal-4',
    nameMr: 'अँटिक मयूर झुमके व मोत्याची बुगडी',
    nameEn: 'Peacock Jhumkas & Pearl Bugadi',
    category: 'earrings',
    categoryLabelMr: 'कर्णफुले व बुगडी',
    categoryLabelEn: 'Earrings & Bugadi',
    purity: '22K 916 BIS Hallmark',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'gal-5',
    nameMr: 'पारंपरिक सुवर्ण वटी मंगळसूत्र',
    nameEn: 'Auspicious Vati Gold Mangalsutra',
    category: 'bridal',
    categoryLabelMr: 'मंगल सूत्र',
    categoryLabelEn: 'Sacred Mangalsutra',
    purity: '22K 916 BIS Hallmark',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 'gal-6',
    nameMr: 'देवी महालक्ष्मी मंदिर नक्षीदार चोकर',
    nameEn: 'Temple Goddess Nakshi Choker',
    category: 'necklaces',
    categoryLabelMr: 'मंदिर नक्षीकाम',
    categoryLabelEn: 'Temple Artistry',
    purity: '22K 916 BIS Hallmark',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=900&auto=format&fit=crop',
  },
];

interface JewelleryGallerySectionProps {
  currentLang: Language;
}

export const JewelleryGallerySection: React.FC<JewelleryGallerySectionProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'bridal' | 'necklaces' | 'bangles' | 'earrings'>('all');
  const isMr = currentLang === 'mr';

  const displayedPieces = activeTab === 'all'
    ? GALLERY_PIECES
    : GALLERY_PIECES.filter((p) => p.category === activeTab);

  return (
    <section id="gallery-section" className="py-14 md:py-22 px-4 md:px-8 max-w-7xl mx-auto text-left">
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
        <div className="inline-flex items-center space-x-2 text-[#D7B95F] font-cinzel text-xs uppercase tracking-[0.25em] mb-2 font-semibold">
          <Camera className="w-3.5 h-3.5 text-[#D7B95F]" />
          <span>ARTISANAL SHOWCASE • 9:16 GALLERY</span>
        </div>
        <h2 className="font-marathi-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#3C0015] tracking-tight">
          {isMr ? 'दागिने दालन व गॅलरी' : 'Jewellery Gallery'}
        </h2>
        <div className="w-16 h-[1.5px] bg-[#D7B95F] mx-auto mt-3 mb-2" />
        <p className="font-marathi-serif text-xs sm:text-sm md:text-base text-[#766A61] mt-2">
          {isMr
            ? 'अस्सल कारागिरीचे नजाकतदार फोटो — १००% बीआयएस हॉलमार्क प्रमाणित सुवर्ण कलाकृती.'
            : 'Uniform portrait photography showcasing authentic Maharashtrian master artistry.'}
        </p>

        {/* Gallery Tabs */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          {[
            { id: 'all', labelMr: 'सर्व छायाचित्रे', labelEn: 'All Pieces' },
            { id: 'bridal', labelMr: 'वधू साज', labelEn: 'Bridal Sets' },
            { id: 'necklaces', labelMr: 'हार व ठुशी', labelEn: 'Haar & Thushi' },
            { id: 'bangles', labelMr: 'तोडे व पाटल्या', labelEn: 'Tode & Bangles' },
            { id: 'earrings', labelMr: 'कर्णफुले व झुमके', labelEn: 'Earrings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-marathi-serif font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#3C0015] text-[#FAF8F4] shadow-xs border border-[#D7B95F]'
                  : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
              }`}
            >
              {isMr ? tab.labelMr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Uniform 9:16 Gallery Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedPieces.map((piece) => {
          const waUrl = `https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(
            isMr
              ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला आपल्या गॅलरीतील "${piece.nameMr}" या डिझाइनबद्दल चौकशी करायची आहे.`
              : `Hello Wafgaonkar Laxmi Jewellers, I would like to inquire about this design from your gallery: "${piece.nameEn}".`
          )}`;

          return (
            <div
              key={piece.id}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#D7B95F]/30 hover:border-[#D7B95F] shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col transform hover:-translate-y-1.5"
            >
              {/* 4:5 Portrait Image Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
                <img
                  src={piece.image}
                  alt={isMr ? piece.nameMr : piece.nameEn}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F000A]/95 via-[#3C0015]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Hallmark Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#1A0007]/85 border border-[#D7B95F]/50 text-[#D7B95F] text-[9px] font-cinzel font-bold tracking-wider backdrop-blur-xs">
                    <ShieldCheck className="w-3 h-3 text-[#D7B95F]" />
                    <span>{piece.purity}</span>
                  </span>
                </div>

                {/* Bottom Content with Direct WhatsApp Enquiry */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-[#FAF8F4] flex flex-col justify-end z-10">
                  <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#D7B95F] font-semibold mb-1">
                    {isMr ? piece.categoryLabelMr : piece.categoryLabelEn}
                  </span>

                  <h3 className="font-marathi-display text-sm sm:text-base font-bold text-[#FAF8F4] leading-snug line-clamp-2">
                    {isMr ? piece.nameMr : piece.nameEn}
                  </h3>

                  {/* Gold Divider */}
                  <div className="w-0 group-hover:w-16 h-[1.5px] bg-[#D7B95F] my-2 transition-all duration-300" />

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 py-2 px-3 rounded-full bg-gradient-to-r from-[#D7B95F] via-[#E5CCA0] to-[#D7B95F] text-[#3C0015] text-xs font-marathi-serif font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5 border border-[#D7B95F]"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#3C0015] text-[#3C0015]" />
                    <span>{isMr ? 'WhatsApp वर चौकशी करा' : 'Enquire on WhatsApp'}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
