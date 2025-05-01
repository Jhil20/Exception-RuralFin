// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNvZw_sf1qk3vBg0dC4zoV6THtwgZW48c",
  authDomain: "ruralfin-2d4f0.firebaseapp.com",
  projectId: "ruralfin-2d4f0",
  storageBucket: "ruralfin-2d4f0.firebasestorage.app",
  messagingSenderId: "447881313890",
  appId: "1:447881313890:web:ba4d03a9e2b55d9a949b3b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
