// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-gsesITopusMVgTFzBI_L7667K78Oerg",
  authDomain: "hasta-notlari.firebaseapp.com",
  databaseURL: "https://hasta-notlari-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hasta-notlari",
  storageBucket: "hasta-notlari.appspot.com",
  messagingSenderId: "464432913687",
  appId: "1:464432913687:web:2b5bd5805c7f0acbd1ab52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);