import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz64nkcR-7KjageQCHw1Aihh1DVthWroI",
  authDomain: "whatsapp-clone-b3780.firebaseapp.com",
  projectId: "whatsapp-clone-b3780",
  storageBucket: "whatsapp-clone-b3780.appspot.com",
  messagingSenderId: "247510833499",
  appId: "1:247510833499:web:5868cc1706030f4e5ae27e",
  measurementId: "G-LYDX19BCBK",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
