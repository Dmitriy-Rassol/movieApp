import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKcJF8Qnf4XGAz1FGGOIP5xrsJpcqjz1I",
  authDomain: "moviedb-vue3-7dad0.firebaseapp.com",
  projectId: "moviedb-vue3-7dad0",
  storageBucket: "moviedb-vue3-7dad0.appspot.com",
  messagingSenderId: "62720306120",
  appId: "1:62720306120:web:ab74ab64daca57bab4aefd"
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth }