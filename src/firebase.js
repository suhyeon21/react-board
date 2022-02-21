import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCapFIt1CtFhJMjFEY7O_OrYrkQ7s2L9Pw",
  authDomain: "board-e65cb.firebaseapp.com",
  projectId: "board-e65cb",
  storageBucket: "board-e65cb.appspot.com",
  messagingSenderId: "561207765229",
  appId: "1:561207765229:web:e859eead60e74cd12c84e4",
};

export default firebase.initializeApp(firebaseConfig);
