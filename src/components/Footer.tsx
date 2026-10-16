import React from 'react';
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BRAND_CONFIG } from '../config';
import { Language } from '../types';

interface FooterProps {
  currentLang: Language;
  onNavigate: (view: string) => void;
  onSelectCategory: (categorySlug: string) => void;
  onOpenStoreLocator: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigate,
  onSelectCategory,
  onOpenStoreLocator,
}) => {
  const isMr = currentLang === 'mr';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGeneralWhatsApp = () => {
    const text = encodeURIComponent(
      isMr
        ? 'नमस्कार वाफगांवकर लक्ष्मी ज्वेलर्स, मला दागिन्यांची माहिती व आजचे सोन्याचे दर हवे आहेत.'
        : 'Hello Wafgaonkar Laxmi Jewellers, I would like to inquire about your jewellery catalogue and current gold rates.'
    );
    window.open(`https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <footer id="contact-section" className="velvet-bg text-[#F3F0EA] pt-14 pb-10 border-t border-[#D7B95F]/35 text-left scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 4 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#D7B95F]/25">
          
          {/* COL 1: Official logo + Short heritage line + Since 1951 + Social (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" size="md" showSubtitle={true} />
            <p className="font-marathi-serif text-sm text-[#FAF8F4]/80 leading-relaxed max-w-sm pt-1">
              {isMr 
                ? '“१९५१ पासून विश्वासाची परंपरा — शुद्ध सुवर्ण, अस्सल कारागिरी आणि अखंड कौटुंबिक स्नेह.”' 
                : '“A tradition of trust since 1951 — authentic craftsmanship, pure gold, and enduring family bond.”'}
            </p>

            {/* Social Media & WhatsApp Links */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#500018] border border-[#D7B95F]/40 flex items-center justify-center text-[#D7B95F] hover:bg-[#D7B95F] hover:text-[#3C0015] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#500018] border border-[#D7B95F]/40 flex items-center justify-center text-[#D7B95F] hover:bg-[#D7B95F] hover:text-[#3C0015] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <button
                onClick={handleGeneralWhatsApp}
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-[#500018] border border-[#D7B95F]/40 flex items-center justify-center text-[#D7B95F] hover:bg-[#25D366] hover:text-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* COL 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-marathi-display text-sm font-bold text-[#D7B95F] tracking-wider uppercase">
              {isMr ? 'महत्त्वाचे दुवे' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs font-marathi-serif text-[#FAF8F4]/80">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'मुख्यपृष्ठ' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#D7B95F] transition-colors"
                >
                  {isMr ? 'दागिने कॅटलॉग' : 'Jewellery Catalogue'}
                </button>
              </li>
              <li>
                <a
                  href="#heritage-story-section"
                  className="hover:text-[#D7B95F] transition-colors block"
                >
                  {isMr ? 'वारसा (Since 1951)' : 'Our Legacy'}
                </a>
              </li>
              <li>
                <a
                  href="#hallmark-section"
                  className="hover:text-[#D7B95F] transition-colors block"
                >
                  {isMr ? 'हॉलमार्क शुद्धता (BIS HUID)' : 'BIS Hallmark Guide'}
                </a>
              </li>
              <li>
                <a
                  href="#gallery-section"
                  className="hover:text-[#D7B95F] transition-colors block"
                >
                  {isMr ? 'दागिने गॅलरी' : 'Gallery'}
                </a>
              </li>
              <li>
                <a
                  href="#testimonials-section"
                  className="hover:text-[#D7B95F] transition-colors block"
                >
                  {isMr ? 'ग्राहकांचे अनुभव' : 'Testimonials'}
                </a>
              </li>
              <li>
                <a
                  href="#visit-store-section"
                  className="hover:text-[#D7B95F] transition-colors block"
                >
                  {isMr ? 'दालन दर्शन' : 'Visit Showroom'}
                </a>
              </li>
            </ul>
          </div>

          {/* COL 3: Mandated Jewellery Categories (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-marathi-display text-sm font-bold text-[#D7B95F] tracking-wider uppercase">
              {isMr ? 'दागिने श्रेणी' : 'Categories'}
            </h4>
            <ul className="space-y-1.5 text-xs font-marathi-serif text-[#FAF8F4]/80">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('necklaces');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'हार व चोकर (Haar)' : 'Necklaces (Haar)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('mangalsutra');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'मंगळसूत्र (Mangalsutra)' : 'Mangalsutra'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('earrings');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'कर्णफुले व झुमके (Butti)' : 'Earrings (Butti)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bangles');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'पाटल्या व तोडे (Valya)' : 'Bangles (Valya)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('rings');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'सुवर्ण मुद्रिका (Angathi)' : 'Rings (Angathi)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('nath');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'ब्राह्मणी नथ (Nath)' : 'Nose Pins (Nath)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('silver');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'चांदीचे दागिने (Chandi)' : 'Silver Articles'}
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: Showroom & Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-marathi-display text-sm font-bold text-[#D7B95F] tracking-wider uppercase">
              {isMr ? 'दालन व संपर्क (चाकण)' : 'Showrooms & Contact'}
            </h4>
            <div className="space-y-3 text-xs font-marathi-serif text-[#FAF8F4]/80">
              <div className="pb-1.5 border-b border-[#D7B95F]/20">
                <div className="flex items-start justify-between">
                  <span className="text-[#D7B95F] font-bold block">{isMr ? 'शाखा क्र. १ (जुनी बाजारपेठ):' : 'Branch 1 (Juni Bazarpeth):'}</span>
                  <a
                    href={BRAND_CONFIG.store.branch1.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D7B95F] hover:text-[#FAF8F4] inline-flex items-center space-x-1 text-[11px]"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{isMr ? 'दिशा' : 'Map'}</span>
                  </a>
                </div>
                <p className="text-[#F3F0EA] mt-0.5 leading-relaxed">
                  {isMr ? BRAND_CONFIG.store.branch1.addressMarathi : BRAND_CONFIG.store.branch1.addressEnglish}
                </p>
              </div>

              <div className="pb-1.5 border-b border-[#D7B95F]/20">
                <div className="flex items-start justify-between">
                  <span className="text-[#D7B95F] font-bold block">{isMr ? 'शाखा क्र. २ (माणिक चौक):' : 'Branch 2 (Manik Chowk):'}</span>
                  <a
                    href={BRAND_CONFIG.store.branch2.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D7B95F] hover:text-[#FAF8F4] inline-flex items-center space-x-1 text-[11px]"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>{isMr ? 'दिशा' : 'Map'}</span>
                  </a>
                </div>
                <p className="text-[#F3F0EA] mt-0.5 leading-relaxed">
                  {isMr ? BRAND_CONFIG.store.branch2.addressMarathi : BRAND_CONFIG.store.branch2.addressEnglish}
                </p>
              </div>

              <div className="pt-0.5 space-y-1.5">
                <p className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#D7B95F]" />
                  <span className="text-[#FAF8F4]/80 text-[11px]">{isMr ? 'शाखा १:' : 'Branch 1:'}</span>
                  <a href={`tel:${BRAND_CONFIG.store.branch1.phone}`} className="hover:text-[#FAF8F4] transition-colors font-cinzel font-bold text-[#FAF8F4]">
                    {BRAND_CONFIG.store.branch1.phone}
                  </a>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#D7B95F]" />
                  <span className="text-[#FAF8F4]/80 text-[11px]">{isMr ? 'शाखा २:' : 'Branch 2:'}</span>
                  <a href={`tel:${BRAND_CONFIG.store.branch2.phone}`} className="hover:text-[#FAF8F4] transition-colors font-cinzel font-bold text-[#FAF8F4]">
                    {BRAND_CONFIG.store.branch2.phone}
                  </a>
                </p>
              </div>
              <p className="text-[#FAF8F4]/80 leading-normal flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-[#D7B95F] flex-shrink-0 mt-0.5" />
                <span>{isMr ? BRAND_CONFIG.store.hoursMarathi : BRAND_CONFIG.store.hoursEnglish}</span>
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF8F4]/80 font-marathi-serif gap-3">
          <p>
            {isMr
              ? '© २०२६ वाफगांवकर लक्ष्मी ज्वेलर्स. सर्व हक्क सुरक्षित.'
              : '© 2026 Wafgaonkar Laxmi Jewellers. All rights reserved.'}
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] font-cinzel text-[#D7B95F] tracking-widest uppercase font-semibold">
              SINCE 1951 • शुद्ध सुवर्ण परंपरा
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

