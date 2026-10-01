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
    <section className="py-14 md:py-20 px-4 md:px-8 max-w-7xl mx-auto text-left rounded-3xl bg-[#FAF8F4] border border-[#D7B95F]/35 shadow-xs my-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
        <div className="inline-flex items-center space-x-2 text-[#D7B95F] font-cinzel text-xs uppercase tracking-[0.25em] mb-2.5">
          <Store className="w-3.5 h-3.5 text-[#D7B95F]" />
          <span>{isMr ? 'दालन दर्शन' : 'VISIT OUR SHOWROOMS'}</span>
        </div>
        
        <h2 className="font-marathi-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#3C0015] tracking-tight mb-3">
          {isMr ? 'आमच्या दालनाला भेट द्या' : 'Visit Our Showrooms in Chakan'}
        </h2>
        
        <p className="font-marathi-serif text-[#766A61] text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
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
                ? 'bg-[#3C0015] text-[#F3F0EA] shadow-xs border border-[#D7B95F]'
                : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
            }`}
          >
            {isMr ? 'दोन्ही शाखा' : 'Both Showrooms'}
          </button>
          <button
            onClick={() => setActiveTab('branch-1')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeTab === 'branch-1'
                ? 'bg-[#3C0015] text-[#F3F0EA] shadow-xs border border-[#D7B95F]'
                : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
            }`}
          >
            {isMr ? 'शाखा १: जुनी बाजारपेठ' : 'Branch 1: Juni Bazarpeth'}
          </button>
          <button
            onClick={() => setActiveTab('branch-2')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-marathi-serif font-bold transition-all ${
              activeTab === 'branch-2'
                ? 'bg-[#3C0015] text-[#F3F0EA] shadow-xs border border-[#D7B95F]'
                : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
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
            className="bg-[#FAF8F4] rounded-2xl sm:rounded-3xl border border-[#D7B95F]/35 overflow-hidden shadow-xs hover:border-[#D7B95F] transition-all flex flex-col justify-between"
          >
            {/* Top Area: Clean English "Shop Photo" Frame */}
            <div className="relative velvet-bg text-[#F3F0EA] p-6 sm:p-8 flex flex-col items-center justify-center text-center overflow-hidden border-b border-[#D7B95F]/30">
              {/* Subtle background decorative pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D7B95F_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Branch Badge */}
              <div className="relative z-10 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#500018] border border-[#D7B95F]/40 text-[#D7B95F] text-[11px] font-cinzel tracking-wider uppercase mb-2.5">
                <Award className="w-3.5 h-3.5 text-[#D7B95F]" />
                <span>{isMr ? `शाखा क्र. ${branch.number}` : `Branch No. ${branch.number}`}</span>
              </div>

              {/* Clean English "Shop Photo" Frame */}
              <div className="relative z-10 w-full max-w-sm py-4 px-5 sm:py-5 sm:px-6 rounded-xl sm:rounded-2xl bg-[#2C0010]/80 border border-[#D7B95F]/40 backdrop-blur-xs text-center space-y-1 shadow-inner">
                <Store className="w-7 h-7 sm:w-8 sm:h-8 text-[#D7B95F] mx-auto opacity-90" />
                <div className="font-cinzel text-base sm:text-xl font-bold tracking-widest text-[#F3F0EA] uppercase">
                  Shop Photo
                </div>
                <div className="font-marathi-serif text-xs text-[#D7B95F]/90">
                  {isMr ? `${branch.nameMr.split(':')[1]} - दालन` : `${branch.nameEn.split(':')[1]}`}
                </div>
              </div>
            </div>

            {/* Bottom Details */}
            <div className="p-5 sm:p-8 flex-grow flex flex-col justify-between space-y-5">
              
              {/* Title & Tag */}
              <div>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#D7B95F] font-cinzel font-semibold block mb-1">
                  {isMr ? branch.tagMr : branch.tagEn}
                </span>
                <h3 className="font-marathi-display text-lg sm:text-2xl font-bold text-[#3C0015] leading-snug">
                  {isMr ? branch.nameMr : branch.nameEn}
                </h3>
              </div>

              {/* Information Rows */}
              <div className="space-y-3.5 pt-1 border-t border-[#D7B95F]/20">
                
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F0EA] border border-[#D7B95F]/40 flex items-center justify-center flex-shrink-0 text-[#3C0015] mt-0.5">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7B95F]" />
                  </div>
                  <div>
                    <h4 className="font-marathi-serif font-bold text-[11px] sm:text-xs text-[#29231F] uppercase tracking-wider">
                      {isMr ? 'पत्ता' : 'Address'}
                    </h4>
                    <p className="font-marathi-serif text-xs sm:text-sm text-[#29231F] mt-0.5 leading-relaxed font-medium">
                      {isMr ? branch.addressMr : branch.addressEn}
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F0EA] border border-[#D7B95F]/40 flex items-center justify-center flex-shrink-0 text-[#3C0015] mt-0.5">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7B95F]" />
                  </div>
                  <div>
                    <h4 className="font-marathi-serif font-bold text-[11px] sm:text-xs text-[#29231F] uppercase tracking-wider">
                      {isMr ? 'दालनाची वेळ' : 'Showroom Timings'}
                    </h4>
                    <p className="font-marathi-serif text-xs sm:text-sm text-[#29231F] mt-0.5 font-medium">
                      {isMr ? branch.timingsMr : branch.timingsEn}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F3F0EA] border border-[#D7B95F]/40 flex items-center justify-center flex-shrink-0 text-[#3C0015] mt-0.5">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D7B95F]" />
                  </div>
                  <div>
                    <h4 className="font-marathi-serif font-bold text-[11px] sm:text-xs text-[#29231F] uppercase tracking-wider">
                      {isMr ? 'फोन नंबर' : 'Phone'}
                    </h4>
                    <p className="font-cinzel text-xs sm:text-sm text-[#3C0015] mt-0.5 font-bold">
                      <a href={`tel:${branch.phone}`} className="hover:underline">
                        {branch.phone}
                      </a>
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons: Full-width and easy tap on mobile */}
              <div className="pt-3.5 border-t border-[#D7B95F]/20 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-xs font-marathi-serif font-semibold border border-[#D7B95F]/40 transition-colors shadow-xs w-full sm:w-auto"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D7B95F]" />
                  <span>{isMr ? 'गुगल मॅपवर दिशा पहा' : 'Get Directions'}</span>
                </a>

                <button
                  onClick={() => handleWhatsAppBranch(branch.number, isMr ? branch.nameMr : branch.nameEn)}
                  className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-full bg-[#3C0015]/10 hover:bg-[#3C0015] text-[#3C0015] hover:text-[#F3F0EA] text-xs font-marathi-serif font-semibold transition-colors shadow-xs w-full sm:w-auto border border-[#D7B95F]/40"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#D7B95F]" />
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
