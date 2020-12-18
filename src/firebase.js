import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB4J0aEdXshOi3lW9iqhmUD7PQ_om6PR38",
  authDomain: "todo-app-b99c0.firebaseapp.com",
  projectId: "todo-app-b99c0",
  storageBucket: "todo-app-b99c0.appspot.com",
  messagingSenderId: "112852115769",
  appId: "1:112852115769:web:4913b7bc0910e35f9288e8",
  measurementId: "G-NMS1DK87NZ"
});

const db = firebaseApp.firestore();
//const auth = firebase.auth();
//const storage = firebase.storage();

export default db; //auth, storage};