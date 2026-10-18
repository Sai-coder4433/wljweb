import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, writeBatch } from 'firebase/firestore';
import { firebaseConfig } from '../src/services/firebase';
import { PRODUCTS } from '../src/data/jewelleryData';
import { DEFAULT_HERO_SLIDES, DEFAULT_TESTIMONIALS, DEFAULT_RATES } from '../src/data/initialData';

async function main() {
  console.log('Connecting to Firebase project:', firebaseConfig.projectId);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log(`Seeding ${PRODUCTS.length} products to Firestore...`);
  const prodBatch = writeBatch(db);
  for (const product of PRODUCTS) {
    const docRef = doc(db, 'products', product.id);
    prodBatch.set(docRef, product, { merge: true });
  }
  await prodBatch.commit();
  console.log('✅ Products seeded successfully.');

  console.log(`Seeding ${DEFAULT_HERO_SLIDES.length} hero slides to Firestore...`);
  const heroBatch = writeBatch(db);
  for (const slide of DEFAULT_HERO_SLIDES) {
    const docRef = doc(db, 'hero_slides', String(slide.id));
    heroBatch.set(docRef, slide, { merge: true });
  }
  await heroBatch.commit();
  console.log('✅ Hero slides seeded successfully.');

  console.log(`Seeding ${DEFAULT_TESTIMONIALS.length} testimonials to Firestore...`);
  const testiBatch = writeBatch(db);
  for (const item of DEFAULT_TESTIMONIALS) {
    const docRef = doc(db, 'testimonials', String(item.id));
    testiBatch.set(docRef, item, { merge: true });
  }
  await testiBatch.commit();
  console.log('✅ Testimonials seeded successfully.');

  const { CATEGORIES } = await import('../src/data/jewelleryData');
  console.log(`Seeding ${CATEGORIES.length} categories to Firestore...`);
  const catBatch = writeBatch(db);
  for (const cat of CATEGORIES) {
    const docRef = doc(db, 'categories', cat.id);
    catBatch.set(docRef, cat, { merge: true });
  }
  await catBatch.commit();
  console.log('✅ Categories seeded successfully.');

  console.log('Setting daily rates...');
  const rateRef = doc(db, 'settings', 'daily_rates');
  await setDoc(rateRef, DEFAULT_RATES, { merge: true });
  console.log('✅ Daily rates initialized successfully.');

  console.log('🎉 ALL DATA SEEDED TO CLOUD FIRESTORE!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error seeding firestore:', err);
  process.exit(1);
});
