// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW_5PEHvmRkdyjVrZ7dNKBOeipARQEDms",
  authDomain: "crud-application-6c039.firebaseapp.com",
  projectId: "crud-application-6c039",
  storageBucket: "crud-application-6c039.appspot.com",
  messagingSenderId: "88574968402",
  appId: "1:88574968402:web:838adf71d04888e9d1558b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore(app);
