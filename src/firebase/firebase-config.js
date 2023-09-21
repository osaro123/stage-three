// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo2vZa95TCHZbBXw64KKGqUI0Spjqe1-E",
  authDomain: "zuri-internship.firebaseapp.com",
  projectId: "zuri-internship",
  storageBucket: "zuri-internship.appspot.com",
  messagingSenderId: "944790991757",
  appId: "1:944790991757:web:18e92b164d6af9095683c4",
  measurementId: "G-M5BV4EHX89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { auth };