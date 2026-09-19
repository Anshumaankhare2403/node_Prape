// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEWXg3f9YxSOSHJ0kQxY9ImPLyf6bJNXc",
  authDomain: "otp-genrater.firebaseapp.com",
  projectId: "otp-genrater",
  storageBucket: "otp-genrater.firebasestorage.app",
  messagingSenderId: "666536910190",
  appId: "1:666536910190:web:f6efcedce001732ca7357f",
  measurementId: "G-YTQLR0ZL6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);