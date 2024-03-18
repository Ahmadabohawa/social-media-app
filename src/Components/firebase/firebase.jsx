// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth,onAuthStateChanged} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkCKMvSX50bkygWEZx9V2sFWjaFAHCIDg",
  authDomain: "social-media-fe412.firebaseapp.com",
  projectId: "social-media-fe412",
  storageBucket: "social-media-fe412.appspot.com",
  messagingSenderId: "959063169448",
  appId: "1:959063169448:web:ce37a3ecf3407cdd7a259d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {auth,db,onAuthStateChanged}