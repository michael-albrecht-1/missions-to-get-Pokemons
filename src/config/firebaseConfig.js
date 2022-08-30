// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// Here add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsuOnFtVWVlQa-JND5Kcx36vTEb0R7PHc",
  authDomain: "missions2getpokemons.firebaseapp.com",
  projectId: "missions2getpokemons",
  storageBucket: "missions2getpokemons.appspot.com",
  messagingSenderId: "436113489151",
  appId: "1:436113489151:web:a44cf684b7dadca116a0ca",
  measurementId: "G-9FLT40MYSM"
};

// Initialize Firebase
export default firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp)
export const analytics = getAnalytics(firebaseApp);