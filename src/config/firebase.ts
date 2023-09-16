import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBrPlfIdzj-YSXHh5stkzqU642RNa-xW5k',
  authDomain: 'mobile-c2254.firebaseapp.com',
  projectId: 'mobile-c2254',
  storageBucket: 'mobile-c2254.appspot.com',
  messagingSenderId: '237614622753',
  appId: '1:237614622753:web:01838fb04d00e1e92cdb60',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_DB = getFirestore(app);
export const FIREBASE_PROVIDER = new GoogleAuthProvider();
// export const FIREBASE_DB = getDatabase();
