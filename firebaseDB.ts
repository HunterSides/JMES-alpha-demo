import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA5oEIIA7EEcxATl_lTyhxtJ0UaoNVAIg",
  authDomain: "jmes-9b108.firebaseapp.com",
  projectId: "jmes-9b108",
  storageBucket: "jmes-9b108.appspot.com",
  messagingSenderId: "451073764233",
  appId: "1:451073764233:web:3087f45254ee24177e0f58",
  measurementId: "G-XGBEH8EXV2",
};

let myApp = initializeApp(firebaseConfig);

const firestore = getFirestore(myApp);

await setDoc(doc(firestore, "characters", "mario"), {
  employment: "plumber",
  outfitColor: "red",
  specialAttack: "fireball",
});
