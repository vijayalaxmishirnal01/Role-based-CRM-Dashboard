// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAchNwZV328nAei6hmkY7aVTsk4iQYu3Go",
  authDomain: "crm-dashboard-a167f.firebaseapp.com",
  projectId: "crm-dashboard-a167f",
  storageBucket: "crm-dashboard-a167f.firebasestorage.app",
  messagingSenderId: "385726277236",
  appId: "1:385726277236:web:198004333612f058c25321",
  measurementId: "G-10J92GNXPZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//  ADD THESE (VERY IMPORTANT)
export const auth = getAuth(app);
export const db = getFirestore(app);
