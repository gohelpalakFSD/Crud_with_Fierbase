// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC6_cn4V3TPZMhI1YZsS9g4N1pgZKmq_TU",
  authDomain: "fir-crud-750db.firebaseapp.com",
  projectId: "fir-crud-750db",
  storageBucket: "fir-crud-750db.appspot.com",
  messagingSenderId: "869833709255",
  appId: "1:869833709255:web:d0aca90c6a935a848090e2",
  measurementId: "G-9XM8LX6SJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const db = getFirestore(app);
export {auth,Provider}