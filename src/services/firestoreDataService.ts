import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, HeroSlide, Testimonial, DailyRates, CategoryItem } from '../types';

// Collection references
const PRODUCTS_COLLECTION = 'products';
const CATEGORIES_COLLECTION = 'categories';
const HERO_COLLECTION = 'hero_slides';
const TESTIMONIALS_COLLECTION = 'testimonials';
const SETTINGS_COLLECTION = 'settings';

/* =========================================================================
   CATEGORIES
========================================================================= */

export function subscribeCategories(
  onUpdate: (categories: CategoryItem[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, CATEGORIES_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: CategoryItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as DocumentData;
        items.push({
          ...(data as CategoryItem),
          id: docSnap.id,
        });
      });
      onUpdate(items);
    },
    (err) => {
      console.warn('Firestore Categories subscription error:', err);
      if (onError) onError(err);
    }
  );
}

export async function saveCategory(category: CategoryItem): Promise<void> {
  const id = category.id || `cat-${Date.now()}`;
  const docRef = doc(db, CATEGORIES_COLLECTION, id);
  await setDoc(docRef, { ...category, id }, { merge: true });
}

export async function deleteCategory(categoryId: string): Promise<void> {
  const docRef = doc(db, CATEGORIES_COLLECTION, categoryId);
  await deleteDoc(docRef);
}

export async function seedCategoriesBatch(initialCategories: CategoryItem[]): Promise<number> {
  const batch = writeBatch(db);
  let count = 0;
  for (const cat of initialCategories) {
    const docRef = doc(db, CATEGORIES_COLLECTION, cat.id);
    batch.set(docRef, cat, { merge: true });
    count++;
  }
  await batch.commit();
  return count;
}


/* =========================================================================
   PRODUCTS
========================================================================= */

export function subscribeProducts(
  onUpdate: (products: Product[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: Product[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as DocumentData;
        items.push({
          ...(data as Product),
          id: docSnap.id,
        });
      });
      onUpdate(items);
    },
    (err) => {
      console.warn('Firestore Products subscription error:', err);
      if (onError) onError(err);
    }
  );
}

export async function saveProduct(product: Product): Promise<void> {
  const id = product.id || `prod-${Date.now()}`;
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  // Ensure id is stored inside document
  await setDoc(docRef, { ...product, id }, { merge: true });
}

export async function deleteProduct(productId: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, productId);
  await deleteDoc(docRef);
}

export async function seedProductsBatch(initialProducts: Product[]): Promise<number> {
  const batch = writeBatch(db);
  let count = 0;
  for (const item of initialProducts) {
    const docRef = doc(db, PRODUCTS_COLLECTION, item.id);
    batch.set(docRef, item, { merge: true });
    count++;
  }
  await batch.commit();
  return count;
}

/* =========================================================================
   HERO BANNER SLIDES
========================================================================= */

export function subscribeHeroSlides(
  onUpdate: (slides: HeroSlide[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, HERO_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: HeroSlide[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as DocumentData;
        items.push({
          ...(data as HeroSlide),
          id: docSnap.id,
        });
      });
      // Sort by order if present
      items.sort((a, b) => (Number(a.order ?? 0) - Number(b.order ?? 0)));
      onUpdate(items);
    },
    (err) => {
      console.warn('Firestore Hero Slides subscription error:', err);
      if (onError) onError(err);
    }
  );
}

export async function saveHeroSlide(slide: HeroSlide): Promise<void> {
  const id = String(slide.id || `slide-${Date.now()}`);
  const docRef = doc(db, HERO_COLLECTION, id);
  await setDoc(docRef, { ...slide, id }, { merge: true });
}

export async function deleteHeroSlide(slideId: string | number): Promise<void> {
  const docRef = doc(db, HERO_COLLECTION, String(slideId));
  await deleteDoc(docRef);
}

export async function seedHeroSlidesBatch(initialSlides: HeroSlide[]): Promise<number> {
  const batch = writeBatch(db);
  let count = 0;
  for (let i = 0; i < initialSlides.length; i++) {
    const slide = initialSlides[i];
    const id = String(slide.id || `slide-${i + 1}`);
    const docRef = doc(db, HERO_COLLECTION, id);
    batch.set(docRef, { ...slide, id, order: i + 1 }, { merge: true });
    count++;
  }
  await batch.commit();
  return count;
}

/* =========================================================================
   TESTIMONIALS
========================================================================= */

export function subscribeTestimonials(
  onUpdate: (testimonials: Testimonial[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, TESTIMONIALS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: Testimonial[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as DocumentData;
        items.push({
          ...(data as Testimonial),
          id: docSnap.id,
        });
      });
      onUpdate(items);
    },
    (err) => {
      console.warn('Firestore Testimonials subscription error:', err);
      if (onError) onError(err);
    }
  );
}

export async function saveTestimonial(testimonial: Testimonial): Promise<void> {
  const id = String(testimonial.id || `testi-${Date.now()}`);
  const docRef = doc(db, TESTIMONIALS_COLLECTION, id);
  await setDoc(docRef, { ...testimonial, id }, { merge: true });
}

export async function deleteTestimonial(testimonialId: string | number): Promise<void> {
  const docRef = doc(db, TESTIMONIALS_COLLECTION, String(testimonialId));
  await deleteDoc(docRef);
}

export async function seedTestimonialsBatch(initialTestimonials: Testimonial[]): Promise<number> {
  const batch = writeBatch(db);
  let count = 0;
  for (let i = 0; i < initialTestimonials.length; i++) {
    const item = initialTestimonials[i];
    const id = String(item.id || `testi-${i + 1}`);
    const docRef = doc(db, TESTIMONIALS_COLLECTION, id);
    batch.set(docRef, { ...item, id }, { merge: true });
    count++;
  }
  await batch.commit();
  return count;
}

/* =========================================================================
   DAILY RATES
========================================================================= */

export function subscribeRates(
  onUpdate: (rates: DailyRates) => void,
  onError?: (err: Error) => void
) {
  const docRef = doc(db, SETTINGS_COLLECTION, 'daily_rates');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as DailyRates);
      }
    },
    (err) => {
      console.warn('Firestore Rates subscription error:', err);
      if (onError) onError(err);
    }
  );
}

export async function updateDailyRates(rates: DailyRates): Promise<void> {
  const docRef = doc(db, SETTINGS_COLLECTION, 'daily_rates');
  await setDoc(docRef, rates, { merge: true });
}

/* =========================================================================
   SECURITY & AUTH SETTINGS
========================================================================= */

export function subscribeAuthPassword(
  onUpdate: (password: string) => void,
  onError?: (err: Error) => void
) {
  const docRef = doc(db, SETTINGS_COLLECTION, 'security');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (data && data.adminPassword) {
          onUpdate(data.adminPassword);
        }
      }
    },
    (err) => {
      console.warn('Firestore security subscription error:', err);
      if (onError) onError(err);
    }
  );
}

export async function updateAuthPassword(newPassword: string): Promise<void> {
  const docRef = doc(db, SETTINGS_COLLECTION, 'security');
  await setDoc(docRef, { adminPassword: newPassword, updatedAt: new Date().toISOString() }, { merge: true });
}

