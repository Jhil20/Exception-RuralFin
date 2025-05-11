// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIYk3ryIXQYZmYJcdBuSkuE3Eo8cIJkSc",
  authDomain: "fintech123-71edc.firebaseapp.com",
  projectId: "fintech123-71edc",
  storageBucket: "fintech123-71edc.firebasestorage.app",
  messagingSenderId: "618705162099",
  appId: "1:618705162099:web:857b2832bcb6be61fb7f06",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Initialize auth here

export { app ,auth};
