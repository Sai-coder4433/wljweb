import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, MessageCircle, ShieldCheck } from 'lucide-react';
import { Language, Product, CategoryItem } from '../types';
import { PRODUCTS } from '../data/jewelleryData';
import { BRAND_CONFIG } from '../config';

export interface SubCategoryItem {
  id: string;
  marathiName: string;
  name: string;
  image: string;
  slug: string;
}

export interface MainCategory {
  id: string;
  slug: string;
  marathiName: string;
  name: string;
  bgToken: string;
  image: string;
  subcategories: SubCategoryItem[];
}

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'necklaces',
    slug: 'necklaces',
    marathiName: 'हार व चोकर',
    name: 'Necklaces (Haar)',
    bgToken: 'bg-[#FAF8F4] border-[#D7B95F]/40', // Ivory
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'thushi-sub', marathiName: 'पेशवाई ठुशी', name: 'Peshwai Thushi', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop', slug: 'thushi' },
      { id: 'kolhapuri-saaj', marathiName: 'कोल्हापुरी साज', name: 'Kolhapuri Saaj', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop', slug: 'saaj' },
      { id: 'choker', marathiName: 'शाही चोकर हार', name: 'Royal Choker', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop', slug: 'choker' },
      { id: 'chandrahar', marathiName: 'पारंपरिक चंद्रहार', name: 'Chandrahar', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop', slug: 'chandrahar' },
      { id: 'bakul-haar', marathiName: 'बकुळ हार', name: 'Bakul Haar', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop', slug: 'bakul' },
    ],
  },
  {
    id: 'mangalsutra',
    slug: 'mangalsutra',
    marathiName: 'मंगळसूत्र',
    name: 'Mangalsutra',
    bgToken: 'bg-[#FDF4F5] border-[#500018]/30', // Muted Crimson
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'traditional-vati', marathiName: 'पारंपरिक वटी मंगळसूत्र', name: 'Traditional Vati', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop', slug: 'vati' },
      { id: 'mani-mangalsutra', marathiName: 'काळे मणी सुवर्ण मंगळसूत्र', name: 'Gold Mani Mangalsutra', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop', slug: 'mani' },
      { id: 'short-mangalsutra', marathiName: 'नाजूक दैनंदिन मंगळसूत्र', name: 'Delicate Everyday', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop', slug: 'delicate' },
      { id: 'diamond-mangalsutra', marathiName: 'हिऱ्यांचे मंगळसूत्र', name: 'Diamond Mangalsutra', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'diamond' },
    ],
  },
  {
    id: 'earrings',
    slug: 'earrings',
    marathiName: 'कर्णफुले व बुट्टी',
    name: 'Earrings (Butti)',
    bgToken: 'bg-[#FDFCF2] border-[#D7B95F]/50', // Soft Gold
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'jhumke-sub', marathiName: 'अँटिक मयूर झुमके', name: 'Peacock Jhumkas', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=400&auto=format&fit=crop', slug: 'jhumka' },
      { id: 'bugadi', marathiName: 'मोत्याची बुगडी', name: 'Pearl Bugadi', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'bugadi' },
      { id: 'tops', marathiName: 'दैनिक सुवर्ण टॉप्स', name: 'Daily Tops', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', slug: 'tops' },
      { id: 'kudya', marathiName: 'पारंपरिक कुड्या', name: 'Traditional Kudya', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=400&auto=format&fit=crop', slug: 'kudya' },
    ],
  },
  {
    id: 'bangles',
    slug: 'bangles',
    marathiName: 'बांगड्या व तोडे',
    name: 'Bangles (Valya)',
    bgToken: 'bg-[#FDF7F2] border-[#E5CCA0]/50', // Blush Beige
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'shindeshahi-tode', marathiName: 'शिंदेशाही तोडे', name: 'Shindeshahi Tode', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', slug: 'shindeshahi' },
      { id: 'gahu-tode', marathiName: 'गहू तोडे व गोठ', name: 'Gahu Tode & Goth', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop', slug: 'gahu' },
      { id: 'patlya-sub', marathiName: 'पारंपरिक नक्षीदार पाटल्या', name: 'Patlya', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', slug: 'patlya' },
      { id: 'pichhodi-sub', marathiName: 'सुवर्ण पिच्छोडी', name: 'Pichhodi', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', slug: 'pichhodi' },
    ],
  },
  {
    id: 'rings',
    slug: 'rings',
    marathiName: 'अंगठ्या व मुद्रिका',
    name: 'Rings (Angathi)',
    bgToken: 'bg-[#FAF6ED] border-[#D7B95F]/40', // Champagne
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'statement-rings', marathiName: 'राजेशाही मयूर मुद्रिका', name: 'Statement Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'statement' },
      { id: 'gold-ring-sub', marathiName: 'दैनंदिन सुवर्ण अंगठी', name: 'Daily Rings', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop', slug: 'daily' },
      { id: 'solitaire-ring', marathiName: 'सॉलिटेअर डायमंड अंगठी', name: 'Solitaire Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'ring' },
    ],
  },
  {
    id: 'nath',
    slug: 'nath',
    marathiName: 'नथ व कुडी',
    name: 'Nose Pins (Nath)',
    bgToken: 'bg-[#FBF1F5] border-[#500018]/30', // Muted Crimson / Rose Gold
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'brahmani-nath', marathiName: 'अस्सल ब्राह्मणी नथ', name: 'Brahmani Nath', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', slug: 'nath' },
      { id: 'chapha-nath', marathiName: 'चाफा नथ', name: 'Chapha Nath', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop', slug: 'nath' },
      { id: 'maratha-nath', marathiName: 'पेशवेकालीन मराठा नथ', name: 'Peshwai Maratha Nath', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop', slug: 'nath' },
    ],
  },
  {
    id: 'silver',
    slug: 'silver',
    marathiName: 'चांदीचे दागिने व वस्तू',
    name: 'Silver Articles (Chandi)',
    bgToken: 'bg-[#F6F7F9] border-[#D7B95F]/35', // Soft Silver Champagne
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'payal', marathiName: 'घुंगरू पैंजण', name: 'Ghungroo Payal', image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=400&auto=format&fit=crop', slug: 'payal' },
      { id: 'jodvi', marathiName: 'नक्षीदार जोडवी', name: 'Silver Jodvi', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'jodvi' },
      { id: 'silver-pooja', marathiName: 'पूजा भांडी व देवमूर्ती', name: 'Silver Pooja Articles', image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=400&auto=format&fit=crop', slug: 'pooja' },
    ],
  },
];

interface MainCategoryCirclesProps {
  currentLang: Language;
  onSelectCategory: (categorySlug: string) => void;
  onNavigateCatalogue: () => void;
  products?: Product[];
  categories?: CategoryItem[];
  wishlistIds?: string[];
  onToggleWishlist?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const MainCategoryCircles: React.FC<MainCategoryCirclesProps> = ({
  currentLang,
  onSelectCategory,
  onNavigateCatalogue,
  products = PRODUCTS,
  categories,
  wishlistIds = [],
  onToggleWishlist,
  onSelectProduct,
}) => {
  const mergedCategories: MainCategory[] = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories.map((cat) => {
        const defaultMatch = MAIN_CATEGORIES.find(
          (m) => m.slug === cat.slug || m.id === cat.id
        );
        const subs: SubCategoryItem[] = (cat.subcategories || []).map((s) => ({
          id: s.id,
          marathiName: s.marathiName,
          name: s.name,
          image: s.image,
          slug: s.slug,
        }));

        return {
          id: cat.slug || cat.id,
          slug: cat.slug || cat.id,
          marathiName: cat.marathiName,
          name: cat.name,
          bgToken: defaultMatch?.bgToken || 'bg-[#FAF8F4] border-[#D7B95F]/40',
          image: cat.image || defaultMatch?.image || 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600',
          subcategories: subs.length > 0 ? subs : (defaultMatch?.subcategories || []),
        };
      });
    }
    return MAIN_CATEGORIES;
  }, [categories]);

  const [activeMainCat, setActiveMainCat] = useState<MainCategory>(
    mergedCategories[0] || MAIN_CATEGORIES[0]
  );
  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    mergedCategories[0]?.subcategories[0]?.slug || 'necklaces'
  );

  // Keep active category synced if categories list changes from Firestore
  React.useEffect(() => {
    if (mergedCategories.length > 0) {
      const match = mergedCategories.find(
        (c) => c.id === activeMainCat.id || c.slug === activeMainCat.slug
      );
      if (match) {
        setActiveMainCat(match);
      } else {
        setActiveMainCat(mergedCategories[0]);
      }
    }
  }, [mergedCategories]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMr = currentLang === 'mr';

  // Section entrance observer
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Category section background tonal transition: Warm Ivory → Champagne Gold
  const currentAccentCatId = hoveredCatId || activeMainCat.id;
  const getDynamicBackgroundClass = (catId: string) => {
    switch (catId) {
      case 'necklaces':
        return 'bg-gradient-to-b from-[#F3F0EA] via-[#FAF8F4] to-[#F3F0EA] shadow-[inset_0_0_80px_rgba(215,185,95,0.08)]';
      case 'mangalsutra':
        return 'bg-gradient-to-b from-[#F3F0EA] via-[#FDF4F5] to-[#F3F0EA] shadow-[inset_0_0_80px_rgba(60,0,21,0.05)]';
      case 'earrings':
        return 'bg-gradient-to-b from-[#F3F0EA] via-[#FDFCF2] to-[#F3F0EA] shadow-[inset_0_0_80px_rgba(215,185,95,0.10)]';
      case 'bangles':
        return 'bg-gradient-to-b from-[#F3F0EA] via-[#FDF7F2] to-[#F3F0EA] shadow-[inset_0_0_80px_rgba(229,204,160,0.12)]';
      case 'rings':
        return 'bg-gradient-to-b from-[#F3F0EA] via-[#FAF6ED] to-[#F3F0EA] shadow-[inset_0_0_80px_rgba(215,185,95,0.08)]';
      case 'nath':
        return 'bg-gradient-to-b from-[#F3F0EA] via-[#FBF1F5] to-[#F3F0EA] shadow-[inset_0_0_80px_rgba(60,0,21,0.06)]';
      case 'silver':
        return 'bg-gradient-to-b from-[#F3F0EA] via-[#F6F7F9] to-[#F3F0EA] shadow-[inset_0_0_80px_rgba(215,185,95,0.05)]';
      default:
        return 'bg-gradient-to-b from-[#F3F0EA] via-[#FAF8F4] to-[#F3F0EA]';
    }
  };

  // Smooth scroll left/right for categories
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Select main category and reset subcategory to its first item
  const handleSelectMainCategory = (cat: MainCategory) => {
    setActiveMainCat(cat);
    if (cat.subcategories && cat.subcategories.length > 0) {
      setSelectedSubCategory(cat.subcategories[0].slug);
    } else {
      setSelectedSubCategory('all');
    }
  };

  // Filter products by active category & selected subcategory
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Main category filter
      if (activeMainCat.id === 'necklaces') {
        const isNecklace =
          p.category.toLowerCase().includes('necklace') ||
          p.category.toLowerCase().includes('haar') ||
          p.subcategory.toLowerCase().includes('thushi') ||
          p.subcategory.toLowerCase().includes('saaj') ||
          p.subcategory.toLowerCase().includes('choker');
        if (!isNecklace) return false;
      } else if (activeMainCat.id === 'mangalsutra') {
        if (!p.category.toLowerCase().includes('mangalsutra')) return false;
      } else if (activeMainCat.id === 'earrings') {
        const isEarring =
          p.category.toLowerCase().includes('earring') ||
          p.subcategory.toLowerCase().includes('jhumka') ||
          p.subcategory.toLowerCase().includes('bugadi') ||
          p.subcategory.toLowerCase().includes('top') ||
          p.subcategory.toLowerCase().includes('kudya');
        if (!isEarring) return false;
      } else if (activeMainCat.id === 'bangles') {
        const isBangle =
          p.category.toLowerCase().includes('bangle') ||
          p.subcategory.toLowerCase().includes('tode') ||
          p.subcategory.toLowerCase().includes('patlya') ||
          p.subcategory.toLowerCase().includes('pichhodi') ||
          p.subcategory.toLowerCase().includes('kada');
        if (!isBangle) return false;
      } else if (activeMainCat.id === 'rings') {
        if (!p.category.toLowerCase().includes('ring')) return false;
      } else if (activeMainCat.id === 'nath') {
        const isNath =
          p.category.toLowerCase().includes('nath') ||
          p.subcategory.toLowerCase().includes('nath');
        if (!isNath) return false;
      } else if (activeMainCat.id === 'silver') {
        if (p.metal !== 'Silver') return false;
      }

      // Subcategory filter
      if (selectedSubCategory !== 'all') {
        const query = selectedSubCategory.toLowerCase();
        const matchesSub =
          p.subcategory.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.marathiSubcategory && p.marathiSubcategory.toLowerCase().includes(query)) ||
          p.name.toLowerCase().includes(query) ||
          (p.marathiName && p.marathiName.toLowerCase().includes(query));
        if (!matchesSub) return false;
      }

      return true;
    });
  }, [products, activeMainCat, selectedSubCategory]);

  return (
    <section 
      ref={sectionRef}
      className={`relative py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto text-left rounded-3xl transition-all duration-700 ease-out border border-[#D7B95F]/20 my-6 overflow-hidden ${getDynamicBackgroundClass(
        currentAccentCatId
      )}`}
    >
      {/* Large faint background typography */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center overflow-hidden opacity-[0.035] select-none">
        <span className="font-cinzel text-[14vw] font-black tracking-[0.2em] text-[#D7B95F] leading-none whitespace-nowrap">
          HERITAGE
        </span>
        <span className="font-cinzel text-[11vw] font-black tracking-[0.25em] text-[#D7B95F]/70 leading-none whitespace-nowrap -mt-4">
          COLLECTIONS
        </span>
      </div>

      {/* Header with Title and Marathi Subtitle */}
      <div 
        className={`relative z-10 flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#D7B95F]/25 gap-3 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div>
          <span className="text-[10px] sm:text-xs font-cinzel uppercase tracking-[0.25em] text-[#D7B95F] font-semibold block mb-1">
            SHOP BY CATEGORY • SINCE 1951
          </span>
          <h2 className="font-marathi-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#3C0015] tracking-tight">
            {isMr ? 'दागिन्यांची निवड करा' : 'Shop by Category'}
          </h2>
          <p className="font-marathi-serif text-xs sm:text-sm text-[#766A61] mt-1">
            {isMr ? 'आपल्या आवडीनुसार पारंपरिक व आधुनिक सुवर्ण साज निवडा.' : 'Select from our signature handcrafted jewellery categories.'}
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center space-x-2 self-end sm:self-center">
          <button
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full bg-[#FAF8F4] border border-[#D7B95F]/40 text-[#3C0015] hover:bg-[#3C0015] hover:text-[#FAF8F4] transition-all flex items-center justify-center shadow-xs cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full bg-[#FAF8F4] border border-[#D7B95F]/40 text-[#3C0015] hover:bg-[#3C0015] hover:text-[#FAF8F4] transition-all flex items-center justify-center shadow-xs cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 01. HORIZONTAL CIRCULAR CATEGORIES with Coordinated Varied Color Accents */}
      <div className="relative z-10 mb-8">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-none scroll-smooth space-x-4 sm:space-x-6 py-3 px-1 snap-x focus:outline-hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {mergedCategories.map((cat, index) => {
            const isSelected = activeMainCat.id === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectMainCategory(cat)}
                onMouseEnter={() => setHoveredCatId(cat.id)}
                onMouseLeave={() => setHoveredCatId(null)}
                className={`group flex flex-col items-center cursor-pointer text-center flex-shrink-0 snap-center focus:outline-hidden w-[92px] sm:w-[114px] transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-7 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {/* Circular image frame with distinct varied background tone */}
                <div
                  className={`relative w-[78px] h-[78px] sm:w-[98px] sm:h-[98px] rounded-full p-1 transition-all duration-350 ease-out border shadow-xs ${
                    cat.bgToken
                  } ${
                    isSelected
                      ? 'ring-3 ring-[#D7B95F] ring-offset-2 ring-offset-[#F3F0EA] scale-[1.05] shadow-md'
                      : 'hover:scale-[1.03] hover:ring-2 hover:ring-[#D7B95F]'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Category name & arrow */}
                <div className="mt-2.5 flex flex-col items-center transform transition-transform duration-350 ease-out group-hover:-translate-y-1">
                  <span
                    className={`block font-marathi-serif text-xs sm:text-sm leading-tight transition-colors text-center truncate ${
                      isSelected
                        ? 'font-bold text-[#3C0015]'
                        : 'font-medium text-[#29231F] group-hover:text-[#3C0015]'
                    }`}
                  >
                    {isMr ? cat.marathiName : cat.name}
                  </span>
                  <span className="text-[11px] text-[#D7B95F] transform transition-transform duration-350 ease-out group-hover:translate-x-1.5 mt-0.5">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 02. SUBCATEGORIES SHOWCASE — Real Royal Maroon Velvet Cloth Container */}
      <div 
        className="relative border-2 border-[#D7B95F]/65 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_25px_60px_-10px_rgba(40,0,15,0.75)] mb-6 sm:mb-8 overflow-hidden text-left bg-[#320012]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 60% at 50% 30%, rgba(130, 20, 50, 0.30) 0%, rgba(30, 0, 10, 0.60) 100%),
            linear-gradient(145deg, rgba(35, 0, 12, 0.50) 0%, rgba(55, 0, 20, 0.30) 45%, rgba(25, 0, 8, 0.55) 100%),
            url('/royal_maroon_velvet_bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      >
        {/* Top Gold Trim Accent Line */}
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#D7B95F] to-transparent absolute top-0 left-0 right-0 shadow-[0_0_12px_#D7B95F]" />

        {/* Velvet Section Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 border-b border-[#D7B95F]/40 mb-4 sm:mb-6 gap-2">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#1A0007]/80 border border-[#D7B95F]/50 text-[#D7B95F] text-[11px] font-cinzel tracking-wider uppercase mb-1.5">
              <span>{isMr ? 'उप-प्रकार निवडा' : 'Select Subcategory'}</span>
              <span>•</span>
              <span>{isMr ? activeMainCat.marathiName : activeMainCat.name}</span>
            </div>
            <h3 className="font-marathi-display text-lg sm:text-2xl md:text-3xl font-bold text-[#FAF8F4] tracking-tight">
              {isMr ? 'पसंतीनुसार दागिने निवडा' : 'Explore by Design Style'}
            </h3>
          </div>

          <button
            onClick={() => {
              onSelectCategory(activeMainCat.slug);
              onNavigateCatalogue();
            }}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm font-marathi-serif font-bold text-[#E5CCA0] hover:text-[#FAF8F4] transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>{isMr ? `सर्व ${activeMainCat.marathiName} पहा` : `View All ${activeMainCat.name}`}</span>
            <ArrowRight className="w-4 h-4 text-[#D7B95F]" />
          </button>
        </div>

        {/* Subcategory Pills */}
        <div className="relative z-10 flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          {activeMainCat.subcategories.map((sub) => {
            const isSubSelected = selectedSubCategory === sub.slug;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCategory(sub.slug)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-marathi-serif font-semibold transition-all duration-300 shadow-xs cursor-pointer flex items-center space-x-2 ${
                  isSubSelected
                    ? 'bg-gradient-to-r from-[#D7B95F] via-[#E5CCA0] to-[#D7B95F] text-[#3C0015] font-bold shadow-md border border-[#D7B95F] scale-[1.02]'
                    : 'bg-[#22000B]/85 text-[#FAF8F4] hover:bg-[#3C0015] hover:text-[#E5CCA0] border border-[#D7B95F]/35'
                }`}
              >
                {sub.image && (
                  <img
                    src={sub.image}
                    alt={sub.marathiName}
                    className="w-4 h-4 rounded-full object-cover border border-[#D7B95F]/80 flex-shrink-0"
                  />
                )}
                <span>{isMr ? sub.marathiName : sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* 9:16 Portrait Product Cards Showcase (No Prices, Clear Hallmark & WhatsApp CTA) */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-marathi-serif text-[#FAF8F4]/90">
              {isMr ? 'उपलब्ध सुवर्ण कलाकृती:' : 'Featured Pieces:'} ({filteredProducts.length})
            </span>
            <span className="text-[10px] sm:text-[11px] font-cinzel text-[#D7B95F] tracking-wider uppercase font-bold px-3 py-1 rounded-full bg-[#1A0007]/90 border border-[#D7B95F]/50 shadow-xs flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D7B95F]" />
              <span>100% BIS HALLMARKED</span>
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 bg-[#1A0007]/70 rounded-2xl border border-dashed border-[#D7B95F]/40 p-6 shadow-xs">
              <p className="font-marathi-serif text-sm sm:text-base text-[#FAF8F4]/90">
                {isMr ? 'या प्रकारात नवीन दागिने लवकरच उपलब्ध होत आहेत.' : 'New designs arriving soon in this collection.'}
              </p>
              <button
                onClick={() => {
                  if (activeMainCat.subcategories.length > 0) {
                    setSelectedSubCategory(activeMainCat.subcategories[0].slug);
                  }
                }}
                className="mt-3 text-xs font-bold text-[#D7B95F] hover:text-[#FAF8F4] underline font-marathi-serif transition-colors cursor-pointer"
              >
                {isMr ? 'इतर प्रकार पहा' : 'View Other Styles'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredProducts.map((p) => {
                const isWish = wishlistIds.includes(p.id);

                // Build WhatsApp enquiry URL
                const waMessage = encodeURIComponent(
                  isMr
                    ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला या दागिन्याबद्दल सविस्तर माहिती हवी आहे:\n\nदागिना: ${p.marathiName} (${p.name})\nSKU: ${p.sku}\nशुद्धता: ${p.purity}\nवजन: ${p.weight}\nश्रेणी: ${p.marathiCategory}\n\nकृपया आजचा सुवर्ण दर आणि उपलब्धता सांगावी.`
                    : `Hello Wafgaonkar Laxmi Jewellers, I would like to inquire about this jewellery piece:\n\nProduct: ${p.name}\nSKU: ${p.sku}\nPurity: ${p.purity}\nWeight: ${p.weight}\nCategory: ${p.category}\n\nPlease share today's gold rate and availability.`
                );
                const waUrl = `https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${waMessage}`;

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct && onSelectProduct(p)}
                    className="group bg-[#FAF8F4] rounded-2xl border border-[#D7B95F]/35 hover:border-[#D7B95F] transition-all duration-500 overflow-hidden flex flex-col shadow-md hover:shadow-2xl cursor-pointer text-left transform hover:-translate-y-1.5"
                  >
                    {/* Consistent 4:5 Portrait Image Ratio */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-white flex items-center justify-center border-b border-[#D7B95F]/20">
                      <img
                        src={p.images[0]}
                        alt={p.marathiName}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Subtle Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                      {/* Wishlist toggle */}
                      {onToggleWishlist && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(p);
                          }}
                          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                            isWish
                              ? 'bg-[#3C0015] text-[#D7B95F]'
                              : 'bg-[#FAF8F4]/90 text-[#3C0015] hover:text-[#500018] hover:bg-white'
                          }`}
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${isWish ? 'fill-[#D7B95F]' : ''}`} />
                        </button>
                      )}

                      {/* Official BIS Hallmark Triangular Logo Seal */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#FAF8F4]/95 backdrop-blur-xs border border-[#D7B95F]/70 shadow-xs flex items-center space-x-1">
                        <svg className="w-3 h-3 text-[#3C0015]" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="12,2 22,20 2,20" stroke="#3C0015" strokeWidth="1.5" fill="none" />
                          <polygon points="12,6 19,19 5,19" fill="#3C0015" />
                        </svg>
                        <span className="font-cinzel text-[9px] font-bold text-[#3C0015] tracking-tight">
                          {p.purity.includes('22K') ? 'BIS 916' : p.purity.includes('24K') ? 'BIS 999' : p.metal === 'Diamond' ? 'IGI CERT' : 'BIS 925'}
                        </span>
                      </div>
                    </div>

                    {/* Content (No Price, Direct WhatsApp CTA) */}
                    <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between space-y-2 bg-[#FAF8F4]">
                      <div>
                        <div className="text-[10px] font-cinzel text-[#766A61] font-semibold flex items-center justify-between">
                          <span>{p.weight}</span>
                          <span className="text-[#3C0015] font-bold">{p.purity}</span>
                        </div>
                        <h4 className="font-marathi-serif font-bold text-xs sm:text-sm text-[#29231F] group-hover:text-[#3C0015] transition-colors line-clamp-1 leading-snug mt-1">
                          {isMr ? p.marathiName : p.name}
                        </h4>
                      </div>

                      {/* Action: Enquire on WhatsApp */}
                      <div className="pt-2 border-t border-[#D7B95F]/20 flex items-center gap-1.5">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-1.5 px-2.5 rounded-full bg-[#3C0015] hover:bg-[#500018] text-[#FAF8F4] text-[11px] font-marathi-serif font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5 border border-[#D7B95F]/40"
                          title="WhatsApp Enquiry"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                          <span className="truncate">{isMr ? 'चौकशी करा' : 'Enquire'}</span>
                        </a>

                        <button
                          onClick={() => onSelectProduct && onSelectProduct(p)}
                          className="p-1.5 rounded-full border border-[#D7B95F]/40 text-[#3C0015] hover:bg-[#3C0015] hover:text-[#FAF8F4] transition-colors"
                          title={isMr ? 'तपशील पहा' : 'View Details'}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </section>
  );
};
