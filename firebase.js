// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import * as firebase from "firebase/app";
// import "firebase/auth";
import { getAuth } from "firebase/auth"; // Import getAuth function
// import "firebase/firestore";
import { getFirestore } from "firebase/firestore"; // Import getFirestore function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBskZETYqn9t_i19ExtxjaZw6htzQEP68U",
  authDomain: "signal-app-clone-9f928.firebaseapp.com",
  projectId: "signal-app-clone-9f928",
  storageBucket: "signal-app-clone-9f928.appspot.com",
  messagingSenderId: "725930019503",
  appId: "1:725930019503:web:bc5cde20454763649fa25a",
};

// let app;
// if (firebase.apps.length === 0) {
//   app = initializeApp(firebaseConfig);
//   // app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

const app = initializeApp(firebaseConfig);

// const db = app.firestore();
const db = getFirestore(app); // Initialize Firestore using getFirestore function
// const auth = app.auth();
const auth = getAuth(app); // Initialize Authentication using getAuth function

export { db, auth };
// Initialize Firebase

// # Deploy to Firebase Hosting
// You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

// Sign in to Google

// * firebase login

// Initiate your project
// Run this command from your app's root directory:

// * firebase init

// When you're ready, deploy your web app
// Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:

// * firebase deploy

// After deploying, view your app at signal-app-clone-9f928.web.app

// Need help? Check out the Hosting docs
