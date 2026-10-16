import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product, Language } from '../types';
import { BRAND_CONFIG } from '../config';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  currentLang: Language;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenStoreLocator: () => void;
  onBackToCatalogue: () => void;
  onSelectProduct: (product: Product) => void;
  wishlistIds: string[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  currentLang,
  isWishlisted,
  onToggleWishlist,
  onOpenStoreLocator,
  onBackToCatalogue,
  onSelectProduct,
  wishlistIds,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const isMr = currentLang === 'mr';

  // Related products from same category or metal
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.metal === product.metal))
    .slice(0, 4);

  // Exact pre-filled WhatsApp enquiry message format (Strictly no prices)
  const enquiryMessage = isMr
    ? `नमस्कार वाफगावकर लक्ष्मी ज्वेलर्स, मला या दागिन्याबद्दल सविस्तर माहिती हवी आहे:\n\nदागिना: ${product.marathiName} (${product.name})\nप्रकार: ${product.marathiCategory} (${product.marathiSubcategory})\nशुद्धता: ${product.purity}\nअंदाजे वजन: ${product.weight}\nउत्पादन कोड (SKU): ${product.sku}\n\nकृपया आजचा सुवर्ण दर, उपलब्ध तारीख आणि डिझाइनविषयी अधिक माहिती सांगा.`
    : `Hello Wafgaonkar Laxmi Jewellers, I would like to inquire about this jewellery piece:\n\nProduct: ${product.name}\nCategory: ${product.category} (${product.subcategory})\nPurity: ${product.purity}\nGross Weight: ${product.weight}\nProduct Code (SKU): ${product.sku}\n\nPlease share today's gold rate and availability.`;

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiryMessage)}`;

  return (
    <div className="py-8 md:py-14 px-4 md:px-8 max-w-7xl mx-auto min-h-screen text-left">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#766A61] font-marathi-serif mb-8 overflow-x-auto whitespace-nowrap">
        <button
          onClick={onBackToCatalogue}
          className="flex items-center space-x-1.5 text-[#3C0015] hover:text-[#500018] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isMr ? 'मुख्य कॅटलॉग' : 'Catalogue'}</span>
        </button>
        <span className="text-[#D7B95F]/50">/</span>
        <span className="text-[#766A61]">{isMr ? product.marathiCategory : product.category}</span>
        <span className="text-[#D7B95F]/50">/</span>
        <span className="text-[#29231F] font-medium truncate max-w-xs">
          {isMr ? product.marathiName : product.name}
        </span>
      </nav>

      {/* Main Layout: LEFT Gallery + RIGHT Specifications & WhatsApp Enquiry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
        
        {/* LEFT: High-resolution Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white border border-[#D7B95F]/25 p-4 sm:p-6 flex items-center justify-center shadow-md">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain object-center"
            />

            {/* Official BIS Hallmark Triangular Logo Seal */}
            <div 
              className="absolute top-4 left-4 z-20 inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF8F4]/95 backdrop-blur-xs border border-[#D7B95F]/70 shadow-sm"
              title="BIS Hallmark Certified"
            >
              <svg viewBox="0 0 100 85" className="w-5 h-4 text-[#3C0015]" fill="currentColor">
                <polygon points="50,4 96,78 4,78" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
                <polygon points="50,22 78,70 22,70" fill="currentColor" opacity="0.3" />
                <text x="50" y="64" textAnchor="middle" fill="currentColor" fontSize="22" fontFamily="Cinzel, serif" fontWeight="900">BIS</text>
              </svg>
              <span className="font-cinzel text-xs font-black tracking-wider text-[#3C0015]">
                {product.purity.includes('22K') ? '916' : product.purity.includes('24K') ? '999' : product.purity.includes('18K') ? '750' : '925'}
              </span>
            </div>

            {/* Wishlist Button inside image frame */}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                isWishlisted
                  ? 'bg-[#3C0015] text-[#D7B95F]'
                  : 'bg-[#F3F0EA] text-[#29231F] hover:text-[#3C0015] hover:bg-white'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D7B95F]' : ''}`} />
            </button>
          </div>

          {/* Thumbnails below in 4:5 ratio */}
          {product.images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 sm:w-20 aspect-[4/5] rounded-xl overflow-hidden p-1 border-2 transition-all flex-shrink-0 bg-white ${
                    selectedImageIndex === idx
                      ? 'border-[#3C0015] shadow-xs'
                      : 'border-[#D7B95F]/30 hover:border-[#D7B95F]'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Authentic BIS 3-Point Hallmark Stamp Strip */}
          <div className="bg-[#FAF8F4] rounded-2xl p-4 border border-[#D7B95F]/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#D7B95F]/20">
              <div className="flex items-center space-x-2 text-xs font-marathi-serif font-bold text-[#3C0015]">
                <ShieldCheck className="w-4 h-4 text-[#D7B95F]" />
                <span>{isMr ? '१००% बीआयएस हॉलमार्क प्रमाणित' : '100% BIS Hallmarked'}</span>
              </div>
              <span className="font-cinzel text-[10px] text-[#D7B95F] font-bold uppercase tracking-wider">
                HUID VERIFIED
              </span>
            </div>

            {/* Visual 3-mark strip */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-xl border border-[#D7B95F]/30 flex flex-col items-center justify-center">
                <svg viewBox="0 0 100 90" className="w-5 h-5 text-[#D7B95F] mb-1" fill="currentColor">
                  <polygon points="50,10 90,80 10,80" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
                  <text x="50" y="65" textAnchor="middle" fill="currentColor" fontSize="20" fontFamily="Cinzel, serif" fontWeight="bold">BIS</text>
                </svg>
                <span className="text-[10px] font-marathi-serif font-bold text-[#3C0015]">{isMr ? 'त्रिकोणी BIS' : 'BIS Mark'}</span>
              </div>

              <div className="bg-white p-2 rounded-xl border border-[#D7B95F]/30 flex flex-col items-center justify-center">
                <span className="font-cinzel text-xs font-black text-[#3C0015]">22K 916</span>
                <span className="text-[10px] font-marathi-serif font-bold text-[#766A61] mt-0.5">{isMr ? 'कॅरेट शुद्धता' : 'Purity Grade'}</span>
              </div>

              <div className="bg-white p-2 rounded-xl border border-[#D7B95F]/30 flex flex-col items-center justify-center">
                <span className="font-mono text-[11px] font-bold text-[#3C0015] tracking-wider">HUID</span>
                <span className="text-[10px] font-marathi-serif font-bold text-[#766A61] mt-0.5">{isMr ? '६-अंकी कोड' : 'Unique ID'}</span>
              </div>
            </div>

            <p className="text-[11px] font-marathi-serif text-[#766A61] leading-relaxed">
              {isMr
                ? 'या दागिन्यावर भारत सरकारच्या अधिकृत BIS नियमांनुसार HUID लेझर-अंकित केलेला आहे, जो BIS Care App द्वारे पडताळता येतो.'
                : 'Laser-inscribed with official Govt. BIS hallmark and HUID traceable on the BIS Care App.'}
            </p>
          </div>
        </div>

        {/* RIGHT: Complete Information, Specifications & WhatsApp CTA */}
        <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
          
          <div>
            {/* Category & Purity Tag */}
            <div className="text-xs uppercase tracking-widest text-[#D7B95F] font-cinzel font-semibold mb-1.5 flex items-center space-x-2">
              <span>{product.purity}</span>
              <span>•</span>
              <span>{isMr ? product.marathiCategory : product.category}</span>
            </div>
            
            {/* Product Title */}
            <h1 className="font-marathi-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#29231F] mb-2 leading-tight">
              {isMr ? product.marathiName : product.name}
            </h1>

            {/* Product SKU */}
            <p className="text-xs text-[#766A61] font-mono">
              SKU: {product.sku}
            </p>
          </div>

          {/* Purity & Weight Hallmark Trust Box (No Prices) */}
          <div className="py-4 px-5 rounded-2xl bg-[#FAF8F4] border border-[#D7B95F]/35 flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[11px] text-[#766A61] font-marathi-serif block">
                {isMr ? 'हॉलमार्क शुद्धता' : 'Hallmark & Purity'}
              </span>
              <span className="font-cinzel text-lg sm:text-xl font-bold text-[#3C0015]">
                {product.purity}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#766A61] font-marathi-serif block">
                {isMr ? 'अंदाजे एकूण वजन' : 'Gross Weight'}
              </span>
              <span className="font-cinzel text-base sm:text-lg font-bold text-[#29231F]">
                {product.weight}
              </span>
            </div>
          </div>

          {/* Editorial Description */}
          <div className="font-marathi-serif text-sm text-[#29231F] leading-relaxed">
            {isMr ? product.marathiDescription : product.description}
          </div>

          {/* PRIMARY ACTION: WhatsApp Enquiry Button */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[#3C0015] hover:bg-[#500018] text-[#F3F0EA] text-sm sm:text-base font-marathi-serif font-bold transition-all shadow-xs flex items-center justify-center space-x-2.5 border border-[#D7B95F]/50 hover:border-[#D7B95F] group"
            >
              <MessageCircle className="w-5 h-5 fill-[#F3F0EA] text-[#F3F0EA]" />
              <span>{isMr ? 'WhatsApp वर चौकशी करा' : 'WhatsApp वर चौकशी करा'}</span>
            </a>

            {/* Sub-actions: Visit Store or Call */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={onOpenStoreLocator}
                className="py-2.5 px-4 rounded-full bg-[#3C0015]/10 hover:bg-[#3C0015] text-[#3C0015] hover:text-[#F3F0EA] text-xs font-marathi-serif font-semibold transition-colors flex items-center justify-center space-x-1.5 border border-[#D7B95F]/40"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D7B95F]" />
                <span>{isMr ? 'दालनाला भेट द्या' : 'Visit Store'}</span>
              </button>

              <a
                href={`tel:${BRAND_CONFIG.PHONE_NUMBER}`}
                className="py-2.5 px-4 rounded-full bg-white hover:bg-[#F3F0EA] text-[#29231F] text-xs font-marathi-serif font-semibold transition-colors flex items-center justify-center space-x-1.5 border border-[#D7B95F]/30 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#3C0015]" />
                <span>{isMr ? 'कॉल करा' : 'Call Us'}</span>
              </a>
            </div>
          </div>

          {/* SPECIFICATIONS TABLE */}
          <div className="pt-4 border-t border-[#D7B95F]/20">
            <h3 className="font-marathi-display text-base font-bold text-[#3C0015] mb-3">
              {isMr ? 'दागिन्यांची सविस्तर माहिती' : 'Product Specifications'}
            </h3>

            <div className="bg-[#FAF8F4] rounded-xl overflow-hidden border border-[#D7B95F]/25 divide-y divide-[#D7B95F]/15 font-marathi-serif text-xs">
              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766A61]">{isMr ? 'धातू (Metal)' : 'Metal'}</span>
                <span className="font-medium text-[#29231F]">{isMr ? product.marathiMetal : product.metal}</span>
              </div>

              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766A61]">{isMr ? 'शुद्धता (Purity)' : 'Purity'}</span>
                <span className="font-bold text-[#3C0015]">{product.purity}</span>
              </div>

              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766A61]">{isMr ? 'अंदाजे एकूण वजन (Gross Weight)' : 'Gross Weight'}</span>
                <span className="font-medium text-[#29231F]">{product.weight}</span>
              </div>

              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766A61]">{isMr ? 'श्रेणी (Category)' : 'Category'}</span>
                <span className="font-medium text-[#29231F]">{isMr ? product.marathiCategory : product.category}</span>
              </div>

              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766A61]">{isMr ? 'प्रमाणपत्र (Certification)' : 'Certification'}</span>
                <span className="font-medium text-[#29231F]">BIS Hallmarked (Govt. Certified)</span>
              </div>

              {product.specifications.map((spec, i) => (
                <div key={i} className="py-2.5 px-4 flex justify-between">
                  <span className="text-[#766A61]">{isMr ? spec.marathiLabel : spec.label}</span>
                  <span className="font-medium text-[#29231F]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* RELATED PIECES */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#D7B95F]/20">
          <h2 className="font-marathi-display text-2xl font-bold text-[#3C0015] mb-6">
            {isMr ? 'हे दागिने देखील पहा' : 'You May Also Like'}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                currentLang={currentLang}
                isWishlisted={wishlistIds.includes(relProduct.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
