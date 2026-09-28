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

  // Exact pre-filled WhatsApp enquiry message format
  const formattedPrice = product.price > 0 
    ? `₹ ${product.price.toLocaleString('en-IN')}` 
    : (isMr ? 'किंमतीसाठी चौकशी करा' : 'Inquire for Price');

  const enquiryMessage = isMr
    ? `नमस्कार, मला या दागिन्याबद्दल अधिक माहिती हवी आहे:\nउत्पादन: ${product.marathiName}\nप्रकार: ${product.marathiCategory} (${product.marathiSubcategory})\nवजन: ${product.weight}\nअंदाजे किंमत: ${formattedPrice}\nउत्पादन कोड: ${product.sku}\nकृपया उपलब्धता आणि अधिक माहिती सांगा.`
    : `Hello, I would like to inquire about this jewellery piece:\nProduct: ${product.name}\nCategory: ${product.category} (${product.subcategory})\nWeight: ${product.weight}\nEstimated Price: ${formattedPrice}\nProduct Code: ${product.sku}\nPlease share availability and further details.`;

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiryMessage)}`;

  return (
    <div className="py-8 md:py-14 px-4 md:px-8 max-w-7xl mx-auto min-h-screen text-left">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-[#766B73] font-marathi-serif mb-8 overflow-x-auto whitespace-nowrap">
        <button
          onClick={onBackToCatalogue}
          className="flex items-center space-x-1.5 text-[#3F1C46] hover:text-[#4A2252] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isMr ? 'मुख्य कॅटलॉग' : 'Catalogue'}</span>
        </button>
        <span className="text-[#D7B95F]/50">/</span>
        <span className="text-[#766B73]">{isMr ? product.marathiCategory : product.category}</span>
        <span className="text-[#D7B95F]/50">/</span>
        <span className="text-[#45234B] font-medium truncate max-w-xs">
          {isMr ? product.marathiName : product.name}
        </span>
      </nav>

      {/* Main Layout: LEFT Gallery + RIGHT Specifications & WhatsApp Enquiry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
        
        {/* LEFT: High-resolution Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#D7B95F]/25 p-6 flex items-center justify-center shadow-xs">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain object-center"
            />

            {/* Wishlist Button inside image frame */}
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                isWishlisted
                  ? 'bg-[#3F1C46] text-[#D7B95F]'
                  : 'bg-[#F3F0EA] text-[#45234B] hover:text-[#3F1C46] hover:bg-white'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D7B95F]' : ''}`} />
            </button>
          </div>

          {/* Thumbnails below */}
          {product.images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden p-1 border-2 transition-all flex-shrink-0 bg-white ${
                    selectedImageIndex === idx
                      ? 'border-[#3F1C46] shadow-xs'
                      : 'border-[#D7B95F]/30 hover:border-[#D7B95F]'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Authentic BIS Hallmark Assurance badge */}
          <div className="bg-[#FAF8F4] rounded-xl p-3.5 border border-[#D7B95F]/30 flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#D7B95F] flex-shrink-0" />
            <div className="text-xs font-marathi-serif text-[#45234B]">
              <span className="font-bold text-[#3F1C46]">१००% BIS हॉलमार्क प्रमाणित:</span>{' '}
              {isMr 
                ? 'प्रत्येक दागिना सरकारी हॉलमार्क आणि शुद्धतेच्या खात्रीसह उपलब्ध आहे.' 
                : 'Every ornament comes with authentic BIS Hallmark purity certification.'}
            </div>
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
            <h1 className="font-marathi-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#45234B] mb-2 leading-tight">
              {isMr ? product.marathiName : product.name}
            </h1>

            {/* Product SKU */}
            <p className="text-xs text-[#766B73] font-mono">
              SKU: {product.sku}
            </p>
          </div>

          {/* Price Box */}
          <div className="py-4 px-5 rounded-2xl bg-[#FAF8F4] border border-[#D7B95F]/30 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#766B73] font-marathi-serif block">
                {isMr ? 'अंदाजे किंमत (सर्व कर समाविष्ट)' : 'Estimated Price (Taxes Included)'}
              </span>
              <span className="font-cinzel text-2xl sm:text-3xl font-bold text-[#3F1C46]">
                {formattedPrice}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#766B73] font-marathi-serif block">
                {isMr ? 'वजन' : 'Weight'}
              </span>
              <span className="font-cinzel text-base font-semibold text-[#45234B]">
                {product.weight}
              </span>
            </div>
          </div>

          {/* Editorial Description */}
          <div className="font-marathi-serif text-sm text-[#45234B] leading-relaxed">
            {isMr ? product.marathiDescription : product.description}
          </div>

          {/* PRIMARY ACTION: WhatsApp Enquiry Button */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[#3F1C46] hover:bg-[#4A2252] text-[#F3F0EA] text-sm sm:text-base font-marathi-serif font-bold transition-all shadow-xs flex items-center justify-center space-x-2.5 border border-[#D7B95F]/50 hover:border-[#D7B95F] group"
            >
              <MessageCircle className="w-5 h-5 fill-[#F3F0EA] text-[#F3F0EA]" />
              <span>{isMr ? 'WhatsApp वर चौकशी करा' : 'WhatsApp वर चौकशी करा'}</span>
            </a>

            {/* Sub-actions: Visit Store or Call */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={onOpenStoreLocator}
                className="py-2.5 px-4 rounded-full bg-[#3F1C46]/10 hover:bg-[#3F1C46] text-[#3F1C46] hover:text-[#F3F0EA] text-xs font-marathi-serif font-semibold transition-colors flex items-center justify-center space-x-1.5 border border-[#D7B95F]/40"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D7B95F]" />
                <span>{isMr ? 'दालनाला भेट द्या' : 'Visit Store'}</span>
              </button>

              <a
                href={`tel:${BRAND_CONFIG.PHONE_NUMBER}`}
                className="py-2.5 px-4 rounded-full bg-white hover:bg-[#F3F0EA] text-[#45234B] text-xs font-marathi-serif font-semibold transition-colors flex items-center justify-center space-x-1.5 border border-[#D7B95F]/30 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#3F1C46]" />
                <span>{isMr ? 'कॉल करा' : 'Call Us'}</span>
              </a>
            </div>
          </div>

          {/* SPECIFICATIONS TABLE */}
          <div className="pt-4 border-t border-[#D7B95F]/20">
            <h3 className="font-marathi-display text-base font-bold text-[#3F1C46] mb-3">
              {isMr ? 'दागिन्यांची सविस्तर माहिती' : 'Product Specifications'}
            </h3>

            <div className="bg-[#FAF8F4] rounded-xl overflow-hidden border border-[#D7B95F]/25 divide-y divide-[#D7B95F]/15 font-marathi-serif text-xs">
              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766B73]">{isMr ? 'धातू (Metal)' : 'Metal'}</span>
                <span className="font-medium text-[#45234B]">{isMr ? product.marathiMetal : product.metal}</span>
              </div>

              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766B73]">{isMr ? 'शुद्धता (Purity)' : 'Purity'}</span>
                <span className="font-bold text-[#3F1C46]">{product.purity}</span>
              </div>

              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766B73]">{isMr ? 'अंदाजे एकूण वजन (Gross Weight)' : 'Gross Weight'}</span>
                <span className="font-medium text-[#45234B]">{product.weight}</span>
              </div>

              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766B73]">{isMr ? 'श्रेणी (Category)' : 'Category'}</span>
                <span className="font-medium text-[#45234B]">{isMr ? product.marathiCategory : product.category}</span>
              </div>

              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-[#766B73]">{isMr ? 'प्रमाणपत्र (Certification)' : 'Certification'}</span>
                <span className="font-medium text-[#45234B]">BIS Hallmarked (Govt. Certified)</span>
              </div>

              {product.specifications.map((spec, i) => (
                <div key={i} className="py-2.5 px-4 flex justify-between">
                  <span className="text-[#766B73]">{isMr ? spec.marathiLabel : spec.label}</span>
                  <span className="font-medium text-[#45234B]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* RELATED PIECES */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-[#D7B95F]/20">
          <h2 className="font-marathi-display text-2xl font-bold text-[#3F1C46] mb-6">
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
