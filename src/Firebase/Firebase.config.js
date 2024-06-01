// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3StBAem-ms-O2NPz6Yribt8WCr7F4EGc",
  authDomain: "employee-management-f9fe9.firebaseapp.com",
  projectId: "employee-management-f9fe9",
  storageBucket: "employee-management-f9fe9.appspot.com",
  messagingSenderId: "185615531048",
  appId: "1:185615531048:web:34f9202c7ad667528bc91d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;