import React from 'react';
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

  return (
    <footer className="bg-[#3F1C46] text-[#F3F0EA] pt-14 pb-10 border-t border-[#D7B95F]/35 text-left">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 4 COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#D7B95F]/25">
          
          {/* COL 1: Official logo + Short heritage line + Since 1951 (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" size="md" showSubtitle={true} />
            <p className="font-marathi-serif text-sm text-[#BDA9C4] leading-relaxed max-w-sm pt-1">
              {isMr 
                ? '“१९५१ पासून विश्वासाची परंपरा — शुद्ध सुवर्ण, अस्सल कारागिरी आणि अखंड कौटुंबिक स्नेह.”' 
                : '“A tradition of trust since 1951 — authentic craftsmanship, pure gold, and enduring family bond.”'}
            </p>
          </div>

          {/* COL 2: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-marathi-display text-sm font-bold text-[#D7B95F] tracking-wider uppercase">
              {isMr ? 'महत्त्वाचे दुवे' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs font-marathi-serif text-[#BDA9C4]">
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
                  {isMr ? 'दागिने' : 'Jewellery'}
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
                  {isMr ? 'संग्रह' : 'Collections'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    scrollToTop();
                  }}
                  className="hover:text-[#D7B95F] transition-colors"
                >
                  {isMr ? 'आमच्याविषयी' : 'About Us'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStoreLocator}
                  className="hover:text-[#D7B95F] transition-colors"
                >
                  {isMr ? 'संपर्क' : 'Contact'}
                </button>
              </li>
            </ul>
          </div>

          {/* COL 3: 8 Mandated Jewellery Categories (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-marathi-display text-sm font-bold text-[#D7B95F] tracking-wider uppercase">
              {isMr ? 'दागिने श्रेणी' : 'Categories'}
            </h4>
            <ul className="space-y-1.5 text-xs font-marathi-serif text-[#BDA9C4]">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('gold');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'सोन्याचे दागिने' : 'Gold Jewellery'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('diamond');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'हिऱ्यांचे दागिने' : 'Diamond Jewellery'}
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
                  {isMr ? 'मंगळसूत्र' : 'Mangalsutra'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('necklaces');
                    onNavigate('catalogue');
                    scrollToTop();
                  }}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  {isMr ? 'हार' : 'Haar'}
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
                  {isMr ? 'कर्णफुले' : 'Karnaphule'}
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
                  {isMr ? 'बांगड्या' : 'Bangles'}
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
                  {isMr ? 'अंगठ्या' : 'Rings'}
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
                  {isMr ? 'चांदीचे दागिने' : 'Silver Jewellery'}
                </button>
              </li>
            </ul>
          </div>

          {/* COL 4: Showroom & Contact (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-marathi-display text-sm font-bold text-[#D7B95F] tracking-wider uppercase">
              {isMr ? 'दालन व संपर्क (चाकण)' : 'Showrooms & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs font-marathi-serif text-[#BDA9C4]">
              <div className="pb-1 border-b border-[#D7B95F]/20">
                <span className="text-[#D7B95F] font-bold block">{isMr ? 'शाखा क्र. १ (मुख्य पेढी):' : 'Branch 1 (Main Pedhi):'}</span>
                <p className="text-[#F3F0EA] mt-0.5">
                  {isMr ? BRAND_CONFIG.store.branch1.addressMarathi : BRAND_CONFIG.store.branch1.addressEnglish}
                </p>
              </div>

              <div className="pb-1 border-b border-[#D7B95F]/20">
                <span className="text-[#D7B95F] font-bold block">{isMr ? 'शाखा क्र. २ (माणिक चौक):' : 'Branch 2 (Manik Chowk):'}</span>
                <p className="text-[#F3F0EA] mt-0.5">
                  {isMr ? BRAND_CONFIG.store.branch2.addressMarathi : BRAND_CONFIG.store.branch2.addressEnglish}
                </p>
              </div>

              <p className="pt-0.5">
                <span className="text-[#D7B95F] font-semibold">{isMr ? 'फोन / व्हॉट्सॲप:' : 'Phone / WhatsApp:'}</span>{' '}
                <a href={`tel:${BRAND_CONFIG.PHONE_NUMBER}`} className="hover:text-[#FAF8F4] transition-colors font-cinzel font-bold text-[#FAF8F4]">
                  {BRAND_CONFIG.PHONE_NUMBER}
                </a>
              </p>
              <p className="text-[#BDA9C4] leading-normal">
                <span className="text-[#D7B95F] block font-semibold">{isMr ? 'दालनाची वेळ:' : 'Hours:'}</span>
                {isMr ? BRAND_CONFIG.store.hoursMarathi : BRAND_CONFIG.store.hoursEnglish}
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#BDA9C4] font-marathi-serif gap-3">
          <p>
            {isMr
              ? '© २०२६ वाफगावकर लक्ष्मी ज्वेलर्स. सर्व हक्क सुरक्षित.'
              : '© 2026 Wafgaonkar Laxmi Jewellers. All rights reserved.'}
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-[11px] font-cinzel text-[#D7B95F]/80 tracking-widest uppercase">
              SINCE 1951 • PURE TRADITION
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
