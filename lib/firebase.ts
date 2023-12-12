// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "drive-efb31.firebaseapp.com",
  projectId: "drive-efb31",
  storageBucket: "drive-efb31.appspot.com",
  messagingSenderId: "771457668173",
  appId: "1:771457668173:web:dd119792f4e41a313af804",
  measurementId: "G-3GXCEQ6YNR",
};

// Initialize Firebase
!getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { db, storage };
