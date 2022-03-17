import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFDRO-BRUUdlNuTGDDkmsYew_W6S64Ny4",
  authDomain: "mymoney-ce84b.firebaseapp.com",
  projectId: "mymoney-ce84b",
  storageBucket: "mymoney-ce84b.appspot.com",
  messagingSenderId: "924105914966",
  appId: "1:924105914966:web:8941adc62311b9bcba99f7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
