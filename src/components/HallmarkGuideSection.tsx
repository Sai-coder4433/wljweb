import React, { useState } from 'react';
import { ShieldCheck, Award, QrCode, Smartphone, CheckCircle2, Search, ExternalLink, MessageCircle, Info } from 'lucide-react';
import { Language } from '../types';
import { BRAND_CONFIG } from '../config';

interface HallmarkGuideSectionProps {
  currentLang: Language;
}

export const HallmarkGuideSection: React.FC<HallmarkGuideSectionProps> = ({ currentLang }) => {
  const isMr = currentLang === 'mr';
  const [selectedPurityTab, setSelectedPurityTab] = useState<'22k' | '24k' | '18k' | 'silver'>('22k');

  const hallmarkComponents = [
    {
      step: '01',
      titleMr: '१. बीआयएस त्रिकोणी चिन्ह (BIS Logo)',
      titleEn: '1. Official BIS Triangular Mark',
      badgeMr: 'सरकारी मानक',
      badgeEn: 'Govt. Standard',
      descMr: 'भारतीय मानक ब्युरो (Bureau of Indian Standards) चे अधिकृत त्रिकोणी चिन्ह. हे चिन्ह दागिन्यावर असणे म्हणजे सुवर्ण शुद्धतेची १००% कायदेशीर सरकारी हमी.',
      descEn: 'The official triangular insignia of the Bureau of Indian Standards, certifying that the ornament complies with national purity benchmarks.',
      icon: (
        <svg viewBox="0 0 100 90" className="w-12 h-12 text-[#D7B95F]" fill="currentColor">
          <polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
          <polygon points="50,28 76,72 24,72" fill="currentColor" opacity="0.25" />
          <text x="50" y="65" textAnchor="middle" fill="currentColor" fontSize="18" fontFamily="Cinzel, serif" fontWeight="bold">BIS</text>
        </svg>
      )
    },
    {
      step: '02',
      titleMr: '२. शुद्धता व कॅरेट ग्रेड (Purity & Fineness)',
      titleEn: '2. Purity & Fineness Grade',
      badgeMr: '22K916 / 24K999',
      badgeEn: 'Karat Fineness',
      descMr: 'दागिन्यातील सोन्याचे प्रमाण दर्शवणारा अंक. उदा. 22K916 म्हणजे ९१.६% शुद्ध सोने. पारंपारिक, टिकणारे आणि नक्षीदार दागिने घडवण्यासाठी २२ कॅरेट सुवर्ण हे आदर्श मानले जाते.',
      descEn: 'Indicates the exact proportion of pure gold in parts per thousand (e.g., 22K916 signifies 91.6% pure gold), ensuring complete honesty.',
      icon: (
        <div className="w-14 h-14 rounded-xl bg-[#500018] border border-[#D7B95F]/50 flex flex-col items-center justify-center text-[#D7B95F] font-cinzel font-bold shadow-inner">
          <span className="text-xs leading-none">22K</span>
          <span className="text-[13px] tracking-wider text-[#FAF8F4]">916</span>
        </div>
      )
    },
    {
      step: '03',
      titleMr: '३. ६-अंकी युनिक HUID कोड (6-Digit HUID)',
      titleEn: '3. 6-Digit Alphanumeric HUID',
      badgeMr: 'डिजिटल पडताळणी',
      badgeEn: 'Unique ID',
      descMr: 'हॉलमार्क युनिक आयडेंटिफिकेशन (HUID) हा प्रत्येक दागिन्याला दिलेला स्वतंत्र ६-अक्षरी कोड असतो (उदा. WLJ751). हा कोड भारत सरकारच्या सर्व्हरवर नोंदणीकृत असतो.',
      descEn: 'A unique 6-character laser-engraved code for every single piece. It tracks assaying authenticity and can be verified via the BIS Care App.',
      icon: (
        <div className="px-2.5 py-1.5 rounded-lg bg-[#500018] border border-[#D7B95F]/50 flex items-center space-x-1.5 text-[#D7B95F] font-mono font-bold tracking-widest text-xs shadow-inner">
          <QrCode className="w-4 h-4 text-[#D7B95F]" />
          <span>WL9151</span>
        </div>
      )
    }
  ];

  const purityTable = [
    {
      id: '22k',
      purityMr: '२२ कॅरेट (22K 916)',
      purityEn: '22 Karat (22K 916)',
      goldContentMr: '९१.६% शुद्ध सुवर्ण',
      goldContentEn: '91.6% Pure Gold',
      useMr: 'मंगळसूत्र, ठुशी, हार, तोडे, पाटल्या, झुमके व अंगठ्या',
      useEn: 'Haar, Mangalsutra, Bangles, Kudya, Daily & Bridal Heirlooms',
      standardMr: 'भारतात दागिन्यांसाठी सर्वाधिक लोकप्रिय व टिकाऊ मानक',
      standardEn: 'Most preferred benchmark for Maharashtrian jewellery',
    },
    {
      id: '24k',
      purityMr: '२४ कॅरेट (24K 999)',
      purityEn: '24 Karat (24K 999)',
      goldContentMr: '९९.९% सर्वाधिक शुद्ध सोने',
      goldContentEn: '99.9% Purest Gold',
      useMr: 'सुवर्ण नाणी (Coins), वेढणी, लगड (Bars) व देवमूर्ती',
      useEn: 'Gold Coins, Vedhani, Bullion Bars & Pooja Idols',
      standardMr: 'गुंतवणूक व धार्मिक कार्यासाठी सर्वोत्तम',
      standardEn: 'Ideal for auspicious investment & pooja',
    },
    {
      id: '18k',
      purityMr: '१८ कॅरेट (18K 750)',
      purityEn: '18 Karat (18K 750)',
      goldContentMr: '७५.०% शुद्ध सोने',
      goldContentEn: '75.0% Pure Gold',
      useMr: 'हिऱ्यांचे दागिने (Real Diamond Jewellery) व नाजूक डिझाइन्स',
      useEn: 'Diamond studded rings, pendants, delicate everyday styles',
      standardMr: 'हिऱ्यांची पकड मजबूत ठेवण्यासाठी योग्य कठीणपणा',
      standardEn: 'Optimal tensile strength for precious stones',
    },
    {
      id: 'silver',
      purityMr: '९२.५% स्टर्लिंग चांदी (925)',
      purityEn: '92.5 Sterling Silver (925)',
      goldContentMr: '९२.५% शुद्ध चांदी',
      goldContentEn: '92.5% Pure Silver',
      useMr: 'पैंजण, जोडवी, करंडा, चांदीची भांडी व देवपूजा साहित्य',
      useEn: 'Payal, Jodvi, Silver Pooja Utensils, Diya & Articles',
      standardMr: 'BIS प्रमाणित ९२५ शुद्ध चांदीची मोहर',
      standardEn: 'BIS Certified 925 Hallmark Silver Standard',
    },
  ];

  return (
    <section id="hallmark-section" className="py-14 md:py-24 px-4 md:px-8 max-w-7xl mx-auto text-left scroll-mt-24">
      {/* 01. SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F4] border border-[#D7B95F]/40 text-[#D7B95F] font-cinzel text-xs uppercase tracking-[0.22em] mb-3 font-semibold shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#D7B95F]" />
          <span>GOVERNMENT RECOGNISED 100% BIS HALLMARK</span>
        </div>

        <h2 className="font-marathi-display text-2xl sm:text-4xl md:text-5xl font-bold text-[#3C0015] tracking-tight mb-3 leading-snug">
          {isMr ? 'बीआयएस हॉलमार्क शुद्धतेची त्रिसूत्री' : 'How to Identify Authentic BIS Hallmark'}
        </h2>

        <div className="w-20 h-0.5 bg-[#D7B95F] mx-auto mb-3" />

        <p className="font-marathi-serif text-xs sm:text-base text-[#766A61] leading-relaxed max-w-2xl mx-auto">
          {isMr
            ? 'वाफगावकर लक्ष्मी ज्वेलर्समधील प्रत्येक सोन्याच्या दागिन्यावर भारत सरकारच्या अधिकृत BIS नियमांनुसार अचूक हॉलमार्क लेझर-अंकित केलेला असतो. शुद्धतेची खात्री करूनच ग्राहकांच्या हाती सुवर्ण देणे ही आमची १९५१ पासूनची परंपरा आहे.'
            : 'Every gold ornament at Wafgaonkar Laxmi Jewellers is laser-inscribed with the mandatory 3-point BIS Hallmark certification, ensuring absolute purity and investment security.'}
        </p>
      </div>

      {/* 02. VISUAL ENGRAVED HALLMARK STRIP PREVIEW */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#3C0015] via-[#500018] to-[#3C0015] p-6 sm:p-10 border-2 border-[#D7B95F]/60 shadow-xl overflow-hidden mb-12 text-[#F3F0EA]">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#D7B95F_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Explainer */}
          <div className="max-w-md text-left space-y-2">
            <span className="text-[11px] font-cinzel tracking-widest text-[#D7B95F] uppercase font-bold">
              {isMr ? 'दागिन्यावरील अस्सल हॉलमार्क लेझर मोहर' : 'LASER-ENGRAVED HALLMARK STAMP'}
            </span>
            <h3 className="font-marathi-display text-xl sm:text-2xl font-bold text-[#FAF8F4]">
              {isMr ? 'प्रत्येक दागिन्यावर हे ३ शिक्के तपासा' : 'Check These 3 Seals On Your Jewellery'}
            </h3>
            <p className="font-marathi-serif text-xs sm:text-sm text-[#FAF8F4]/80 leading-relaxed">
              {isMr
                ? 'आमच्या दालनातील प्रत्येक वधू साज, ठुशी, हार अथवा अंगठीवर सूक्ष्म भिंगाने (Magnifier) पाहिल्यास ही ३ अधिकृत चिन्हे स्पष्ट दिसतात.'
                : 'Inspect the inner band or clasp of our jewellery with a loupe to discover these 3 pristine hallmarks.'}
            </p>
          </div>

          {/* Right: The Realistic Visual Stamp Plate */}
          <div className="w-full lg:w-auto flex-grow max-w-xl bg-[#20000B]/90 border border-[#D7B95F]/50 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xs">
            <div className="flex items-center justify-around gap-3 sm:gap-6 flex-wrap">
              
              {/* Mark 1: BIS Triangular Logo */}
              <div className="text-center space-y-2 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#3C0015] border border-[#D7B95F]/60 flex items-center justify-center p-2 group-hover:scale-105 transition-transform shadow-md">
                  <svg viewBox="0 0 100 90" className="w-full h-full text-[#D7B95F]" fill="currentColor">
                    <polygon points="50,8 92,82 8,82" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
                    <polygon points="50,26 78,74 22,74" fill="currentColor" opacity="0.3" />
                    <text x="50" y="65" textAnchor="middle" fill="currentColor" fontSize="20" fontFamily="Cinzel, serif" fontWeight="bold">BIS</text>
                  </svg>
                </div>
                <div className="text-[11px] font-marathi-serif font-bold text-[#D7B95F]">
                  {isMr ? '१. BIS मार्क' : '1. BIS Mark'}
                </div>
              </div>

              {/* Plus Divider */}
              <span className="text-[#D7B95F]/60 text-lg font-bold select-none">+</span>

              {/* Mark 2: Purity Karat */}
              <div className="text-center space-y-2 group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#3C0015] border border-[#D7B95F]/60 flex flex-col items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                  <span className="font-cinzel text-xs sm:text-sm font-bold text-[#D7B95F]">22K</span>
                  <span className="font-cinzel text-base sm:text-lg font-black tracking-wider text-[#FAF8F4]">916</span>
                </div>
                <div className="text-[11px] font-marathi-serif font-bold text-[#D7B95F]">
                  {isMr ? '२. शुद्धता (916)' : '2. Purity (916)'}
                </div>
              </div>

              {/* Plus Divider */}
              <span className="text-[#D7B95F]/60 text-lg font-bold select-none">+</span>

              {/* Mark 3: 6-Digit Alphanumeric HUID */}
              <div className="text-center space-y-2 group">
                <div className="w-24 sm:w-28 h-16 sm:h-20 rounded-xl bg-[#3C0015] border border-[#D7B95F]/60 flex flex-col items-center justify-center p-2 group-hover:scale-105 transition-transform shadow-md">
                  <span className="text-[9px] uppercase tracking-widest text-[#D7B95F]/80 font-cinzel">HUID CODE</span>
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#FAF8F4] mt-0.5">WL8951</span>
                </div>
                <div className="text-[11px] font-marathi-serif font-bold text-[#D7B95F]">
                  {isMr ? '३. ६-अंकी HUID' : '3. 6-Digit HUID'}
                </div>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-[#D7B95F]/20 flex items-center justify-between text-[11px] text-[#FAF8F4]/80">
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#D7B95F]" />
                <span>{isMr ? 'सर्व दागिन्यांवर सरकारी हॉलमार्क अनिवार्य' : 'Government Hallmarked Jewellery Only'}</span>
              </span>
              <span className="font-cinzel font-semibold text-[#D7B95F]">WLJ • SINCE 1951</span>
            </div>
          </div>

        </div>
      </div>

      {/* 03. 3 HALLMARK PILLARS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {hallmarkComponents.map((comp) => (
          <div
            key={comp.step}
            className="bg-[#FAF8F4] rounded-2xl p-6 sm:p-7 border border-[#D7B95F]/35 shadow-xs hover:border-[#D7B95F] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[#3C0015]/10 border border-[#D7B95F]/30">
                  {comp.icon}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#3C0015] text-[#D7B95F] text-[11px] font-cinzel font-bold tracking-wider">
                  {isMr ? comp.badgeMr : comp.badgeEn}
                </span>
              </div>

              <h4 className="font-marathi-display text-lg sm:text-xl font-bold text-[#3C0015] mb-2">
                {isMr ? comp.titleMr : comp.titleEn}
              </h4>

              <p className="font-marathi-serif text-xs sm:text-sm text-[#766A61] leading-relaxed">
                {isMr ? comp.descMr : comp.descEn}
              </p>
            </div>

            <div className="pt-3 border-t border-[#D7B95F]/20 text-[11px] font-marathi-serif font-semibold text-[#3C0015] flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D7B95F]" />
              <span>{isMr ? '१००% पडताळणीकृत हमी' : 'Verified Purity Standard'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 04. HOW TO VERIFY ON BIS CARE APP (Interactive 3-Step Guide) */}
      <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-10 border border-[#D7B95F]/35 shadow-xs mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-3.5 text-left">
            <div className="inline-flex items-center space-x-1.5 text-[#D7B95F] font-cinzel text-xs uppercase tracking-widest font-bold">
              <Smartphone className="w-4 h-4 text-[#D7B95F]" />
              <span>BIS CARE APP VERIFICATION</span>
            </div>
            
            <h3 className="font-marathi-display text-2xl sm:text-3xl font-bold text-[#3C0015] leading-snug">
              {isMr ? 'दागिन्यांचा HUID स्वतः कसा तपासावा?' : 'How to Verify HUID on BIS Care App'}
            </h3>
            
            <p className="font-marathi-serif text-xs sm:text-sm text-[#766A61] leading-relaxed">
              {isMr
                ? 'भारत सरकारच्या अधिकृत ‘BIS Care App’ द्वारे ग्राहक कोणत्याही दागिन्यावरील ६-अंकी HUID कोड टाकून हॉलमार्किंग केंद्र, ज्वेलर्स नोंदणी आणि अचूक शुद्धता त्वरित स्वतः पडताळू शकतात.'
                : 'Download the Govt. of India’s official BIS Care App and enter the 6-character HUID engraved on your ornament to verify jeweller credentials, assaying date, and purity grade.'}
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="https://play.google.com/store/apps/details?id=com.bis.biscare"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#3C0015] text-[#F3F0EA] hover:bg-[#500018] text-xs font-marathi-serif font-bold transition-all shadow-xs border border-[#D7B95F]/40"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#D7B95F]" />
                <span>{isMr ? 'BIS Care App डाउनलोड करा' : 'Download BIS Care App'}</span>
                <ExternalLink className="w-3 h-3 text-[#D7B95F]" />
              </a>

              <a
                href={`https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  isMr
                    ? 'नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला दागिन्यांच्या हॉलमार्क व शुद्धतेविषयी माहिती हवी आहे.'
                    : 'Hello Wafgaonkar Laxmi Jewellers, I would like guidance on hallmark purity and HUID verification.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FAF8F4] text-[#3C0015] hover:bg-[#F3F0EA] text-xs font-marathi-serif font-bold transition-all border border-[#D7B95F]/40"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D7B95F]" />
                <span>{isMr ? 'तज्ज्ञांशी बोला' : 'Ask Jewellery Expert'}</span>
              </a>
            </div>
          </div>

          {/* 3 Step Timeline Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D7B95F]/30 shadow-xs space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#3C0015] text-[#D7B95F] font-cinzel font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h5 className="font-marathi-serif font-bold text-sm text-[#3C0015]">
                {isMr ? 'HUID शोधा' : 'Locate HUID'}
              </h5>
              <p className="font-marathi-serif text-xs text-[#766A61] leading-relaxed">
                {isMr
                  ? 'दागिन्याच्या आतल्या बाजूला किंवा कडीवर ६-अंकी कोड पहा.'
                  : 'Find the 6-character alphanumeric code on your jewellery.'}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D7B95F]/30 shadow-xs space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#3C0015] text-[#D7B95F] font-cinzel font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h5 className="font-marathi-serif font-bold text-sm text-[#3C0015]">
                {isMr ? 'App मध्ये टाका' : 'Enter in BIS App'}
              </h5>
              <p className="font-marathi-serif text-xs text-[#766A61] leading-relaxed">
                {isMr
                  ? '‘Verify HUID’ पर्याय निवडून ६ अक्षरी कोड प्रविष्ट करा.'
                  : 'Open BIS Care App and enter the code in ‘Verify HUID’ section.'}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D7B95F]/30 shadow-xs space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#3C0015] text-[#D7B95F] font-cinzel font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h5 className="font-marathi-serif font-bold text-sm text-[#3C0015]">
                {isMr ? 'सरकारी हमी पहा' : 'View Purity Proof'}
              </h5>
              <p className="font-marathi-serif text-xs text-[#766A61] leading-relaxed">
                {isMr
                  ? 'दागिन्याचे वजन, कॅरेट व वाफगावकर लक्ष्मी ज्वेलर्सचे नाव स्क्रीनवर दिसेल.'
                  : 'Instant display of purity, hallmarking center & registration.'}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 05. OFFICIAL PURITY STANDARDS CHART */}
      <div className="bg-[#FAF8F4] rounded-3xl p-6 sm:p-10 border border-[#D7B95F]/35 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D7B95F]/25 gap-3 mb-6">
          <div>
            <h3 className="font-marathi-display text-xl sm:text-2xl font-bold text-[#3C0015]">
              {isMr ? 'सुवर्ण व रौप्य शुद्धता प्रमाण तक्ता' : 'Gold & Silver Purity Standards'}
            </h3>
            <p className="font-marathi-serif text-xs text-[#766A61] mt-0.5">
              {isMr ? 'भारत सरकारमान्य BIS मानकांनुसार शुद्धतेचे वर्गीकरण' : 'Classified as per Bureau of Indian Standards specifications'}
            </p>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            {purityTable.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedPurityTab(t.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-marathi-serif font-bold transition-all whitespace-nowrap ${
                  selectedPurityTab === t.id
                    ? 'bg-[#3C0015] text-[#F3F0EA] shadow-xs'
                    : 'bg-white text-[#29231F] border border-[#D7B95F]/30 hover:bg-[#F3F0EA]'
                }`}
              >
                {isMr ? t.purityMr.split(' ')[0] + ' ' + t.purityMr.split(' ')[1] : t.purityEn.split(' ')[0] + ' ' + t.purityEn.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Purity Card Display */}
        {(() => {
          const activePurity = purityTable.find((p) => p.id === selectedPurityTab) || purityTable[0];
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 bg-white p-5 sm:p-6 rounded-2xl border border-[#D7B95F]/30">
              <div className="space-y-1">
                <span className="text-[11px] text-[#766A61] uppercase tracking-wider font-cinzel font-semibold block">
                  {isMr ? 'कॅरेट व हॉलमार्क ग्रेड' : 'Karat & Hallmark Grade'}
                </span>
                <div className="font-marathi-display text-xl sm:text-2xl font-bold text-[#3C0015]">
                  {isMr ? activePurity.purityMr : activePurity.purityEn}
                </div>
                <div className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-[#3C0015]/10 text-[#3C0015] font-marathi-serif text-xs font-bold border border-[#D7B95F]/40">
                  {isMr ? activePurity.goldContentMr : activePurity.goldContentEn}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-[#766A61] uppercase tracking-wider font-cinzel font-semibold block">
                  {isMr ? 'कोणत्या दागिन्यांसाठी योग्य?' : 'Ideal For Jewellery'}
                </span>
                <p className="font-marathi-serif text-xs sm:text-sm text-[#29231F] font-medium leading-relaxed">
                  {isMr ? activePurity.useMr : activePurity.useEn}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-[#766A61] uppercase tracking-wider font-cinzel font-semibold block">
                  {isMr ? 'गुणवत्ता व टिकाऊपण' : 'Quality & Durability'}
                </span>
                <p className="font-marathi-serif text-xs sm:text-sm text-[#766A61] leading-relaxed">
                  {isMr ? activePurity.standardMr : activePurity.standardEn}
                </p>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};
