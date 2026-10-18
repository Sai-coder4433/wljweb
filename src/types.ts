export type Language = 'mr' | 'en';

export interface SubcategoryItem {
  id: string;
  name: string;
  marathiName: string;
  slug: string;
  image: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  marathiName: string;
  slug: string;
  image: string;
  itemCount?: number;
  metalType?: string;
  featured?: boolean;
  subcategories?: SubcategoryItem[];
}

export interface CollectionItem {
  id: string;
  name: string;
  marathiName: string;
  slug?: string;
  image: string;
  subtitle?: string;
  marathiSubtitle?: string;
  description?: string;
  marathiDescription?: string;
  productCount?: number;
  accent?: string;
}

export interface OccasionItem {
  id: string;
  name: string;
  marathiName: string;
  slug?: string;
  image: string;
  tagline?: string;
  marathiTagline?: string;
  description?: string;
  marathiDescription?: string;
}

export interface StoreBranch {
  id: string;
  name: string;
  marathiName: string;
  city?: string;
  marathiCity?: string;
  address: string;
  marathiAddress: string;
  phone: string;
  timings?: string;
  timing?: string;
  marathiTimings?: string;
  marathiTiming?: string;
  mapUrl?: string;
  whatsapp?: string;
  email?: string;
  image?: string;
  mapQuery?: string;
}

export interface Product {
  id: string;
  name: string;
  marathiName: string;
  sku: string;
  category: string;
  marathiCategory: string;
  subcategory: string;
  marathiSubcategory: string;
  collection: string;
  marathiCollection: string;
  metal: 'Gold' | 'Diamond' | 'Silver';
  marathiMetal: string;
  purity: string; // e.g. "22K (916)", "18K", "92.5 Sterling Silver"
  weight: string; // e.g. "24.50 gm"
  price?: number;
  originalPrice?: number;
  priceLabel?: string;
  images: string[];
  description: string;
  marathiDescription: string;
  available?: boolean;
  inStock?: boolean;
  stockCount?: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  isBridal?: boolean;
  craftsmanshipNote?: string;
  marathiCraftsmanshipNote?: string;
  diamondDetails?: any;
  gender?: 'Women' | 'Men' | 'Unisex';
  marathiGender?: string;
  occasion?: string[];
  marathiOccasion?: string[];
  tags?: string[];
  specifications: {
    label: string;
    marathiLabel: string;
    value: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HeroSlide {
  id: string | number;
  image: string;
  mobileImage?: string;
  smallLabelMr: string;
  smallLabelEn: string;
  headlineMr: string;
  headlineEn: string;
  subtextMr: string;
  subtextEn: string;
  ctaMr: string;
  ctaEn: string;
  targetCategory?: string;
  order?: number;
  active?: boolean;
}

export interface Testimonial {
  id: string | number;
  nameMr: string;
  nameEn: string;
  locationMr: string;
  locationEn: string;
  reviewMr: string;
  reviewEn: string;
  occasionMr: string;
  occasionEn: string;
  rating: number;
  date: string;
  active?: boolean;
}

export interface DailyRates {
  gold24K_10g: number;
  gold22K_10g: number;
  gold18K_10g: number;
  silver1kg: number;
  gold22K_1g: number;
  silver1g: number;
  lastUpdated: string;
  source?: 'live' | 'sync' | 'manual';
}

