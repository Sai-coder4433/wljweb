import React, { useState, useEffect } from 'react';
import { Search, Heart, Menu, X, ChevronDown } from 'lucide-react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isMr = currentLang === 'mr';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jewelleryCategories = [
    { name: isMr ? 'सर्व दागिने' : 'All Jewellery', slug: 'all' },
    { name: isMr ? 'सोन्याचे दागिने' : 'Gold Jewellery', slug: 'gold' },
    { name: isMr ? 'मंगळसूत्र' : 'Mangalsutra', slug: 'mangalsutra' },
    { name: isMr ? 'हार' : 'Necklaces & Haar', slug: 'necklaces' },
    { name: isMr ? 'कर्णफुले' : 'Earrings & Jhumkas', slug: 'earrings' },
    { name: isMr ? 'बांगड्या व पाटल्या' : 'Bangles & Patlya', slug: 'bangles' },
    { name: isMr ? 'अंगठ्या' : 'Rings', slug: 'rings' },
    { name: isMr ? 'चांदीचे दागिने' : 'Silver Jewellery', slug: 'silver' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F1E6] py-2.5 border-b border-[#D4AF37]/30 shadow-xs'
          : 'bg-[#F7F1E6]/95 backdrop-blur-xs py-3.5 border-b border-[#D4AF37]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 flex items-center justify-between gap-2">
        
        {/* LEFT: Official Wafgaonkar Laxmi Jewellers logo + Since 1951 */}
        <div 
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="cursor-pointer flex items-center flex-shrink min-w-0"
        >
          <BrandLogo variant="dark" size={isScrolled ? 'sm' : 'md'} />
        </div>

        {/* CENTER: Marathi Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-[14px] font-medium text-[#2F2521]">
          {/* मुख्यपृष्ठ */}
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-marathi-serif tracking-wide transition-colors py-1 relative ${
              currentView === 'home' ? 'text-[#4B0F1A] font-bold' : 'hover:text-[#4B0F1A]'
            }`}
          >
            {isMr ? 'मुख्यपृष्ठ' : 'Home'}
            {currentView === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"></span>
            )}
          </button>

          {/* दागिने (Dropdown for categories) */}
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('catalogue');
              }}
              className={`flex items-center space-x-1 font-marathi-serif tracking-wide py-1 transition-colors ${
                currentView === 'catalogue' ? 'text-[#4B0F1A] font-bold' : 'hover:text-[#4B0F1A]'
              }`}
            >
              <span>{isMr ? 'दागिने' : 'Jewellery'}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 w-60 bg-[#FCF8F1] border border-[#D4AF37]/35 shadow-md rounded-xl py-2 z-50 animate-in fade-in duration-150 text-left">
                {jewelleryCategories.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => {
                      onSelectCategory(item.slug);
                      onNavigate('catalogue');
                      setDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-xs font-marathi-serif text-[#2F2521] hover:bg-[#F7F1E6] hover:text-[#4B0F1A] transition-colors flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] text-[#D4AF37]">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* संग्रह */}
          <button
            onClick={() => {
              onSelectCategory('all');
              onNavigate('catalogue');
            }}
            className="font-marathi-serif tracking-wide hover:text-[#4B0F1A] transition-colors py-1"
          >
            {isMr ? 'संग्रह' : 'Collections'}
          </button>

          {/* आमच्याविषयी */}
          <button
            onClick={() => onNavigate('about')}
            className="font-marathi-serif tracking-wide hover:text-[#4B0F1A] transition-colors py-1"
          >
            {isMr ? 'आमच्याविषयी' : 'About Us'}
          </button>

          {/* संपर्क */}
          <button
            onClick={onOpenStoreLocator}
            className="font-marathi-serif tracking-wide hover:text-[#4B0F1A] transition-colors py-1"
          >
            {isMr ? 'संपर्क' : 'Contact'}
          </button>
        </nav>

        {/* RIGHT: Search, Wishlist, Language Switch (Strictly NO Cart) */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 text-[#2F2521] flex-shrink-0">
          
          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#2F2521]/5 text-[#2F2521] hover:text-[#4B0F1A] transition-colors"
            aria-label="Search jewellery"
            title={isMr ? 'दागिने शोधा' : 'Search catalogue'}
          >
            <Search className="w-4 h-4 md:w-4.5 md:h-4.5" />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#2F2521]/5 text-[#2F2521] hover:text-[#4B0F1A] transition-colors relative"
            aria-label="Wishlist"
            title={isMr ? 'पसंतीचे दागिने' : 'Wishlist'}
          >
            <Heart className="w-4 h-4 md:w-4.5 md:h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#4B0F1A] text-[#F7F1E6] text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Language Switch: मराठी | English */}
          <button
            onClick={onToggleLang}
            className="hidden sm:flex items-center px-2.5 py-1 rounded-full text-xs font-marathi-serif text-[#76685F] hover:text-[#4B0F1A] border border-[#D4AF37]/35 transition-colors ml-1"
          >
            <span className={isMr ? 'font-bold text-[#4B0F1A]' : ''}>मराठी</span>
            <span className="mx-1 text-[#D4AF37]/60">|</span>
            <span className={!isMr ? 'font-bold text-[#4B0F1A]' : ''}>English</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-[#2F2521] hover:bg-[#2F2521]/5 ml-0.5"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU ACCORDION */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCF8F1] border-t border-[#D4AF37]/30 px-6 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200 text-left font-marathi-serif">
          <div className="space-y-3">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="block w-full text-left py-2 text-sm font-semibold text-[#4B0F1A] border-b border-[#D4AF37]/15"
            >
              {isMr ? 'मुख्यपृष्ठ' : 'Home'}
            </button>

            <div className="py-1">
              <span className="block text-xs uppercase tracking-wider text-[#76685F] mb-2 font-bold">
                {isMr ? 'दागिने श्रेणी' : 'Jewellery Categories'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {jewelleryCategories.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => {
                      onSelectCategory(item.slug);
                      onNavigate('catalogue');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left py-1.5 px-2 rounded-md hover:bg-[#F7F1E6] text-[#2F2521]"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigate('catalogue');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#2F2521] border-b border-[#D4AF37]/15"
            >
              {isMr ? 'सर्व संग्रह' : 'All Collections'}
            </button>

            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#2F2521] border-b border-[#D4AF37]/15"
            >
              {isMr ? 'आमच्याविषयी' : 'About Us'}
            </button>

            <button
              onClick={() => {
                onOpenStoreLocator();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm text-[#2F2521] border-b border-[#D4AF37]/15"
            >
              {isMr ? 'संपर्क व दालन' : 'Store & Contact'}
            </button>

            {/* Mobile Language switch */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#76685F]">{isMr ? 'भाषा बदला:' : 'Change Language:'}</span>
              <button
                onClick={onToggleLang}
                className="px-3 py-1 rounded-full border border-[#D4AF37]/40 text-[#4B0F1A] font-semibold"
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
