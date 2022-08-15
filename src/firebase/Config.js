import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCV3NcXq1_TFFRbPWilHY542tPZyKTZOnU",
  authDomain: "mymoney-b1611.firebaseapp.com",
  projectId: "mymoney-b1611",
  storageBucket: "mymoney-b1611.appspot.com",
  messagingSenderId: "962918195089",
  appId: "1:962918195089:web:571b63f1fac649c48ec430",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
