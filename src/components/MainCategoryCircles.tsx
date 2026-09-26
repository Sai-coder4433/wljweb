import React, { useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { Language, Product } from '../types';
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
  image: string;
  subcategories: SubCategoryItem[];
}

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    id: 'gold',
    slug: 'gold',
    marathiName: 'सोन्याचे दागिने',
    name: 'Gold Jewellery',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'haar', marathiName: 'हार व चोकर', name: 'Haar & Choker', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop', slug: 'necklaces' },
      { id: 'thushi-gold', marathiName: 'पेशवाई ठुशी', name: 'Peshwai Thushi', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop', slug: 'thushi' },
      { id: 'mangalsutra-sub', marathiName: 'मंगळसूत्र', name: 'Mangalsutra', image: 'https://images.unsplash.com/photo-1611591475819-79b8b73ff2f3?q=80&w=400&auto=format&fit=crop', slug: 'mangalsutra' },
      { id: 'bangdya', marathiName: 'बांगड्या व तोडे', name: 'Bangles & Tode', image: 'https://images.unsplash.com/photo-1611591476140-5e36ca47a16b?q=80&w=400&auto=format&fit=crop', slug: 'bangles' },
      { id: 'jhumke-gold', marathiName: 'झुमके व कर्णफुले', name: 'Earrings & Jhumkas', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=400&auto=format&fit=crop', slug: 'earrings' },
      { id: 'angathya-gold', marathiName: 'अंगठ्या', name: 'Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'rings' },
      { id: 'nath-gold', marathiName: 'ब्राह्मणी नथ', name: 'Nath', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', slug: 'nath' },
    ],
  },
  {
    id: 'diamond',
    slug: 'diamond',
    marathiName: 'हिऱ्यांचे दागिने',
    name: 'Diamond Jewellery',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'solitaire-ring', marathiName: 'सॉलिटेअर अंगठी', name: 'Solitaire Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'ring' },
      { id: 'diamond-mangalsutra', marathiName: 'डायमंड मंगळसूत्र', name: 'Diamond Mangalsutra', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop', slug: 'mangalsutra' },
    ],
  },
  {
    id: 'mangalsutra',
    slug: 'mangalsutra',
    marathiName: 'मंगळसूत्र',
    name: 'Mangalsutra',
    image: 'https://images.unsplash.com/photo-1611591475819-79b8b73ff2f3?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'traditional-vati', marathiName: 'पारंपरिक वटी', name: 'Traditional Vati', image: 'https://images.unsplash.com/photo-1611591475819-79b8b73ff2f3?q=80&w=400&auto=format&fit=crop', slug: 'vati' },
      { id: 'mani-mangalsutra', marathiName: 'काळे मणी मंगळसूत्र', name: 'Gold Mani Mangalsutra', image: 'https://images.unsplash.com/photo-1611591475819-79b8b73ff2f3?q=80&w=400&auto=format&fit=crop', slug: 'mani' },
      { id: 'short-mangalsutra', marathiName: 'नाजूक दैनंदिन मंगळसूत्र', name: 'Delicate Everyday', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop', slug: 'delicate' },
    ],
  },
  {
    id: 'necklaces',
    slug: 'necklaces',
    marathiName: 'हार',
    name: 'Haar & Necklaces',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'thushi-sub', marathiName: 'पेशवाई ठुशी', name: 'Peshwai Thushi', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop', slug: 'thushi' },
      { id: 'kolhapuri-saaj', marathiName: 'कोल्हापुरी साज', name: 'Kolhapuri Saaj', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop', slug: 'saaj' },
      { id: 'chandrahar', marathiName: 'चंद्रहार', name: 'Chandrahar', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop', slug: 'chandrahar' },
      { id: 'choker', marathiName: 'शाही चोकर हार', name: 'Royal Choker', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop', slug: 'choker' },
      { id: 'bakul-haar', marathiName: 'बकुळ हार', name: 'Bakul Haar', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=400&auto=format&fit=crop', slug: 'bakul' },
    ],
  },
  {
    id: 'earrings',
    slug: 'earrings',
    marathiName: 'कर्णफुले',
    name: 'Karnaphule & Earrings',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'jhumke-sub', marathiName: 'अँटिक मयूर झुमके', name: 'Peacock Jhumkas', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=400&auto=format&fit=crop', slug: 'jhumka' },
      { id: 'bugadi', marathiName: 'मोत्याची बुगडी', name: 'Pearl Bugadi', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'bugadi' },
      { id: 'tops', marathiName: 'दैनिक सुवर्ण टॉप्स', name: 'Daily Tops', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&auto=format&fit=crop', slug: 'tops' },
    ],
  },
  {
    id: 'bangles',
    slug: 'bangles',
    marathiName: 'बांगड्या',
    name: 'Bangles & Tode',
    image: 'https://images.unsplash.com/photo-1611591476140-5e36ca47a16b?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'shindeshahi-tode', marathiName: 'शिंदेशाही तोडे', name: 'Shindeshahi Tode', image: 'https://images.unsplash.com/photo-1611591476140-5e36ca47a16b?q=80&w=400&auto=format&fit=crop', slug: 'shindeshahi' },
      { id: 'gahu-tode', marathiName: 'गहू तोडे', name: 'Gahu Tode', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop', slug: 'gahu' },
      { id: 'patlya-sub', marathiName: 'पारंपरिक पाटल्या', name: 'Patlya', image: 'https://images.unsplash.com/photo-1611591476140-5e36ca47a16b?q=80&w=400&auto=format&fit=crop', slug: 'patlya' },
      { id: 'pichhodi-sub', marathiName: 'सुवर्ण पिच्छोडी', name: 'Pichhodi', image: 'https://images.unsplash.com/photo-1611591476140-5e36ca47a16b?q=80&w=400&auto=format&fit=crop', slug: 'pichhodi' },
    ],
  },
  {
    id: 'rings',
    slug: 'rings',
    marathiName: 'अंगठ्या',
    name: 'Rings & Mudrika',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'statement-rings', marathiName: 'राजेशाही मयूर मुद्रिका', name: 'Statement Rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'statement' },
      { id: 'gold-ring-sub', marathiName: 'दैनंदिन सुवर्ण अंगठी', name: 'Daily Rings', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop', slug: 'daily' },
    ],
  },
  {
    id: 'silver',
    slug: 'silver',
    marathiName: 'चांदीचे दागिने',
    name: 'Silver Jewellery',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=600&auto=format&fit=crop',
    subcategories: [
      { id: 'payal', marathiName: 'घुंगरू पैंजण', name: 'Ghungroo Payal', image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=400&auto=format&fit=crop', slug: 'payal' },
      { id: 'jodvi', marathiName: 'नक्षीदार जोडवी', name: 'Silver Jodvi', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop', slug: 'jodvi' },
      { id: 'silver-pooja', marathiName: 'पूजा भांडी व ताट संच', name: 'Silver Pooja Items', image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=400&auto=format&fit=crop', slug: 'pooja' },
    ],
  },
];

interface MainCategoryCirclesProps {
  currentLang: Language;
  onSelectCategory: (categorySlug: string) => void;
  onNavigateCatalogue: () => void;
  products?: Product[];
  wishlistIds?: string[];
  onToggleWishlist?: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

export const MainCategoryCircles: React.FC<MainCategoryCirclesProps> = ({
  currentLang,
  onSelectCategory,
  onNavigateCatalogue,
  products = PRODUCTS,
  wishlistIds = [],
  onToggleWishlist,
  onSelectProduct,
}) => {
  const [activeMainCat, setActiveMainCat] = useState<MainCategory>(MAIN_CATEGORIES[0]);
  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(
    MAIN_CATEGORIES[0].subcategories[0]?.slug || 'necklaces'
  );
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isMr = currentLang === 'mr';

  // Section entrance observer for staggered circle reveal on scroll
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

  // Category specific accent tint mapping for dynamic background shift
  const currentAccentCatId = hoveredCatId || activeMainCat.id;
  const getDynamicBackgroundClass = (catId: string) => {
    switch (catId) {
      case 'gold':
        return 'bg-[#F9F4EB] shadow-[inset_0_0_80px_rgba(212,175,55,0.08)]';
      case 'diamond':
        return 'bg-[#FCF9F3] shadow-[inset_0_0_80px_rgba(252,248,241,0.9)]';
      case 'mangalsutra':
        return 'bg-[#F8EFEF] shadow-[inset_0_0_80px_rgba(75,15,26,0.06)]';
      case 'necklaces':
        return 'bg-[#F9EFF2] shadow-[inset_0_0_80px_rgba(114,38,58,0.07)]';
      case 'earrings':
        return 'bg-[#F9F5EC] shadow-[inset_0_0_80px_rgba(212,175,55,0.07)]';
      case 'bangles':
        return 'bg-[#F7EDEE] shadow-[inset_0_0_80px_rgba(53,16,24,0.06)]';
      case 'rings':
        return 'bg-[#FBF6EE] shadow-[inset_0_0_80px_rgba(216,193,138,0.1)]';
      case 'silver':
        return 'bg-[#F5F4F3] shadow-[inset_0_0_80px_rgba(200,200,210,0.1)]';
      default:
        return 'bg-[#F8F1E7]';
    }
  };

  // Smooth scroll left/right for categories
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Switch category - automatically select the first subcategory of that category
  const handleSelectMainCategory = (cat: MainCategory) => {
    setActiveMainCat(cat);
    if (cat.subcategories && cat.subcategories.length > 0) {
      setSelectedSubCategory(cat.subcategories[0].slug);
    } else {
      setSelectedSubCategory('all');
    }
  };

  // Filter products for the active main category and subcategory
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Main category filter
      if (activeMainCat.id === 'gold') {
        if (p.metal !== 'Gold') return false;
      } else if (activeMainCat.id === 'diamond') {
        const isDiamond =
          p.metal === 'Diamond' ||
          p.category.toLowerCase().includes('diamond') ||
          p.subcategory.toLowerCase().includes('diamond') ||
          p.name.toLowerCase().includes('diamond') ||
          (p.marathiName && p.marathiName.includes('हिऱ्यां'));
        if (!isDiamond) return false;
      } else if (activeMainCat.id === 'silver') {
        if (p.metal !== 'Silver') return false;
      } else if (activeMainCat.id === 'bangles') {
        const isBangle =
          p.category.toLowerCase().includes('bangle') ||
          p.subcategory.toLowerCase().includes('tode') ||
          p.subcategory.toLowerCase().includes('patlya') ||
          p.subcategory.toLowerCase().includes('pichhodi') ||
          p.subcategory.toLowerCase().includes('kada');
        if (!isBangle) return false;
      } else if (activeMainCat.id === 'mangalsutra') {
        if (!p.category.toLowerCase().includes('mangalsutra')) return false;
      } else if (activeMainCat.id === 'necklaces') {
        const isNecklace =
          p.category.toLowerCase().includes('necklace') ||
          p.category.toLowerCase().includes('haar') ||
          p.subcategory.toLowerCase().includes('thushi') ||
          p.subcategory.toLowerCase().includes('saaj') ||
          p.subcategory.toLowerCase().includes('choker');
        if (!isNecklace) return false;
      } else if (activeMainCat.id === 'earrings') {
        const isEarring =
          p.category.toLowerCase().includes('earring') ||
          p.subcategory.toLowerCase().includes('jhumka') ||
          p.subcategory.toLowerCase().includes('bugadi') ||
          p.subcategory.toLowerCase().includes('top');
        if (!isEarring) return false;
      } else if (activeMainCat.id === 'rings') {
        if (!p.category.toLowerCase().includes('ring')) return false;
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
      className={`relative py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto text-left rounded-3xl transition-all duration-700 ease-out border border-[#D4AF37]/20 my-6 overflow-hidden ${getDynamicBackgroundClass(
        currentAccentCatId
      )}`}
    >
      {/* Large faint typography in background: JEWELLERY COLLECTION (opacity ~5-8%) */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center overflow-hidden opacity-[0.05] select-none">
        <span className="font-cinzel text-[14vw] font-black tracking-[0.2em] text-[#4B0F1A] leading-none whitespace-nowrap">
          JEWELLERY
        </span>
        <span className="font-cinzel text-[11vw] font-black tracking-[0.25em] text-[#72263A] leading-none whitespace-nowrap -mt-4">
          COLLECTION
        </span>
      </div>

      {/* Header with Title and Marathi Subtitle */}
      <div 
        className={`relative z-10 flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#D4AF37]/25 gap-3 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div>
          <span className="text-[10px] sm:text-xs font-cinzel uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
            CURATED CATALOGUE • SINCE 1951
          </span>
          <h2 className="font-marathi-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#4B0F1A] tracking-tight">
            {isMr ? 'दागिन्यांची निवड करा' : 'Choose Your Jewellery'}
          </h2>
          <p className="font-marathi-serif text-xs sm:text-sm text-[#76685F] mt-1">
            {isMr ? 'आपल्या आवडीचा साज निवडा.' : 'Select your favorite jewellery style.'}
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center space-x-2 self-end sm:self-center">
          <button
            onClick={() => handleScroll('left')}
            className="w-9 h-9 rounded-full bg-[#FCF8F1] border border-[#D4AF37]/40 text-[#4B0F1A] hover:bg-[#4B0F1A] hover:text-[#F7F1E6] transition-all flex items-center justify-center shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-9 h-9 rounded-full bg-[#FCF8F1] border border-[#D4AF37]/40 text-[#4B0F1A] hover:bg-[#4B0F1A] hover:text-[#F7F1E6] transition-all flex items-center justify-center shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 01. HORIZONTAL CIRCULAR CATEGORIES (Staggered reveal + breathing effect + dynamic hover) */}
      <div className="relative z-10 mb-8">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-none scroll-smooth space-x-4 sm:space-x-6 py-3 px-1 snap-x focus:outline-hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {MAIN_CATEGORIES.map((cat, index) => {
            const isSelected = activeMainCat.id === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectMainCategory(cat)}
                onMouseEnter={() => setHoveredCatId(cat.id)}
                onMouseLeave={() => setHoveredCatId(null)}
                className={`group flex flex-col items-center cursor-pointer text-center flex-shrink-0 snap-center focus:outline-hidden w-[88px] sm:w-[108px] transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-7 scale-95'
                }`}
                style={{
                  transitionDelay: `${index * 90}ms`,
                }}
              >
                {/* Circular image frame: on hover image scales slightly, thin Heritage Gold circular border appears */}
                <div
                  className={`relative w-[76px] h-[76px] sm:w-[94px] sm:h-[94px] rounded-full p-1 transition-all duration-350 ease-out animate-category-breathe ${
                    isSelected
                      ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#F7F1E6] bg-[#FCF8F1] scale-[1.03] shadow-md'
                      : 'ring-1 ring-[#D4AF37]/35 group-hover:ring-2 group-hover:ring-[#D4AF37] bg-[#FCF8F1]'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#2F2521]">
                    <img
                      src={cat.image}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Category name moves up 3-4px, arrow moves right */}
                <div className="mt-2.5 flex flex-col items-center transform transition-transform duration-350 ease-out group-hover:-translate-y-1">
                  <span
                    className={`block font-marathi-serif text-xs sm:text-sm leading-tight transition-colors text-center truncate ${
                      isSelected
                        ? 'font-bold text-[#4B0F1A]'
                        : 'font-medium text-[#2F2521] group-hover:text-[#4B0F1A]'
                    }`}
                  >
                    {isMr ? cat.marathiName : cat.name}
                  </span>
                  <span className="text-[11px] text-[#D4AF37] transform transition-transform duration-350 ease-out group-hover:translate-x-1.5 mt-0.5">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 02. SUBCATEGORIES FOR ACTIVE CATEGORY - SOLID ROYAL MAROON (#4B0F1A) LUXURY CONTAINER */}
      <div className="relative bg-[#4B0F1A] border-2 border-[#D4AF37]/50 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_-10px_rgba(75,15,26,0.55)] mb-6 sm:mb-8 overflow-hidden text-left">
        
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-[#72263A]/30 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 sm:pb-5 mb-4 sm:mb-6 border-b border-[#D4AF37]/25 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#D4AF37] font-cinzel font-bold">
                {isMr ? 'उप-प्रकार निवडा' : 'Select Subcategory'}
              </span>
              <span className="text-xs sm:text-sm text-[#D4AF37]/70">•</span>
              <span className="text-[10px] sm:text-xs font-bold text-[#FCF8F1] font-marathi-serif tracking-wide bg-[#351018]/85 px-2.5 sm:px-3 py-0.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
                {isMr ? activeMainCat.marathiName : activeMainCat.name}
              </span>
            </div>
            <h3 className="font-marathi-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#FCF8F1] mt-1 sm:mt-1.5 tracking-tight">
              {isMr ? 'पसंतीनुसार दागिने निवडा' : 'Filter by Style & Preference'}
            </h3>
            <div className="w-12 sm:w-16 h-[2px] bg-[#D4AF37] mt-1.5 sm:mt-2.5 rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          </div>

          <button
            onClick={() => {
              onSelectCategory(activeMainCat.slug);
              onNavigateCatalogue();
            }}
            className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#F7F1E6] text-[#2F2521] hover:text-[#4B0F1A] transition-all duration-300 text-xs sm:text-sm font-marathi-serif font-bold self-start sm:self-center shadow-md hover:shadow-xl hover:scale-105 active:scale-95 border border-[#D4AF37] group cursor-pointer"
          >
            <span>{isMr ? `कॅटलॉगमध्ये सर्व पहा` : `Browse All in Catalogue`}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform transition-transform group-hover:translate-x-1.5 duration-300" />
          </button>
        </div>

        {/* Subcategory interactive pill controls */}
        <div className="relative z-10 flex overflow-x-auto scrollbar-none gap-2 sm:gap-3 pb-1.5 sm:pb-2 -mx-1 px-1">
          {activeMainCat.subcategories.map((sub) => {
            const isSubActive = selectedSubCategory === sub.slug;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCategory(sub.slug)}
                className={`group flex items-center space-x-2 sm:space-x-2.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl border transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  isSubActive
                    ? 'bg-[#D4AF37] text-[#2F2521] border-[#D4AF37] shadow-xl scale-[1.03] ring-2 ring-[#D4AF37]/50'
                    : 'bg-[#351018]/85 hover:bg-[#571A22] text-[#F7F1E6] border border-[#D4AF37]/35 hover:border-[#D4AF37] hover:scale-[1.03] shadow-md backdrop-blur-xs'
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg overflow-hidden flex-shrink-0 border transition-all duration-300 ${
                    isSubActive ? 'border-[#2F2521]/30 bg-white shadow-xs' : 'border-[#D4AF37]/40 bg-white group-hover:border-[#D4AF37]'
                  }`}
                >
                  <img
                    src={sub.image}
                    alt={sub.marathiName}
                    loading="lazy"
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-115"
                  />
                </div>
                <span
                  className={`font-marathi-serif text-xs sm:text-sm whitespace-nowrap transition-colors duration-200 ${
                    isSubActive ? 'font-bold text-[#2F2521]' : 'font-semibold text-[#F7F1E6] group-hover:text-white'
                  }`}
                >
                  {isMr ? sub.marathiName : sub.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* 03. PRODUCT DISPLAY INSIDE SUBCATEGORY */}
        <div className="relative z-10 mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-[#D4AF37]/25">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-marathi-serif font-semibold text-[#F7F1E6] flex items-center space-x-1.5 sm:space-x-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4AF37] inline-block animate-pulse shadow-[0_0_6px_#D4AF37]" />
              <span>
                {isMr 
                  ? `उपलब्ध दागिने (${filteredProducts.length})`
                  : `Available Ornaments (${filteredProducts.length})`}
              </span>
            </span>
            <span className="text-[9px] sm:text-[11px] font-cinzel text-[#D4AF37] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#351018]/90 border border-[#D4AF37]/50 shadow-xs">
              100% 916 BIS HALLMARKED
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-[#351018]/60 rounded-xl sm:rounded-2xl border border-dashed border-[#D4AF37]/40 p-4 sm:p-6 shadow-xs">
              <p className="font-marathi-serif text-xs sm:text-base text-[#F7F1E6]/90">
                {isMr ? 'या प्रकारात नवीन दागिने लवकरच उपलब्ध होत आहेत.' : 'New designs arriving soon in this collection.'}
              </p>
              <button
                onClick={() => {
                  if (activeMainCat.subcategories.length > 0) {
                    setSelectedSubCategory(activeMainCat.subcategories[0].slug);
                  }
                }}
                className="mt-2.5 sm:mt-3 text-xs font-bold text-[#D4AF37] hover:text-[#FCF8F1] underline font-marathi-serif transition-colors cursor-pointer"
              >
                {isMr ? 'इतर प्रकार पहा' : 'View Other Styles'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {filteredProducts.map((p) => {
                const isWish = wishlistIds.includes(p.id);

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct && onSelectProduct(p)}
                    className="group bg-[#FCF8F1] rounded-xl sm:rounded-2xl border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all duration-500 overflow-hidden flex flex-col shadow-md hover:shadow-2xl cursor-pointer text-left transform hover:-translate-y-1.5 hover:scale-[1.01]"
                  >
                    {/* Product Image Stage with hover zoom */}
                    <div className="relative aspect-[4/4] w-full overflow-hidden bg-white p-2.5 sm:p-4 md:p-5 flex items-center justify-center border-b border-[#D4AF37]/20">
                      <img
                        src={p.images[0]}
                        alt={p.marathiName}
                        loading="lazy"
                        className="w-full h-full object-contain object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Wishlist toggle */}
                      {onToggleWishlist && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(p);
                          }}
                          className={`absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                            isWish
                              ? 'bg-[#4B0F1A] text-[#D4AF37]'
                              : 'bg-[#F7F1E6]/95 text-[#2F2521] hover:text-[#4B0F1A] hover:bg-white'
                          }`}
                          aria-label="Wishlist"
                        >
                          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWish ? 'fill-[#D4AF37]' : ''}`} />
                        </button>
                      )}

                      {/* Hallmark Badge */}
                      <span className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 px-1.5 sm:px-2 py-0.5 rounded-sm bg-[#4B0F1A] text-[#F7F1E6] text-[8px] sm:text-[9px] md:text-[10px] font-cinzel font-semibold tracking-wider border border-[#D4AF37]/40 shadow-xs">
                        {p.purity.includes('22K') ? '22K 916' : p.metal === 'Diamond' ? 'IGI CERTIFIED' : '92.5 SILVER'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-2.5 sm:p-3.5 md:p-4 flex flex-col flex-grow justify-between space-y-1.5 sm:space-y-2.5">
                      <div>
                        <div className="text-[9px] sm:text-[10px] md:text-[11px] font-cinzel text-[#76685F] font-semibold">
                          {p.purity} • {p.weight}
                        </div>
                        <h4 className="font-marathi-serif font-bold text-xs sm:text-sm text-[#2F2521] group-hover:text-[#4B0F1A] transition-colors line-clamp-1 leading-snug mt-0.5">
                          {isMr ? p.marathiName : p.name}
                        </h4>
                      </div>

                      <div className="pt-1.5 sm:pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between">
                        <span className="font-cinzel text-xs sm:text-sm md:text-base font-bold text-[#4B0F1A]">
                          ₹ {p.price.toLocaleString('en-IN')}
                        </span>

                        <a
                          href={`https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(
                            `नमस्ते, मला वाफगावकर लक्ष्मी ज्वेलर्समधील "${p.marathiName}" (किंमत: ₹${p.price.toLocaleString('en-IN')}, वजन: ${p.weight}, कोड: ${p.sku}) बद्दल माहिती हवी आहे.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 sm:p-1.5 rounded-full bg-[#4B0F1A] hover:bg-[#72263A] text-[#F7F1E6] transition-colors border border-[#D4AF37]/40 shadow-xs"
                          title="WhatsApp Inquiry"
                          aria-label="WhatsApp Inquiry"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-[#F7F1E6] text-[#F7F1E6]" />
                        </a>
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
