import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgaVyhRr-HVSRX9Q-zpQ0D0lSXEe_8FlE",
  authDomain: "fir-demo-1dd65.firebaseapp.com",
  projectId: "fir-demo-1dd65",
  storageBucket: "fir-demo-1dd65.appspot.com",
  messagingSenderId: "871874380877",
  appId: "1:871874380877:web:cd68c52018f2510ff5c804",
};

// initialize app
initializeApp(firebaseConfig);

// Get FireStore
const database = getFirestore();

//Gain Access to messages document
export const collectionRef = collection(database, "messages");

//Add messages
export async function addMessage(obj) {
  await addDoc(collectionRef, obj);
}
