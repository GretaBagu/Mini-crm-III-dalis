
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDSNFXE42jm6SpD_GPocBv8Vhxw4G_cJYg",
  authDomain: "zalioji-biblioteka.firebaseapp.com",
  projectId: "zalioji-biblioteka",
  storageBucket: "zalioji-biblioteka.firebasestorage.app",
  messagingSenderId: "198767492238",
  appId: "1:198767492238:web:fdde2af0e37c8e0ebf5ddf",
  measurementId: "G-4T04P5KP3B",
  databaseURL: "https://zalioji-biblioteka-default-rtdb.europe-west1.firebasedatabase.app"

};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);
export const analytics = getAnalytics(app); // jei reikia


export { firebaseConfig };
