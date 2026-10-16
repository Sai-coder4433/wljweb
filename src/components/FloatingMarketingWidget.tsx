import React, { useState, useEffect, useRef } from 'react';
import { Megaphone, X, Instagram, Facebook, MessageCircle, Phone } from 'lucide-react';
import { BRAND_CONFIG } from '../config';
import { Language } from '../types';

interface FloatingMarketingWidgetProps {
  currentLang: Language;
}

export const FloatingMarketingWidget: React.FC<FloatingMarketingWidgetProps> = ({ currentLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMr = currentLang === 'mr';

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const whatsappMessage = encodeURIComponent(
    isMr
      ? 'नमस्कार वाफगांवकर लक्ष्मी ज्वेलर्स, मला दागिन्यांची माहिती, आजचे सोन्याचे दर व विशेष ऑफर्स जाणून घ्यायच्या आहेत.'
      : 'Hello Wafgaonkar Laxmi Jewellers, I would like information regarding your jewellery catalogue, current gold rates, and special offers.'
  );

  const actions = [
    {
      id: 'instagram',
      name: 'Instagram (IG)',
      emoji: '📸',
      icon: Instagram,
      bgClass: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white hover:brightness-110 shadow-md',
      labelMr: 'इन्स्टाग्रामवर फॉलो करा',
      labelEn: 'Follow on Instagram',
      href: 'https://instagram.com',
      isExternal: true,
    },
    {
      id: 'facebook',
      name: 'Facebook (FB)',
      emoji: '👤',
      icon: Facebook,
      bgClass: 'bg-[#1877F2] text-white hover:bg-[#166fe5] shadow-md',
      labelMr: 'फेसबुकवर भेट द्या',
      labelEn: 'Visit on Facebook',
      href: 'https://facebook.com',
      isExternal: true,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp (WP)',
      emoji: '💬',
      icon: MessageCircle,
      bgClass: 'bg-[#25D366] text-white hover:bg-[#20ba59] shadow-md',
      labelMr: 'व्हॉट्सॲपवर चॅट करा',
      labelEn: 'Chat on WhatsApp',
      href: `https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${whatsappMessage}`,
      isExternal: true,
    },
    {
      id: 'call',
      name: 'Call (कॉल)',
      emoji: '📞',
      icon: Phone,
      bgClass: 'bg-[#3C0015] border border-[#D7B95F] text-[#D7B95F] hover:bg-[#500018] shadow-md',
      labelMr: 'थेट कॉल करा (8888179999)',
      labelEn: 'Call Us (8888179999)',
      href: `tel:${BRAND_CONFIG.PHONE_NUMBER}`,
      isExternal: false,
    },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* EXPANDED 4 OPTIONS POPUP (Opens upward above the button) */}
      {isOpen && (
        <div className="mb-3 flex flex-col items-end space-y-2.5 animate-in slide-in-from-bottom-4 fade-in duration-200">
          
          {/* Mini header badge */}
          <div className="px-3 py-1 rounded-full bg-[#3C0015]/95 text-[#D7B95F] border border-[#D7B95F]/50 text-[11px] font-marathi-serif font-bold tracking-wide shadow-lg backdrop-blur-xs flex items-center space-x-1.5 select-none">
            <span>📢</span>
            <span>{isMr ? 'सोशल मीडिया व थेट संपर्क' : 'Connect & Enquire'}</span>
          </div>

          {/* 4 Action Buttons */}
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <a
                key={act.id}
                href={act.href}
                target={act.isExternal ? '_blank' : '_self'}
                rel={act.isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
                className="group flex items-center space-x-2.5 cursor-pointer transition-transform duration-200 hover:scale-105"
                title={isMr ? act.labelMr : act.labelEn}
              >
                {/* Floating Tooltip Label */}
                <span className="px-2.5 py-1 rounded-lg bg-white/95 text-[#29231F] text-xs font-marathi-serif font-bold shadow-md border border-[#D7B95F]/35 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                  {isMr ? act.labelMr : act.labelEn}
                </span>

                {/* Circular Button */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${act.bgClass}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </a>
            );
          })}

        </div>
      )}

      {/* MAIN MARKETING BHONGA / SPEAKER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isMr ? 'सोशल मीडिया व संपर्क' : 'Social Media & Contact'}
        className={`relative p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer border-2 ${
          isOpen
            ? 'bg-[#500018] text-[#F3F0EA] border-[#D7B95F] rotate-90 scale-100'
            : 'bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] border-[#D7B95F] hover:scale-110'
        }`}
      >
        {/* Subtle attention-grabbing pulse ring when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#D7B95F] opacity-35 animate-ping pointer-events-none" />
        )}

        {isOpen ? (
          <X className="w-6 h-6 text-[#D7B95F]" />
        ) : (
          <div className="relative flex items-center justify-center">
            {/* Marketing Bhonga (Megaphone 📢) Icon */}
            <Megaphone className="w-6 h-6 text-[#D7B95F] transform -rotate-12 group-hover:rotate-0 transition-transform" />
            
            {/* Small 4-dots indicator badge */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#25D366] border-2 border-[#3C0015] rounded-full" />
          </div>
        )}
      </button>

    </div>
  );
};
