import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { firebaseConfig } from '../src/services/firebase';

async function testStorage() {
  console.log('Testing Firebase Storage for bucket:', firebaseConfig.storageBucket);
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const testRef = ref(storage, 'test_connection/hello.txt');
  console.log('Attempting upload to:', testRef.fullPath);
  
  try {
    const snapshot = await uploadString(testRef, 'Hello from Wafgaonkar Laxmi Jewellers Storage Test!', 'raw');
    console.log('Uploaded successfully! Snapshot metadata:', snapshot.metadata.fullPath);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log('✅ Storage Download URL:', downloadUrl);
    console.log('🎉 FIREBASE STORAGE TEST PASSED!');
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Storage upload failed:', err.code, err.message);
    process.exit(1);
  }
}

testStorage();
