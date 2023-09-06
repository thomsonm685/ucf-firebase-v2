import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC0khyTDesmxVSIsyEcMZ0f5GmrBxYi-Yw",
    authDomain: "ucf-hybrid.firebaseapp.com",
    projectId: "ucf-hybrid",
    storageBucket: "ucf-hybrid.appspot.com",
    messagingSenderId: "46376622295",
    appId: "1:46376622295:web:bfb8a6608b5053962f3892",
    measurementId: "G-VX213X989X"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
