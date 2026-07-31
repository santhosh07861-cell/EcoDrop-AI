import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDEjic6-86vewLpDdCM8VFDQNn58aMrL4Q",
  authDomain: "device-streaming-ccc13d80.firebaseapp.com",
  projectId: "device-streaming-ccc13d80",
  storageBucket: "device-streaming-ccc13d80.firebasestorage.app",
  messagingSenderId: "678212147617",
  appId: "1:678212147617:web:6d3dda19d073c015c213e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
