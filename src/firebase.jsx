import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAc64CLdfiLMigo9BeaD0qsXWm41YhGKn4",
  authDomain: "pchat-1b341.firebaseapp.com",
  projectId: "pchat-1b341",
  storageBucket: "pchat-1b341.appspot.com",
  messagingSenderId: "335471472078",
  appId: "1:335471472078:web:d8f02adf91adedca904f9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
