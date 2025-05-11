// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJChxT2ec76Rwd4C5BF5dGalM00rDvqvc",
  authDomain: "fintechruralfin.firebaseapp.com",
  projectId: "fintechruralfin",
  storageBucket: "fintechruralfin.firebasestorage.app",
  messagingSenderId: "900843249536",
  appId: "1:900843249536:web:e227dccebde552c21e2b65",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// auth.languageCode = 'it';

export { app ,auth};
