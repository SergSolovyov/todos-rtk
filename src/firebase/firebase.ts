// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: "todo-56b8c.firebaseapp.com",
  projectId: "todo-56b8c",
  storageBucket: "todo-56b8c.appspot.com",
  messagingSenderId: "1068451981005",
  appId: "1:1068451981005:web:996324c48fe22488caeb84"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider();



