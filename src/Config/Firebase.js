// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider, FacebookAuthProvider,  GithubAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1mh54lh6bx5xi4r0wRy8f8g8gab_Aqd4",
  authDomain: "bankingapp-18c5a-e734d.firebaseapp.com",
  projectId: "bankingapp-18c5a-e734d",
  storageBucket: "bankingapp-18c5a-e734d.firebasestorage.app",
  messagingSenderId: "593054355604",
  appId: "1:593054355604:web:9c945e94be14e311556481",
  measurementId: "G-3Y73WG9H1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
export {auth, analytics,firestore,provider,facebookProvider,githubProvider};
