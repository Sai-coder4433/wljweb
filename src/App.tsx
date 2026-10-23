import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { MainCategoryCircles } from './components/MainCategoryCircles';
import { MarqueeBanner } from './components/MarqueeBanner';
import { FeaturedCollections } from './components/FeaturedCollections';
import { MaroonEditorialMoment } from './components/MaroonEditorialMoment';
import { FeaturedJewellerySection } from './components/FeaturedJewellerySection';
import { HeritageStorySection } from './components/HeritageStorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VisitStoreSection } from './components/VisitStoreSection';
import { Footer } from './components/Footer';
import { FloatingMarketingWidget } from './components/FloatingMarketingWidget';
import { TodayRateTickerBar } from './components/TodayRateTickerBar';

// Luxury Polish Enhancements
import { BrandLoader } from './components/BrandLoader';
import { CustomCursor } from './components/CustomCursor';

// Views & Modals
import { CatalogueView } from './components/CatalogueView';
import { ProductDetailView } from './components/ProductDetailView';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { AboutModal } from './components/AboutModal';
import { SEOHead } from './components/SEOHead';

// Admin Panel & Authentication
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';

// Data, Types, Config & Firebase Realtime Service
import { PRODUCTS, CATEGORIES } from './data/jewelleryData';
import { DEFAULT_HERO_SLIDES, DEFAULT_TESTIMONIALS, DEFAULT_RATES } from './data/initialData';
import { Product, HeroSlide, Testimonial, DailyRates, CategoryItem, Language } from './types';
import { BRAND_CONFIG } from './config';
import {
  subscribeProducts,
  subscribeCategories,
  subscribeHeroSlides,
  subscribeTestimonials,
  subscribeRates,
  subscribeAuthPassword,
} from './services/firestoreDataService';

export default function App() {
  // Brand Loading Screen (< 1s)
  const [isLoading, setIsLoading] = useState(true);

  // Default Marathi language as mandated
  const [currentLang, setCurrentLang] = useState<Language>('mr');
  
  // Realtime Cloud Firestore synced states
  const [realtimeProducts, setRealtimeProducts] = useState<Product[]>(PRODUCTS);
  const [realtimeCategories, setRealtimeCategories] = useState<CategoryItem[]>(CATEGORIES);
  const [realtimeHeroSlides, setRealtimeHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [realtimeTestimonials, setRealtimeTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [realtimeRates, setRealtimeRates] = useState<DailyRates>(DEFAULT_RATES);
  const [cloudPassword, setCloudPassword] = useState<string>('19511951');
  const [isFirebaseLive, setIsFirebaseLive] = useState(true);

  // Check URL pathname or hash for /admin route
  const checkIsAdminRoute = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = new URLSearchParams(window.location.search).get('view');
    return path.startsWith('/admin') || hash === '#/admin' || hash === '#admin' || search === 'admin';
  };

  // View Router: 'home' | 'catalogue' | 'product-detail' | 'admin'
  const [currentView, setCurrentView] = useState<string>(() => {
    return checkIsAdminRoute() ? 'admin' : 'home';
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogueInitialCategory, setCatalogueInitialCategory] = useState<string>('all');

  // Admin Authentication Session - Prompt for password when accessing /admin
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      localStorage.removeItem('wlj_admin_session_token');
      return !!sessionStorage.getItem('wlj_admin_session_token');
    } catch {
      return false;
    }
  });

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

  // 1. Subscribe to Realtime Cloud Firestore on mount
  useEffect(() => {
    const unsubProducts = subscribeProducts(
      (items) => {
        if (items && items.length > 0) {
          setRealtimeProducts(items);
        }
      },
      () => setIsFirebaseLive(false)
    );

    const unsubHero = subscribeHeroSlides(
      (slides) => {
        if (slides && slides.length > 0) {
          setRealtimeHeroSlides(slides);
        }
      },
      () => setIsFirebaseLive(false)
    );

    const unsubTesti = subscribeTestimonials(
      (testimonials) => {
        if (testimonials && testimonials.length > 0) {
          setRealtimeTestimonials(testimonials);
        }
      },
      () => setIsFirebaseLive(false)
    );

    const unsubCategories = subscribeCategories(
      (items) => {
        if (items && items.length > 0) {
          setRealtimeCategories(items);
        }
      },
      () => setIsFirebaseLive(false)
    );

    const unsubRates = subscribeRates(
      (rates) => {
        if (rates) {
          setRealtimeRates(rates);
        }
      },
      () => setIsFirebaseLive(false)
    );

    const unsubSecurity = subscribeAuthPassword(
      (pass) => {
        if (pass) {
          setCloudPassword(pass);
          localStorage.setItem('wlj_admin_master_password', pass);
        }
      },
      () => {}
    );

    return () => {
      unsubProducts();
      unsubCategories();
      unsubHero();
      unsubTesti();
      unsubRates();
      unsubSecurity();
    };
  }, []);

  // 2. Browser history & URL routing listener
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAdminRoute()) {
        setCurrentView('admin');
      } else if (currentView === 'admin') {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [currentView]);

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

  const handleNavigateToAdmin = () => {
    try {
      window.history.pushState(null, '', '/admin');
    } catch {
      window.location.hash = '#/admin';
    }
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    try {
      window.history.pushState(null, '', '/');
    } catch {
      window.location.hash = '';
    }
    sessionStorage.removeItem('wlj_admin_session_token');
    localStorage.removeItem('wlj_admin_session_token');
    setIsAdminAuthenticated(false);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoutAdmin = () => {
    localStorage.removeItem('wlj_admin_session_token');
    sessionStorage.removeItem('wlj_admin_session_token');
    setIsAdminAuthenticated(false);
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

  // Resolve full wishlisted product objects from realtime products
  const wishlistedProducts = realtimeProducts.filter((p) => wishlistIds.includes(p.id));

  const isMr = currentLang === 'mr';

  // =========================================================================
  // VIEW: ADMIN PORTAL (/admin)
  // =========================================================================
  if (currentView === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <>
          <SEOHead currentView="admin" lang={currentLang} />
          <AdminLogin
            onLoginSuccess={() => setIsAdminAuthenticated(true)}
            onExit={handleExitAdmin}
            cloudPassword={cloudPassword}
          />
        </>
      );
    }

    return (
      <>
        <SEOHead currentView="admin" lang={currentLang} />
        <AdminDashboard
          products={realtimeProducts}
          categories={realtimeCategories}
          heroSlides={realtimeHeroSlides}
          testimonials={realtimeTestimonials}
          rates={realtimeRates}
          onExitToStore={handleExitAdmin}
          onLogout={handleLogoutAdmin}
          firebaseConnected={isFirebaseLive}
        />
      </>
    );
  }

  // =========================================================================
  // VIEW: PUBLIC STOREFRONT
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F0EA] text-[#29231F] selection:bg-[#3C0015] selection:text-[#F3F0EA] cursor-luxury">
      <SEOHead
        currentView={currentView}
        categoryFilter={catalogueInitialCategory}
        product={selectedProduct}
        lang={currentLang}
      />
      
      {/* 00. BRAND LOADER (< 1s) & LUXURY CUSTOM CURSOR */}
      {isLoading && <BrandLoader onComplete={() => setIsLoading(false)} />}
      <CustomCursor />

      {/* 01. UNIFIED STICKY HEADER & LIVE RATE TICKER */}
      <div className="sticky top-0 z-50 w-full bg-[#F3F0EA]">
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
            } else if (view === 'admin') {
              handleNavigateToAdmin();
            } else {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          currentView={currentView}
        />
        <TodayRateTickerBar currentLang={currentLang} rates={realtimeRates} />
      </div>

      {/* MAIN VIEWPORT */}
      <main className="flex-grow">
        
        {/* HOMEPAGE VIEW: EXACT EDITORIAL STORY RHYTHM */}
        {currentView === 'home' && (
          <>
            {/* 02. WIDE HERO (Dynamic Slides from Cloud Firestore with gallery images) */}
            <HeroCarousel
              currentLang={currentLang}
              slides={realtimeHeroSlides}
              onNavigate={(view) => {
                setCurrentView(view);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCategory={handleSelectCategory}
            />

            {/* 03. SHOP BY CATEGORY (Dynamic colour shift + breathing circles) */}
            <MainCategoryCircles
              currentLang={currentLang}
              products={realtimeProducts}
              categories={realtimeCategories}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleSelectProduct}
              onSelectCategory={handleSelectCategory}
              onNavigateCatalogue={() => {
                setCurrentView('catalogue');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 04. ONE ELEGANT HORIZONTAL MARQUEE */}
            <MarqueeBanner currentLang={currentLang} variant="maroon" />

            {/* 05. SELECTED COLLECTIONS */}
            <FeaturedCollections
              currentLang={currentLang}
              onSelectCollection={(categoryFilter) => {
                handleSelectCategory(categoryFilter);
              }}
            />

            {/* 06. SECTION 14: STRONG MAROON EDITORIAL MOMENT */}
            <MaroonEditorialMoment
              currentLang={currentLang}
              onExploreCollections={() => handleSelectCategory('all')}
            />

            {/* 07. FEATURED JEWELLERY ('निवडक दागिने' from Realtime Firestore) */}
            <FeaturedJewellerySection
              products={realtimeProducts}
              currentLang={currentLang}
              wishlistIds={wishlistIds}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleSelectProduct}
              onNavigateCatalogue={() => {
                handleSelectCategory('all');
              }}
            />

            {/* 08. BRAND LEGACY & TRUST SECTION */}
            <HeritageStorySection
              currentLang={currentLang}
              onOpenAboutModal={() => setIsAboutOpen(true)}
            />

            {/* 09. TESTIMONIALS (Customer Reviews from Cloud Firestore) */}
            <TestimonialsSection
              currentLang={currentLang}
              testimonials={realtimeTestimonials}
            />

            {/* 10. VISIT OUR SHOWROOM */}
            <VisitStoreSection currentLang={currentLang} />
          </>
        )}

        {/* FULL PRODUCT CATALOGUE VIEW (Realtime Products) */}
        {currentView === 'catalogue' && (
          <div className="animate-in fade-in duration-300">
            <CatalogueView
              products={realtimeProducts}
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

        {/* PRODUCT DETAIL PAGE */}
        {currentView === 'product-detail' && selectedProduct && (
          <div className="animate-in fade-in duration-300">
            <ProductDetailView
              product={selectedProduct}
              allProducts={realtimeProducts}
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

      {/* 08. FOOTER WITH ADMIN PORTAL LINK */}
      <Footer
        currentLang={currentLang}
        onNavigate={(view) => {
          if (view === 'about') {
            setIsAboutOpen(true);
          } else if (view === 'stores' || view === 'contact') {
            handleScrollToStore();
          } else if (view === 'admin') {
            handleNavigateToAdmin();
          } else {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onSelectCategory={handleSelectCategory}
        onOpenStoreLocator={handleScrollToStore}
        onOpenAdmin={handleNavigateToAdmin}
      />

      {/* FLOATING MARKETING BHONGA & 4-OPTIONS SOCIAL WIDGET */}
      <FloatingMarketingWidget currentLang={currentLang} />

      {/* WISHLIST DRAWER */}
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
        products={realtimeProducts}
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
