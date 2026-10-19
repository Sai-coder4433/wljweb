import React, { useState, useEffect } from 'react';
import { Search, Heart, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { Language } from '../types';

interface HeaderProps {
  currentLang: Language;
  onToggleLang: () => void;
  wishlistCount: number;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenStoreLocator: () => void;
  onSelectCategory: (categorySlug: string) => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  wishlistCount,
  onOpenSearch,
  onOpenWishlist,
  onOpenStoreLocator,
  onSelectCategory,
  onNavigate,
  currentView,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);

  const isMr = currentLang === 'mr';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const collectionCategories = [
    { name: isMr ? 'सर्व दागिने संग्रह' : 'All Collections', slug: 'all' },
    { name: isMr ? 'शाही वधू संग्रह' : 'Bridal Collection', slug: 'gold' },
    { name: isMr ? 'पारंपरिक महाराष्ट्रीयन साज' : 'Traditional Heritage', slug: 'necklaces' },
    { name: isMr ? 'मंगळसूत्र संग्रह' : 'Mangalsutra Collection', slug: 'mangalsutra' },
    { name: isMr ? 'बांगड्या व तोडे' : 'Bangles & Tode', slug: 'bangles' },
    { name: isMr ? 'कर्णफुले व बुगडी' : 'Earrings & Jhumkas', slug: 'earrings' },
    { name: isMr ? 'अंगठ्या व मुद्रिका' : 'Rings & Mudrika', slug: 'rings' },
    { name: isMr ? 'शुद्ध चांदी संग्रह' : 'Silver Articles', slug: 'silver' },
  ];

  const handleNavClick = (view: string, elementId?: string) => {
    setMobileMenuOpen(false);
    if (view === 'home' && !elementId) {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (view === 'collections') {
      onSelectCategory('all');
      onNavigate('catalogue');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (elementId) {
      // If currently not on home view, first navigate to home then scroll
      if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`w-full transition-all duration-300 relative z-50 ${
        isScrolled
          ? 'bg-[#F3F0EA] py-2 sm:py-2.5 border-b border-[#D7B95F]/35 shadow-sm'
          : 'bg-[#F3F0EA]/98 backdrop-blur-xs py-3.5 lg:py-4 border-b border-[#D7B95F]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 flex items-center justify-between gap-2">
        
        {/* LEFT: Official Wafgaonkar Laxmi Jewellers Logo with accurate Marathi typography */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="cursor-pointer flex items-center flex-shrink min-w-0"
        >
          <BrandLogo variant="dark" size={isScrolled ? 'sm' : 'md'} showSubtitle={true} />
        </div>

        {/* CENTER: Exact Mandated Clean Navigation: Home, Collections, Our Legacy, Gallery, Testimonials, Visit Us, Contact */}
        <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-[13.5px] font-medium text-[#29231F]">
          
          {/* 1. Home (मुख्यपृष्ठ) */}
          <button
            onClick={() => handleNavClick('home')}
            className={`font-marathi-serif tracking-wide transition-colors py-1 relative cursor-pointer ${
              currentView === 'home' ? 'text-[#3C0015] font-bold' : 'hover:text-[#3C0015]'
            }`}
          >
            {isMr ? 'मुख्यपृष्ठ' : 'Home'}
            {currentView === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D7B95F]" />
            )}
          </button>

          {/* 2. Collections (संग्रह) - with prominent frontside dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setCollectionsDropdownOpen(true)}
            onMouseLeave={() => setCollectionsDropdownOpen(false)}
          >
            <button
              onClick={() => handleNavClick('collections')}
              className={`flex items-center space-x-1 font-marathi-serif font-bold text-sm tracking-wide py-1 transition-colors relative cursor-pointer ${
                currentView === 'catalogue' ? 'text-[#3C0015]' : 'text-[#29231F] hover:text-[#3C0015]'
              }`}
            >
              <span>{isMr ? 'संग्रह' : 'Collections'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              {currentView === 'catalogue' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D7B95F]" />
              )}
            </button>

            {collectionsDropdownOpen && (
              <div className="absolute top-[calc(100%+6px)] left-0 w-68 bg-[#FAF8F4] border-2 border-[#D7B95F] shadow-2xl rounded-2xl z-[100] animate-in fade-in zoom-in-95 duration-150 text-left overflow-hidden">
                <div className="px-4 py-2 border-b border-[#D7B95F]/30 bg-[#FAF0D8]/70 flex items-center justify-between">
                  <span className="text-[11px] font-serif font-bold text-[#3C0015] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#A37B30]" />
                    {isMr ? 'दागिने संग्रह' : 'Jewellery Collections'}
                  </span>
                  <span className="text-[10px] text-[#A37B30] font-cinzel font-bold">WLJ</span>
                </div>
                <div className="py-1">
                  {collectionCategories.map((item, idx) => (
                    <button
                      key={item.slug}
                      onClick={() => {
                        onSelectCategory(item.slug);
                        onNavigate('catalogue');
                        setCollectionsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-xs font-marathi-serif transition-all flex items-center justify-between cursor-pointer group ${
                        idx === 0
                          ? 'font-bold text-[#3C0015] bg-[#FAF0D8]/40 hover:bg-[#3C0015] hover:text-[#E0C068]'
                          : 'font-semibold text-[#29231F] hover:bg-[#3C0015] hover:text-[#E0C068]'
                      }`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-[#A37B30] group-hover:text-[#E0C068] group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Our Legacy (वारसा व परंपरा) */}
          <button
            onClick={() => handleNavClick('home', 'heritage-story-section')}
            className="font-marathi-serif tracking-wide hover:text-[#3C0015] transition-colors py-1 cursor-pointer"
          >
            {isMr ? 'वारसा व परंपरा' : 'Our Legacy'}
          </button>



          {/* 5. Testimonials (ग्राहकांचे अनुभव) */}
          <button
            onClick={() => handleNavClick('home', 'testimonials-section')}
            className="font-marathi-serif tracking-wide hover:text-[#3C0015] transition-colors py-1 cursor-pointer"
          >
            {isMr ? 'ग्राहकांचे अनुभव' : 'Testimonials'}
          </button>

          {/* 6. Visit Us (भेट द्या) */}
          <button
            onClick={() => handleNavClick('home', 'visit-store-section')}
            className="font-marathi-serif tracking-wide hover:text-[#3C0015] transition-colors py-1 cursor-pointer"
          >
            {isMr ? 'भेट द्या' : 'Visit Us'}
          </button>

          {/* 7. Contact (संपर्क) */}
          <button
            onClick={() => handleNavClick('home', 'contact-section')}
            className="font-marathi-serif tracking-wide hover:text-[#3C0015] transition-colors py-1 cursor-pointer"
          >
            {isMr ? 'संपर्क' : 'Contact'}
          </button>
        </nav>

        {/* RIGHT: Search, Wishlist, Language Switch */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 text-[#29231F] flex-shrink-0">
          
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#D7B95F]/15 text-[#29231F] hover:text-[#3C0015] transition-colors cursor-pointer"
            aria-label="Search jewellery"
            title={isMr ? 'दागिने शोधा' : 'Search catalogue'}
          >
            <Search className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#D7B95F]/15 text-[#29231F] hover:text-[#3C0015] transition-colors relative cursor-pointer"
            aria-label="Wishlist"
            title={isMr ? 'पसंतीचे दागिने' : 'Wishlist'}
          >
            <Heart className="w-4 h-4 md:w-4.5 md:h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#3C0015] text-[#FAF8F4] text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Language Switch: मराठी | English */}
          <button
            onClick={onToggleLang}
            className="hidden sm:flex items-center px-2.5 py-1 rounded-full text-xs font-marathi-serif text-[#766A61] hover:text-[#3C0015] border border-[#D7B95F]/35 transition-colors ml-1 cursor-pointer bg-white"
          >
            <span className={isMr ? 'font-bold text-[#3C0015]' : ''}>मराठी</span>
            <span className="mx-1 text-[#D7B95F]/60">|</span>
            <span className={!isMr ? 'font-bold text-[#3C0015]' : ''}>English</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-[#29231F] hover:bg-[#D7B95F]/15 ml-0.5 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F4] border-t border-[#D7B95F]/30 px-6 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200 text-left font-marathi-serif">
          <div className="space-y-3.5">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left py-1.5 text-base font-bold text-[#3C0015] border-b border-[#D7B95F]/20"
            >
              {isMr ? 'मुख्यपृष्ठ' : 'Home'}
            </button>

            <button
              onClick={() => handleNavClick('collections')}
              className="block w-full text-left py-1.5 text-sm font-semibold text-[#29231F] hover:text-[#3C0015]"
            >
              {isMr ? 'दागिने संग्रह (कॅटलॉग)' : 'Collections Catalogue'}
            </button>

            <button
              onClick={() => handleNavClick('home', 'heritage-story-section')}
              className="block w-full text-left py-1.5 text-sm font-semibold text-[#29231F] hover:text-[#3C0015]"
            >
              {isMr ? 'वारसा व परंपरा (Since 1951)' : 'Our Legacy (Since 1951)'}
            </button>



            <button
              onClick={() => handleNavClick('home', 'testimonials-section')}
              className="block w-full text-left py-1.5 text-sm font-semibold text-[#29231F] hover:text-[#3C0015]"
            >
              {isMr ? 'ग्राहकांचे मनोगत (Testimonials)' : 'Customer Testimonials'}
            </button>

            <button
              onClick={() => handleNavClick('home', 'visit-store-section')}
              className="block w-full text-left py-1.5 text-sm font-semibold text-[#29231F] hover:text-[#3C0015]"
            >
              {isMr ? 'दालनाला भेट द्या (चाकण)' : 'Visit Our Showroom (Chakan)'}
            </button>

            <button
              onClick={() => handleNavClick('home', 'contact-section')}
              className="block w-full text-left py-1.5 text-sm font-semibold text-[#29231F] hover:text-[#3C0015]"
            >
              {isMr ? 'संपर्क व फोन' : 'Contact Us'}
            </button>

            <div className="pt-3 border-t border-[#D7B95F]/20 flex items-center justify-between">
              <span className="text-xs text-[#766A61]">{isMr ? 'भाषा बदला:' : 'Change Language:'}</span>
              <button
                onClick={onToggleLang}
                className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-[#D7B95F]/40 text-[#3C0015]"
              >
                {isMr ? 'English मध्ये पहा' : 'मराठी मध्ये पहा'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
