// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvwf2YlP-Vc00ChLd1KK6PZNnoTMkmfJk",
  authDomain: "spaceologin.firebaseapp.com",
  projectId: "spaceologin",
  storageBucket: "spaceologin.appspot.com",
  messagingSenderId: "1003067121750",
  appId: "1:1003067121750:web:5ac1ab5747cb72408b5bf7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // Initialize Firestore
