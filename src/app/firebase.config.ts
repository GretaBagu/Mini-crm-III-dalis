
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAb92CWcc0FGqkw3WfBUfBKP1FWLtn8rYY",
  authDomain: "mini-crm3.firebaseapp.com",
  projectId: "mini-crm3",
  storageBucket: "mini-crm3.appspot.com",
  messagingSenderId: "1077226690560",
  appId: "1:1077226690560:web:9c67dd1ca6df37485420e5",
  measurementId: "G-YHE0TY8RQJ",
  databaseURL: "https://mini-crm3-default-rtdb.europe-west1.firebasedatabase.app"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);
export const analytics = getAnalytics(app); // jei reikia


export { firebaseConfig };
