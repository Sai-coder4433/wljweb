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
  price: number;
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
