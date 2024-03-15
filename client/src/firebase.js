// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-blog-32c92.firebaseapp.com",
	projectId: "mern-blog-32c92",
	storageBucket: "mern-blog-32c92.appspot.com",
	messagingSenderId: "969484716940",
	appId: "1:969484716940:web:63a06913bed4f2989f24a9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
