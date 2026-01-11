import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDN1S2Jl12eL8dT6f5wYpoWsmLlFWqhUss",
  authDomain: "poizdedge.firebaseapp.com",
  projectId: "poizdedge",
  storageBucket: "poizdedge.firebasestorage.app",
  messagingSenderId: "806561392566",
  appId: "1:806561392566:web:e425d5e3bb8ae566314317",
  measurementId: "G-07L9RK4NR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);