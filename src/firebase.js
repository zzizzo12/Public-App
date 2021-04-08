import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD-z3JWhl3fY_9I5qehm4OMTB3R58Bnau4",
    authDomain: "amashop-9071a.firebaseapp.com",
    projectId: "amashop-9071a",
    storageBucket: "amashop-9071a.appspot.com",
    messagingSenderId: "968420880331",
    appId: "1:968420880331:web:ca391d5ea921a44a59104e",
    measurementId: "G-NLJGXFQD29"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const dataBase = firebaseApp.firestore();
const auth = firebase.auth();

export { dataBase, auth }

