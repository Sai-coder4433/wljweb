import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { MainCategoryCircles } from './components/MainCategoryCircles';
import { MarqueeBanner } from './components/MarqueeBanner';
import { FeaturedCollections } from './components/FeaturedCollections';
import { MaroonEditorialMoment } from './components/MaroonEditorialMoment';
import { FeaturedJewellerySection } from './components/FeaturedJewellerySection';
import { HeritageStorySection } from './components/HeritageStorySection';
import { HallmarkGuideSection } from './components/HallmarkGuideSection';
import { JewelleryGallerySection } from './components/JewelleryGallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VisitStoreSection } from './components/VisitStoreSection';
import { Footer } from './components/Footer';
import { FloatingMarketingWidget } from './components/FloatingMarketingWidget';

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

            {/* 08. BRAND LEGACY & TRUST SECTION (Since 1951 + BIS Hallmark Trust) */}
            <HeritageStorySection
              currentLang={currentLang}
              onOpenAboutModal={() => setIsAboutOpen(true)}
            />

            {/* 09. BIS HALLMARK ANALYSIS & VERIFICATION GUIDE */}
            <HallmarkGuideSection currentLang={currentLang} />

            {/* 10. JEWELLERY GALLERY (9:16 Portrait Showcase & WhatsApp Actions) */}
            <JewelleryGallerySection currentLang={currentLang} />

            {/* 10. TESTIMONIALS (Customer Reviews Carousel) */}
            <TestimonialsSection currentLang={currentLang} />

            {/* 11. VISIT OUR SHOWROOM (Both Chakan branches with showroom photo, timings, map & phone) */}
            <VisitStoreSection currentLang={currentLang} />
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

      {/* FLOATING MARKETING BHONGA & 4-OPTIONS SOCIAL WIDGET (IG, FB, WP, Call) */}
      <FloatingMarketingWidget currentLang={currentLang} />

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
