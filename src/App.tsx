import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { MainCategoryCircles } from './components/MainCategoryCircles';
import { MarqueeBanner } from './components/MarqueeBanner';
import { FeaturedCollections } from './components/FeaturedCollections';
import { MaroonEditorialMoment } from './components/MaroonEditorialMoment';
import { FeaturedJewellerySection } from './components/FeaturedJewellerySection';
import { AboutSection } from './components/AboutSection';
import { VisitStoreSection } from './components/VisitStoreSection';
import { Footer } from './components/Footer';

// Luxury Polish Enhancements
import { BrandLoader } from './components/BrandLoader';
import { CustomCursor } from './components/CustomCursor';

// Views & Modals
import { CatalogueView } from './components/CatalogueView';
import { ProductDetailView } from './components/ProductDetailView';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { AboutModal } from './components/AboutModal';

// Data, Types & Config
import { PRODUCTS } from './data/jewelleryData';
import { Product, Language } from './types';
import { BRAND_CONFIG } from './config';



export default function App() {
  // Brand Loading Screen (< 1s)
  const [isLoading, setIsLoading] = useState(true);

  // Default Marathi language as mandated
  const [currentLang, setCurrentLang] = useState<Language>('mr');
  
  // View Router: 'home' | 'catalogue' | 'product-detail'
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogueInitialCategory, setCatalogueInitialCategory] = useState<string>('all');

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Wishlist with LocalStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wlj_catalogue_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('wlj_catalogue_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (categorySlug: string) => {
    setCatalogueInitialCategory(categorySlug);
    setCurrentView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToStore = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('visit-store-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('visit-store-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Resolve full wishlisted product objects
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const isMr = currentLang === 'mr';

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F0EA] text-[#29231F] selection:bg-[#3C0015] selection:text-[#F3F0EA] cursor-luxury">
      
      {/* 00. BRAND LOADER (< 1s) & LUXURY CUSTOM CURSOR */}
      {isLoading && <BrandLoader onComplete={() => setIsLoading(false)} />}
      <CustomCursor />

      {/* 01. HEADER: Slim, elegant, spacious, minimal */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        wishlistCount={wishlistIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenStoreLocator={handleScrollToStore}
        onSelectCategory={handleSelectCategory}
        onNavigate={(view) => {
          if (view === 'about') {
            setIsAboutOpen(true);
          } else if (view === 'stores' || view === 'contact') {
            handleScrollToStore();
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        currentView={currentView}
      />

      {/* MAIN VIEWPORT */}
      <main className="flex-grow">
        
        {/* HOMEPAGE VIEW: EXACT EDITORIAL STORY RHYTHM */}
        {currentView === 'home' && (
          <>
            {/* 02. WIDE HERO (3 slides max, slow image movement, minimal text) */}
            <HeroCarousel
              currentLang={currentLang}
              onNavigate={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCategory={handleSelectCategory}
            />

            {/* 03. SHOP BY CATEGORY (Dynamic colour shift + breathing circles + faint background typography) */}
            <MainCategoryCircles
              currentLang={currentLang}
              products={PRODUCTS}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleSelectProduct}
              onSelectCategory={handleSelectCategory}
              onNavigateCatalogue={() => {
                setCurrentView('catalogue');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 04. ONE ELEGANT HORIZONTAL MARQUEE (Cream + Maroon + Gold) */}
            <MarqueeBanner currentLang={currentLang} variant="maroon" />

            {/* 05. SELECTED COLLECTIONS (Asymmetric Editorial Composition) */}
            <FeaturedCollections
              currentLang={currentLang}
              onSelectCollection={(categoryFilter) => {
                handleSelectCategory(categoryFilter);
              }}
            />

            {/* 06. SECTION 14: STRONG MAROON EDITORIAL MOMENT (LIGHT → DARK MAROON → LIGHT Visual Pause) */}
            <MaroonEditorialMoment
              currentLang={currentLang}
              onExploreCollections={() => handleSelectCategory('all')}
            />

            {/* 07. FEATURED JEWELLERY ('निवडक दागिने' + Gold Line + Generous Spacing) */}
            <FeaturedJewellerySection
              products={PRODUCTS}
              currentLang={currentLang}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleSelectProduct}
              onNavigateCatalogue={() => {
                handleSelectCategory('all');
              }}
            />

            {/* 08. EDITORIAL ABOUT SECTION ('पिढ्यान्पिढ्या जपलेला विश्वास.', left image reveal, drawing gold line) */}
            <AboutSection
              currentLang={currentLang}
              onOpenAboutModal={() => setIsAboutOpen(true)}
            />

            {/* 09. VISIT OUR STORE (Both Chakan branches with photo, address, timings, map & phone) */}
            <div id="visit-store-section">
              <VisitStoreSection currentLang={currentLang} />
            </div>
          </>
        )}

        {/* FULL PRODUCT CATALOGUE VIEW (Smooth Animated Fade) */}
        {currentView === 'catalogue' && (
          <div className="animate-in fade-in duration-300">
            <CatalogueView
              products={PRODUCTS}
              currentLang={currentLang}
              wishlistIds={wishlistIds}
              initialCategory={catalogueInitialCategory}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleSelectProduct}
              onBackToHome={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* PRODUCT DETAIL PAGE (Smooth Animated Fade) */}
        {currentView === 'product-detail' && selectedProduct && (
          <div className="animate-in fade-in duration-300">
            <ProductDetailView
              product={selectedProduct}
              allProducts={PRODUCTS}
              currentLang={currentLang}
              isWishlisted={wishlistIds.includes(selectedProduct.id)}
              onToggleWishlist={handleToggleWishlist}
              onOpenStoreLocator={handleScrollToStore}
              onBackToCatalogue={() => setCurrentView('catalogue')}
              onSelectProduct={handleSelectProduct}
              wishlistIds={wishlistIds}
            />
          </div>
        )}

      </main>

      {/* 08. FOOTER: 4 columns, Maroon background, clean gold/cream typography */}
      <Footer
        currentLang={currentLang}
        onNavigate={(view) => {
          if (view === 'about') {
            setIsAboutOpen(true);
          } else if (view === 'stores' || view === 'contact') {
            handleScrollToStore();
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSelectCategory={handleSelectCategory}
        onOpenStoreLocator={handleScrollToStore}
      />

      {/* FLOATING WHATSAPP BUTTON (Royal Maroon container with gold border, NO emerald green) */}
      <a
        href={`https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(
          isMr
            ? 'नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला दागिन्यांविषयी माहिती हवी आहे.'
            : 'Hello Wafgaonkar Laxmi Jewellers, I would like to enquire about your jewellery collections.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] p-3.5 rounded-full shadow-lg border border-[#D7B95F]/50 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-[#D7B95F]"
        aria-label="Chat on WhatsApp"
        title={isMr ? 'WhatsApp वर संपर्क साधा' : 'Chat on WhatsApp'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="#F3F0EA"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.556 4.122 1.528 5.855L0 24l6.341-1.501A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.013-1.374l-.36-.214-3.733.884.944-3.639-.234-.374A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
      </a>

      {/* WISHLIST DRAWER (Digital Catalogue Enquiry List) */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        currentLang={currentLang}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onSelectProduct={handleSelectProduct}
      />

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        currentLang={currentLang}
        onSelectProduct={handleSelectProduct}
        onSelectCategory={handleSelectCategory}
      />

      {/* ABOUT HERITAGE MODAL */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        currentLang={currentLang}
      />

    </div>
  );
}
