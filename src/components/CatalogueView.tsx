import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, Language } from '../types';
import { MAIN_CATEGORIES } from './MainCategoryCircles';

interface CatalogueViewProps {
  products: Product[];
  currentLang: Language;
  wishlistIds: string[];
  initialCategory?: string;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onBackToHome: () => void;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  products,
  currentLang,
  wishlistIds,
  initialCategory = 'all',
  onToggleWishlist,
  onSelectProduct,
  onBackToHome,
}) => {
  const isMr = currentLang === 'mr';

  const [selectedMainCatSlug, setSelectedMainCatSlug] = useState<string>(initialCategory);
  const [selectedSubCatSlug, setSelectedSubCatSlug] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');

  // When initialCategory changes from outside
  useEffect(() => {
    setSelectedMainCatSlug(initialCategory);
    setSelectedSubCatSlug('all');
  }, [initialCategory]);

  // Find the active main category object if any
  const currentMainCat = MAIN_CATEGORIES.find((c) => c.slug === selectedMainCatSlug);

  // Available subcategories to show
  const subcategoriesToShow = currentMainCat ? currentMainCat.subcategories : [];

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // If a specific subcategory is selected
      if (selectedSubCatSlug !== 'all') {
        const query = selectedSubCatSlug.toLowerCase();
        const matchSub = 
          p.subcategory.toLowerCase().includes(query) ||
          (p.marathiSubcategory && p.marathiSubcategory.toLowerCase().includes(query)) ||
          p.category.toLowerCase().includes(query) ||
          p.name.toLowerCase().includes(query) ||
          (p.marathiName && p.marathiName.toLowerCase().includes(query));
        if (!matchSub) return false;
      }

      // If main category is not 'all'
      if (selectedMainCatSlug !== 'all') {
        if (selectedMainCatSlug === 'gold' && p.metal !== 'Gold') return false;
        if (selectedMainCatSlug === 'diamond') {
          const isDiamond =
            p.metal === 'Diamond' ||
            p.category.toLowerCase().includes('diamond') ||
            p.subcategory.toLowerCase().includes('diamond') ||
            p.name.toLowerCase().includes('diamond') ||
            (p.marathiName && p.marathiName.includes('हिऱ्यां'));
          if (!isDiamond) return false;
        }
        if (selectedMainCatSlug === 'silver' && p.metal !== 'Silver') return false;
        if (selectedMainCatSlug === 'mangalsutra' && !p.category.toLowerCase().includes('mangalsutra')) return false;
        if (selectedMainCatSlug === 'necklaces') {
          const isNecklace =
            p.category.toLowerCase().includes('necklace') ||
            p.category.toLowerCase().includes('haar') ||
            p.subcategory.toLowerCase().includes('thushi') ||
            p.subcategory.toLowerCase().includes('saaj') ||
            p.subcategory.toLowerCase().includes('choker');
          if (!isNecklace) return false;
        }
        if (selectedMainCatSlug === 'earrings') {
          const isEarring =
            p.category.toLowerCase().includes('earring') ||
            p.subcategory.toLowerCase().includes('jhumka') ||
            p.subcategory.toLowerCase().includes('bugadi') ||
            p.subcategory.toLowerCase().includes('top');
          if (!isEarring) return false;
        }
        if (selectedMainCatSlug === 'bangles') {
          const isBangle =
            p.category.toLowerCase().includes('bangle') ||
            p.subcategory.toLowerCase().includes('patlya') ||
            p.subcategory.toLowerCase().includes('tode') ||
            p.subcategory.toLowerCase().includes('pichhodi') ||
            p.subcategory.toLowerCase().includes('kada');
          if (!isBangle) return false;
        }
        if (selectedMainCatSlug === 'rings' && !p.category.toLowerCase().includes('ring')) return false;
        if (selectedMainCatSlug === 'nath' && !p.category.toLowerCase().includes('nath') && !p.subcategory.toLowerCase().includes('nath')) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // 'popular' preserves default order
    });
  }, [products, selectedMainCatSlug, selectedSubCatSlug, sortBy]);

  const pageTitle = currentMainCat 
    ? (isMr ? currentMainCat.marathiName : currentMainCat.name)
    : (isMr ? 'सर्व दागिने' : 'All Jewellery');

  return (
    <div className="py-8 md:py-14 px-4 md:px-8 max-w-7xl mx-auto min-h-screen text-left">
      
      {/* Top Breadcrumb: मुख्यपृष्ठ / सोन्याचे दागिने */}
      <div className="flex items-center space-x-2 text-xs text-[#766A61] font-marathi-serif mb-6">
        <button
          onClick={onBackToHome}
          className="flex items-center space-x-1.5 text-[#3C0015] hover:text-[#500018] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isMr ? 'मुख्यपृष्ठ' : 'Home'}</span>
        </button>
        <span className="text-[#D7B95F]/50">/</span>
        <span className="text-[#29231F] font-semibold">{pageTitle}</span>
        {selectedSubCatSlug !== 'all' && (
          <>
            <span className="text-[#D7B95F]/50">/</span>
            <span className="text-[#3C0015] font-semibold">
              {subcategoriesToShow.find((s) => s.slug === selectedSubCatSlug)
                ? (isMr 
                    ? subcategoriesToShow.find((s) => s.slug === selectedSubCatSlug)?.marathiName 
                    : subcategoriesToShow.find((s) => s.slug === selectedSubCatSlug)?.name)
                : selectedSubCatSlug}
            </span>
          </>
        )}
      </div>

      {/* Heading: सोन्याचे दागिने */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#D7B95F]/25 gap-4">
        <div>
          <h1 className="font-marathi-display text-3xl sm:text-4xl font-bold text-[#3C0015] tracking-tight">
            {pageTitle}
          </h1>
          <p className="font-marathi-serif text-xs sm:text-sm text-[#766A61] mt-1">
            {isMr
              ? `एकूण ${filteredProducts.length} अस्सल दागिने उपलब्ध`
              : `${filteredProducts.length} authentic pieces available`}
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 text-xs font-marathi-serif">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#766A61]" />
          <span className="text-[#766A61]">{isMr ? 'क्रम लावा:' : 'Sort By:'}</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FAF8F4] border border-[#D7B95F]/35 text-[#29231F] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#3C0015]"
          >
            <option value="popular">{isMr ? 'निवडक / लोकप्रिय' : 'Curated'}</option>
            <option value="price-asc">{isMr ? 'किंमत: कमी ते जास्त' : 'Price: Low to High'}</option>
            <option value="price-desc">{isMr ? 'किंमत: जास्त ते कमी' : 'Price: High to Low'}</option>
          </select>
        </div>
      </div>

      {/* MAIN CATEGORIES TABS (If user wants to switch category) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        <button
          onClick={() => {
            setSelectedMainCatSlug('all');
            setSelectedSubCatSlug('all');
          }}
          className={`px-4 py-2 rounded-full text-xs font-marathi-serif whitespace-nowrap transition-colors flex-shrink-0 ${
            selectedMainCatSlug === 'all'
              ? 'bg-[#3C0015] text-[#F3F0EA] font-bold'
              : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:border-[#3C0015]'
          }`}
        >
          {isMr ? 'सर्व दागिने' : 'All Jewellery'}
        </button>

        {MAIN_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedMainCatSlug(cat.slug);
              setSelectedSubCatSlug('all');
            }}
            className={`px-4 py-2 rounded-full text-xs font-marathi-serif whitespace-nowrap transition-colors flex-shrink-0 ${
              selectedMainCatSlug === cat.slug
                ? 'bg-[#3C0015] text-[#F3F0EA] font-bold'
                : 'bg-[#FAF8F4] text-[#29231F] border border-[#D7B95F]/30 hover:border-[#3C0015]'
            }`}
          >
            {isMr ? cat.marathiName : cat.name}
          </button>
        ))}
      </div>

      {/* SUBCATEGORY DESIGN: Simple visual tiles: Image + Name */}
      {subcategoriesToShow.length > 0 && (
        <div className="mb-10 p-5 rounded-2xl bg-[#FAF8F4] border border-[#D7B95F]/30">
          <div className="text-xs uppercase tracking-wider text-[#766A61] font-semibold mb-3 font-marathi-serif flex items-center justify-between">
            <span>{isMr ? 'उप-श्रेणी निवडा:' : 'Select Subcategory:'}</span>
            {selectedSubCatSlug !== 'all' && (
              <button
                onClick={() => setSelectedSubCatSlug('all')}
                className="text-xs text-[#3C0015] underline"
              >
                {isMr ? 'सर्व उप-दागिने पहा' : 'Reset subcategory'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {subcategoriesToShow.map((sub) => {
              const isSubActive = selectedSubCatSlug === sub.slug;
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubCatSlug(sub.slug)}
                  className={`group rounded-xl p-2 border transition-all duration-300 cursor-pointer flex items-center space-x-2.5 ${
                    isSubActive
                      ? 'bg-[#3C0015] text-[#F3F0EA] border-[#3C0015] shadow-xs'
                      : 'bg-white hover:bg-[#F3F0EA] border-[#D7B95F]/25 text-[#29231F]'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#F3F0EA]">
                    <img
                      src={sub.image}
                      alt={sub.marathiName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="font-marathi-serif text-xs font-semibold truncate">
                    {isMr ? sub.marathiName : sub.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PRODUCT GRID: Desktop: 4 products per row, Tablet: 3, Mobile: 2 */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              currentLang={currentLang}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#FAF8F4] rounded-2xl border border-[#D7B95F]/20">
          <p className="font-marathi-serif text-[#766A61] text-base mb-4">
            {isMr ? 'या श्रेणीमध्ये सध्या कोणतेही दागिने उपलब्ध नाहीत.' : 'No jewellery found in this category.'}
          </p>
          <button
            onClick={() => {
              setSelectedMainCatSlug('all');
              setSelectedSubCatSlug('all');
            }}
            className="px-6 py-2 rounded-full bg-[#3C0015] text-[#F3F0EA] text-xs font-marathi-serif font-bold"
          >
            {isMr ? 'सर्व दागिने पहा' : 'View All Jewellery'}
          </button>
        </div>
      )}

    </div>
  );
};
