import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAvN5FYavctE5fGBgkKdHUNjX--9lzACks",
  authDomain: "trotecotm.firebaseapp.com",
  projectId: "trotecotm",
  storageBucket: "trotecotm.appspot.com",
  messagingSenderId: "63406994923",
  appId: "1:63406994923:web:b943024511d07f630095ae",
  measurementId: "G-2WSVQ96EPW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, app, auth, googleProvider };

