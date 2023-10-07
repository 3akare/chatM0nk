import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgaVyhRr-HVSRX9Q-zpQ0D0lSXEe_8FlE",
  authDomain: "fir-demo-1dd65.firebaseapp.com",
  projectId: "fir-demo-1dd65",
  storageBucket: "fir-demo-1dd65.appspot.com",
  messagingSenderId: "871874380877",
  appId: "1:871874380877:web:cd68c52018f2510ff5c804",
};

// initialize app
const app = initializeApp(firebaseConfig);

// Get FireStore
const database = getFirestore();
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
let local = localStorage.getItem("chatMonkUser");

if (local === null) {
  signInwithGoogle();
}

function signInwithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      localStorage.setItem("chatMonkUser", JSON.stringify(result.user));
      location.reload();
      // console.log(result.user.displayName);
    })
    .catch((error) => {
      console.log(error);
    });
}

// signInwithGoogle();
// export const signIn = async () => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   const user = result.user;
//   // const credential = provider.credentialFromResult(auth, result);
//   const token = credential.accessToken;
//   return { user: user, token: token };
// };

//Gain Access to messages document
export const collectionRef = collection(database, "messages");

//Add messages
export async function addMessage(obj) {
  await addDoc(collectionRef, obj);
}
