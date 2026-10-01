import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product, Language } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currentLang: Language;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  currentLang,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const isMr = currentLang === 'mr';

  if (!isOpen) return null;

  const popularSearches = [
    { label: isMr ? 'ठुशी' : 'Thushi', slug: 'necklaces' },
    { label: isMr ? 'कोल्हापुरी साज' : 'Kolhapuri Saaj', slug: 'necklaces' },
    { label: isMr ? 'नथ' : 'Nath', slug: 'nath' },
    { label: isMr ? 'मंगळसूत्र' : 'Mangalsutra', slug: 'mangalsutra' },
    { label: isMr ? 'पाटल्या' : 'Patlya', slug: 'bangles' },
    { label: isMr ? 'झुमके' : 'Jhumkas', slug: 'earrings' },
  ];

  const results = products.filter((p) => {
    if (!searchTerm.trim()) return false;
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.marathiName.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.subcategory.toLowerCase().includes(term) ||
      p.metal.toLowerCase().includes(term) ||
      p.sku.toLowerCase().includes(term)
    );
  }).slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-start justify-center pt-16 md:pt-24 px-4">
      <div className="bg-[#FAF8F4] rounded-2xl max-w-2xl w-full overflow-hidden border border-[#D7B95F]/40 shadow-2xl animate-in zoom-in-95 duration-200 text-left">
        
        {/* Search Input Bar */}
        <div className="p-4 md:p-5 border-b border-[#D7B95F]/30 flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-[#3C0015]" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              isMr
                ? 'दागिने, प्रकार किंवा कोड शोधा... (उदा. ठुशी, नथ, मंगळसूत्र)'
                : 'Search by ornament name, metal, SKU... (e.g., Thushi, Nath)'
            }
            className="w-full text-base font-marathi-serif text-[#29231F] bg-transparent focus:outline-none placeholder-[#766A61]/60"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#766A61] hover:text-[#29231F] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-md bg-[#F3F0EA] text-[#29231F] hover:bg-[#3C0015] hover:text-[#F3F0EA] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-5 py-3 bg-[#F3F0EA] border-b border-[#B99A5A]/20 flex items-center space-x-2 overflow-x-auto text-xs font-marathi-serif">
          <span className="text-[#766A61] flex-shrink-0 font-medium">
            {isMr ? 'लोकप्रिय शोध:' : 'Popular:'}
          </span>
          {popularSearches.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onSelectCategory(item.slug);
                onClose();
              }}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-[#3C0015] text-[#29231F] hover:text-white border border-[#B99A5A]/30 transition-colors whitespace-nowrap flex-shrink-0 text-xs"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 md:p-5">
          {searchTerm.trim() === '' ? (
            <div className="text-center py-8 text-[#766A61] font-marathi-serif text-sm">
              {isMr 
                ? 'दागिन्याचे नाव, प्रकार किंवा कोड टाइप करा.' 
                : 'Type an ornament name, category, or product SKU.'}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-[#766A61] font-marathi-serif text-sm">
              {isMr
                ? `"${searchTerm}" साठी कोणतेही दागिने सापडले नाहीत.`
                : `No results found for "${searchTerm}".`}
            </div>
          ) : (
            <div className="space-y-2.5">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#F3F0EA] border border-[#B99A5A]/20 flex items-center justify-between transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-contain bg-[#FAF8F4] border border-[#B99A5A]/20 p-0.5"
                    />
                    <div>
                      <h4 className="font-marathi-serif font-bold text-sm text-[#29231F] group-hover:text-[#3C0015] transition-colors">
                        {isMr ? product.marathiName : product.name}
                      </h4>
                      <div className="text-[11px] text-[#766A61] font-cinzel">
                        {product.purity} • {product.weight} • {product.sku}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-cinzel font-bold text-sm text-[#3C0015]">
                      ₹ {product.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#B99A5A] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
