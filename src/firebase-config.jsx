// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCDJeRs0xnDPVHNBbZiRAnYew6qViUH7E",
  authDomain: "agenda-sam.firebaseapp.com",
  projectId: "agenda-sam",
  storageBucket: "agenda-sam.appspot.com",
  messagingSenderId: "16885571190",
  appId: "1:16885571190:web:f8740404ab6140d70b4957",
  measurementId: "G-PRTRYQ71TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app); // exportamos la base de datos de firebase