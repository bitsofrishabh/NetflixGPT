// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu5wzl-u5xvDz66Jix-MJ1J6msXQ_A08U",
  authDomain: "netflixgpt-25dbb.firebaseapp.com",
  projectId: "netflixgpt-25dbb",
  storageBucket: "netflixgpt-25dbb.appspot.com",
  messagingSenderId: "262462480256",
  appId: "1:262462480256:web:46e3c819b38c1d89b9ab65",
  measurementId: "G-7VNP4BSM50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
