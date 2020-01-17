import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAwkhTJ9SvbJgJ3xAgAxKpvN_MYHYLd0zo",
  authDomain: "ducki-89dbf.firebaseapp.com",
  databaseURL: "https://ducki-89dbf.firebaseio.com",
  projectId: "ducki-89dbf",
  storageBucket: "ducki-89dbf.appspot.com",
  messagingSenderId: "453228590381",
  appId: "1:453228590381:web:908f5e7f5daf4e04090fa4",
  measurementId: "G-GQ08HHB8WZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
