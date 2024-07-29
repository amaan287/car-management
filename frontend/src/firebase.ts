// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-41277.firebaseapp.com",
  projectId: "blog-app-41277",
  storageBucket: "blog-app-41277.appspot.com",
  messagingSenderId: "608421641121",
  appId: "1:608421641121:web:cf4bdcea1aa572400d69e0",
  measurementId: "G-8B08S263K5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
