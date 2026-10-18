import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  projectId: "wlj-jewellers-pune",
  appId: "1:335997406883:web:6808f15dd6b2245c6db916",
  storageBucket: "wlj-jewellers-pune.firebasestorage.app",
  apiKey: "AIzaSyD3q-RFRzIp1UL3Hcv3_tnH0SKxpRO1Rg0",
  authDomain: "wlj-jewellers-pune.firebaseapp.com",
  messagingSenderId: "335997406883",
  projectNumber: "335997406883"
};

// Initialize Firebase safely for SSR/Vite HMR
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
