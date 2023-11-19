import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyD0tFRP2PHFNh0aS_p_Nap6xNtMqKcbdJc",
  authDomain: "eshop-649a7.firebaseapp.com",
  projectId: "eshop-649a7",
  storageBucket: "eshop-649a7.appspot.com",
  messagingSenderId: "152167710110",
  appId: "1:152167710110:web:246a98fc4d716e07ba2a8f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;