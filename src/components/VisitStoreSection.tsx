import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, MessageCircle, Store, Award } from 'lucide-react';
import { BRAND_CONFIG } from '../config';
import { STORE_BRANCHES } from '../data/jewelleryData';
import { Language } from '../types';

interface VisitStoreSectionProps {
  currentLang: Language;
}

export const VisitStoreSection: React.FC<VisitStoreSectionProps> = ({ currentLang }) => {
  const isMr = currentLang === 'mr';
  const [activeTab, setActiveTab] = useState<'all' | 'branch-1' | 'branch-2'>('all');

  const handleWhatsAppBranch = (branchNumber: number, branchName: string) => {
    const text = encodeURIComponent(
      isMr
        ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला आपल्या शाखा क्र. ${branchNumber} (${branchName}) ला भेट देण्याविषयी आणि दागिन्यांची माहिती हवी आहे.`
        : `Hello Wafgaonkar Laxmi Jewellers, I would like to inquire about visiting Branch No. ${branchNumber} (${branchName}) and viewing your jewellery collections.`
    );
    window.open(`https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const branches = [
    {
      id: 'branch-1',
      number: 1,
      nameMr: 'शाखा क्र. १: जुनी बाजारपेठ, चाकण',
      nameEn: 'Branch No. 1: Juni Bazarpeth, Chakan',
      tagMr: 'मुख्य वारसा शाखा',
      tagEn: 'Heritage Main Branch',
      addressMr: 'जुनी बाजारपेठ, चाकण, ता. खेड, जि. पुणे - ४१०५०१',
      addressEn: 'Juni Bazarpeth, Chakan, Tal. Khed, Dist. Pune - 410501',
      timingsMr: 'सोमवार ते रविवार: सकाळी १०:०० ते रात्री ८:३० (दररोज सुरू)',
      timingsEn: 'Monday to Sunday: 10:00 AM to 8:30 PM (All 7 Days)',
      phone: '0000000000',
      mapsUrl: 'https://maps.google.com/?q=Wafgaonkar+Laxmi+Jewellers+Juni+Bazarpeth+Chakan+Pune',
    },
    {
      id: 'branch-2',
      number: 2,
      nameMr: 'शाखा क्र. २: माणिक चौक, सिद्धी आर्केड समोर, चाकण',
      nameEn: 'Branch No. 2: Manik Chowk, Opp. Siddhi Arcade, Chakan',
      tagMr: 'सुवर्ण व वधू दालन',
      tagEn: 'Gold & Bridal Studio',
      addressMr: 'माणिक चौक, सिद्धी आर्केड समोर, चाकण, ता. खेड, जि. पुणे - ४१०५०१',
      addressEn: 'Manik Chowk, Opp. Siddhi Arcade, Chakan, Tal. Khed, Dist. Pune - 410501',
      timingsMr: 'सोमवार ते रविवार: सकाळी १०:०० ते रात्री ८:३० (दररोज सुरू)',
      timingsEn: 'Monday to Sunday: 10:00 AM to 8:30 PM (All 7 Days)',
      phone: '0000000000',
      mapsUrl: 'https://maps.google.com/?q=Manik+Chowk+Opp+Siddhi+Arcade+Chakan+Pune',
    },
  ];

  const displayedBranches = activeTab === 'all' 
    ? branches 
    : branches.filter((b) => b.id === activeTab);

  return (
    <section className="py-14 md:py-20 px-4 md:px-8 max-w-7xl mx-auto text-left">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <div className="inline-flex items-center space-x-2 text-[#D4AF37] font-cinzel text-xs uppercase tracking-[0.25em] mb-2.5">
          <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{isMr ? 'दालन दर्शन' : 'VISIT OUR SHOWROOMS'}</span>
        </div>
        
        <h2 className="font-marathi-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#4B0F1A] tracking-tight mb-3">
          {isMr ? 'आमच्या दालनाला भेट द्या' : 'Visit Our Showrooms in Chakan'}
        </h2>
        
        <p className="font-marathi-serif text-[#76685F] text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
          {isMr
            ? 'चाकण येथील आमच्या दोन्ही दालनात येऊन प्रत्यक्ष शुद्ध सोन्याच्या दागिन्यांची भव्यता, चमक आणि अस्सल कारागिरीचा सुखद अनुभव घ्या. आमचे तज्ज्ञ सुवर्ण सल्लागार आपल्या सेवेत सदैव तत्पर आहेत.'
            : 'Step into our two signature showrooms in Chakan to experience the tactile brilliance, hallmarked purity, and heirloom craftsmanship of pure gold and silver jewellery.'}
        </p>

        {/* Branch Filter Switcher */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-6 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#4B0F1A] text-[#F7F1E6] shadow-xs border border-[#D4AF37]'
                : 'bg-[#FCF8F1] text-[#2F2521] border border-[#D4AF37]/30 hover:bg-[#F7F1E6]'
            }`}
          >
            {isMr ? 'दोन्ही शाखा' : 'Both Showrooms'}
          </button>
          <button
            onClick={() => setActiveTab('branch-1')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeTab === 'branch-1'
                ? 'bg-[#4B0F1A] text-[#F7F1E6] shadow-xs border border-[#D4AF37]'
                : 'bg-[#FCF8F1] text-[#2F2521] border border-[#D4AF37]/30 hover:bg-[#F7F1E6]'
            }`}
          >
            {isMr ? 'शाखा १: जुनी बाजारपेठ' : 'Branch 1: Juni Bazarpeth'}
          </button>
          <button
            onClick={() => setActiveTab('branch-2')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeTab === 'branch-2'
                ? 'bg-[#4B0F1A] text-[#F7F1E6] shadow-xs border border-[#D4AF37]'
                : 'bg-[#FCF8F1] text-[#2F2521] border border-[#D4AF37]/30 hover:bg-[#F7F1E6]'
            }`}
          >
            {isMr ? 'शाखा २: माणिक चौक' : 'Branch 2: Manik Chowk'}
          </button>
        </div>
      </div>

      {/* Two Branches Cards Grid */}
      <div className={`grid grid-cols-1 ${displayedBranches.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'} gap-6 sm:gap-8`}>
        {displayedBranches.map((branch) => (
          <div
            key={branch.id}
            className="bg-[#FCF8F1] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/35 overflow-hidden shadow-xs hover:border-[#D4AF37] transition-all flex flex-col justify-between"
          >
            {/* Top Area: Clean English "Shop Photo" Frame */}
            <div className="relative bg-[#4B0F1A] text-[#F7F1E6] p-6 sm:p-8 flex flex-col items-center justify-center text-center overflow-hidden border-b border-[#D4AF37]/30">
              {/* Subtle background decorative pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Branch Badge */}
              <div className="relative z-10 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#72263A] border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-cinzel tracking-wider uppercase mb-2.5">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{isMr ? `शाखा क्र. ${branch.number}` : `Branch No. ${branch.number}`}</span>
              </div>

              {/* Clean English "Shop Photo" Frame */}
              <div className="relative z-10 w-full max-w-sm py-4 px-5 sm:py-5 sm:px-6 rounded-xl sm:rounded-2xl bg-[#370B13]/80 border border-[#D4AF37]/40 backdrop-blur-xs text-center space-y-1 shadow-inner">
                <Store className="w-7 h-7 sm:w-8 sm:h-8 text-[#D4AF37] mx-auto opacity-90" />
                <div className="font-cinzel text-base sm:text-xl font-bold tracking-widest text-[#F7F1E6] uppercase">
                  Shop Photo
                </div>
                <div className="font-marathi-serif text-xs text-[#D4AF37]/90">
                  {isMr ? `${branch.nameMr.split(':')[1]} - दालन` : `${branch.nameEn.split(':')[1]}`}
                </div>
              </div>
            </div>

            {/* Bottom Details */}
            <div className="p-5 sm:p-8 flex-grow flex flex-col justify-between space-y-5">
              
              {/* Title & Tag */}
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#D4AF37] font-cinzel font-semibold block mb-1">
                  {isMr ? branch.tagMr : branch.tagEn}
                </span>
                <h3 className="font-marathi-display text-lg sm:text-2xl font-bold text-[#4B0F1A] leading-snug">
                  {isMr ? branch.nameMr : branch.nameEn}
                </h3>
              </div>

              {/* Information Rows */}
              <div className="space-y-3.5 pt-1 border-t border-[#D4AF37]/20">
                
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7F1E6] border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 text-[#4B0F1A] mt-0.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-marathi-serif font-bold text-[11px] sm:text-xs text-[#2F2521] uppercase tracking-wider">
                      {isMr ? 'पत्ता' : 'Address'}
                    </h4>
                    <p className="font-marathi-serif text-xs sm:text-sm text-[#2F2521] mt-0.5 leading-relaxed font-medium">
                      {isMr ? branch.addressMr : branch.addressEn}
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7F1E6] border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 text-[#4B0F1A] mt-0.5">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-marathi-serif font-bold text-[11px] sm:text-xs text-[#2F2521] uppercase tracking-wider">
                      {isMr ? 'दालनाची वेळ' : 'Showroom Timings'}
                    </h4>
                    <p className="font-marathi-serif text-xs sm:text-sm text-[#2F2521] mt-0.5 font-medium">
                      {isMr ? branch.timingsMr : branch.timingsEn}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F7F1E6] border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 text-[#4B0F1A] mt-0.5">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-marathi-serif font-bold text-[11px] sm:text-xs text-[#2F2521] uppercase tracking-wider">
                      {isMr ? 'फोन नंबर' : 'Phone'}
                    </h4>
                    <p className="font-cinzel text-xs sm:text-sm text-[#4B0F1A] mt-0.5 font-bold">
                      <a href={`tel:${branch.phone}`} className="hover:underline">
                        {branch.phone}
                      </a>
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons: Full-width and easy tap on mobile */}
              <div className="pt-3.5 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-[#4B0F1A] hover:bg-[#72263A] text-[#F7F1E6] text-xs font-marathi-serif font-semibold border border-[#D4AF37]/40 transition-colors shadow-xs w-full sm:w-auto"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isMr ? 'गुगल मॅपवर दिशा पहा' : 'Get Directions'}</span>
                </a>

                <button
                  onClick={() => handleWhatsAppBranch(branch.number, isMr ? branch.nameMr : branch.nameEn)}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-[#4B0F1A]/10 hover:bg-[#4B0F1A] text-[#4B0F1A] hover:text-[#F7F1E6] text-xs font-marathi-serif font-semibold transition-colors shadow-xs w-full sm:w-auto border border-[#D4AF37]/40"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isMr ? 'व्हॉट्सॲपवर संपर्क करा' : 'WhatsApp Us'}</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
