// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCeuNvRB1GXh9Mzg2tuGKFqxZ6rguWhets",
    authDomain: "dotted-memory-365920.firebaseapp.com",
    databaseURL: "https://dotted-memory-365920-default-rtdb.firebaseio.com",
    projectId: "dotted-memory-365920",
    storageBucket: "dotted-memory-365920.appspot.com",
    messagingSenderId: "655553924634",
    appId: "1:655553924634:web:498c128e46f39797c4cba3",
    measurementId: "G-9GZYNGK886"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
