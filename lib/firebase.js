// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'insta-nextjs-425508.firebaseapp.com',
  projectId: 'insta-nextjs-425508',
  storageBucket: 'insta-nextjs-425508.appspot.com',
  messagingSenderId: '1097296062159',
  appId: '1:1097296062159:web:dc08202224f8ff8a4779ba',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
