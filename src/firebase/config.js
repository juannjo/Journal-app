import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyDksCJuRQBMESoSDHY2-5i8hUy0snufuh4",
  authDomain: "my-react-journal.firebaseapp.com",
  projectId: "my-react-journal",
  storageBucket: "my-react-journal.appspot.com",
  messagingSenderId: "541466252624",
  appId: "1:541466252624:web:f244b4cac38f128af08855"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirestoreDB = getFirestore( FirebaseApp )