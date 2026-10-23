import React, { useEffect } from 'react';
import { Product } from '../types';

interface SEOHeadProps {
  currentView: string;
  categoryFilter?: string;
  product?: Product | null;
  lang?: 'mr' | 'en';
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  currentView,
  categoryFilter = 'all',
  product,
  lang = 'mr',
}) => {
  useEffect(() => {
    const isMr = lang === 'mr';
    const baseDomain = 'https://wafgaonkarlaxmijewellers.com';
    let title = 'Wafgaonkar Laxmi Jewellers | Trusted Jewellers in Chakan Since 1951';
    let description =
      'Discover traditional and contemporary gold and silver jewellery at Wafgaonkar Laxmi Jewellers, Chakan. Explore elegant designs backed by a legacy of trust since 1951.';
    let canonicalUrl = `${baseDomain}/`;
    let ogImage = `${baseDomain}/editorial_maroon_jewellery.jpg`;
    let isNoIndex = false;

    // View-specific SEO mapping
    if (currentView === 'admin') {
      title = 'प्रशासकीय नियंत्रण कक्ष | Wafgaonkar Laxmi Jewellers Admin Portal';
      description = 'Wafgaonkar Laxmi Jewellers Admin Portal.';
      isNoIndex = true;
    } else if (currentView === 'product-detail' && product) {
      const prodName = isMr && product.marathiName ? product.marathiName : product.name;
      title = `${prodName} | Gold Jewellery in Chakan | Wafgaonkar Laxmi Jewellers`;
      description = `${prodName} - Handcrafted 100% BIS Hallmarked ${product.metal} jewellery at Wafgaonkar Laxmi Jewellers, Chakan. Enquire now via WhatsApp.`;
      canonicalUrl = `${baseDomain}/?product=${encodeURIComponent(product.id)}`;
      if (product.image) {
        ogImage = product.image;
      }
    } else if (currentView === 'catalogue') {
      const cat = (categoryFilter || 'all').toLowerCase();
      if (cat === 'necklaces' || cat.includes('haar') || cat.includes('necklace')) {
        title = 'Gold Necklaces & Haar in Chakan | Wafgaonkar Laxmi Jewellers';
        description =
          'Explore handcrafted gold necklaces, choker haar, thushi, kolhapuri saaj, and bridal necklace designs at Wafgaonkar Laxmi Jewellers in Chakan since 1951.';
        canonicalUrl = `${baseDomain}/?category=necklaces`;
      } else if (cat === 'mangalsutra' || cat.includes('mangal')) {
        title = 'Traditional Gold Mangalsutra in Chakan | Wafgaonkar Laxmi Jewellers';
        description =
          'Browse traditional Maharashtrian vati mangalsutra, gold mani, diamond mangalsutra, and delicate everyday designs in Chakan.';
        canonicalUrl = `${baseDomain}/?category=mangalsutra`;
      } else if (cat === 'earrings' || cat.includes('ear') || cat.includes('butti')) {
        title = 'Gold Earrings, Butti & Jhumkas in Chakan | Wafgaonkar Laxmi Jewellers';
        description =
          'Authentic peacock jhumkas, pearl bugadi, daily gold tops, and royal kudya earrings at Wafgaonkar Laxmi Jewellers, Chakan.';
        canonicalUrl = `${baseDomain}/?category=earrings`;
      } else if (cat === 'bangles' || cat.includes('bangle') || cat.includes('tode')) {
        title = 'Gold Bangles, Patlya & Shindeshahi Tode in Chakan | Wafgaonkar Laxmi Jewellers';
        description =
          'Heritage Maharashtrian Shindeshahi tode, gahu tode, nakshidar patlya, and royal pichhodi bangles crafted with hallmark purity in Chakan.';
        canonicalUrl = `${baseDomain}/?category=bangles`;
      } else if (cat === 'rings' || cat.includes('ring')) {
        title = 'Gold & Diamond Rings in Chakan | Wafgaonkar Laxmi Jewellers';
        description =
          'Shop men and women gold rings, peacock mudrika, solitaire diamond rings, and wedding engagement bands in Chakan.';
        canonicalUrl = `${baseDomain}/?category=rings`;
      } else if (cat === 'nath' || cat.includes('nath')) {
        title = 'Authentic Maharashtrian Brahmani Nath in Chakan | Wafgaonkar Laxmi Jewellers';
        description =
          'Classic Peshwai Brahmani nath, pearl chapha nath, and traditional nose pins crafted with gold and pearls in Chakan.';
        canonicalUrl = `${baseDomain}/?category=nath`;
      } else if (cat === 'silver' || cat.includes('silver') || cat.includes('chandi')) {
        title = 'Pure Silver Jewellery & Pooja Articles in Chakan | Wafgaonkar Laxmi Jewellers';
        description =
          '92.5 pure silver payal, jodvi, silver utensils, idols, and pooja articles at trusted jewellers in Chakan since 1951.';
        canonicalUrl = `${baseDomain}/?category=silver`;
      } else {
        title = 'Jewellery Collections & Digital Catalogue in Chakan | Wafgaonkar Laxmi Jewellers';
        description =
          'Browse the complete jewellery catalogue of gold, diamond, bridal, and silver ornaments at Wafgaonkar Laxmi Jewellers, Chakan.';
        canonicalUrl = `${baseDomain}/?view=catalogue`;
      }
    }

    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attribute: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta Description & Robots
    setMetaTag('name', 'description', description);
    setMetaTag(
      'name',
      'robots',
      isNoIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 4. Update Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 5. Update Open Graph & Twitter Cards
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 6. Dynamic Product Schema Injection
    const existingProductSchema = document.getElementById('dynamic-product-jsonld');
    if (existingProductSchema) {
      existingProductSchema.remove();
    }

    if (currentView === 'product-detail' && product) {
      const script = document.createElement('script');
      script.id = 'dynamic-product-jsonld';
      script.type = 'application/ld+json';
      const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: isMr && product.marathiName ? product.marathiName : product.name,
        image: product.images && product.images.length > 0 ? product.images : [product.image],
        description: product.description || `${product.name} at Wafgaonkar Laxmi Jewellers, Chakan.`,
        category: product.category,
        brand: {
          '@type': 'Brand',
          name: 'Wafgaonkar Laxmi Jewellers',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: product.price || 0,
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'JewelryStore',
            name: 'Wafgaonkar Laxmi Jewellers',
          },
        },
      };
      script.textContent = JSON.stringify(productSchema);
      document.head.appendChild(script);
    }
  }, [currentView, categoryFilter, product, lang]);

  return null;
};
