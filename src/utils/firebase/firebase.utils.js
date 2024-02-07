// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuRtrM6u9nZxKhCZuiJk-iqfKUitkEp3o",
  authDomain: "crwn-clothing-db-1b558.firebaseapp.com",
  projectId: "crwn-clothing-db-1b558",
  storageBucket: "crwn-clothing-db-1b558.appspot.com",
  messagingSenderId: "1099100996531",
  appId: "1:1099100996531:web:20b61f2615777d48ca41c6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);  console.log(userSnapshot.exists());console.log(userSnapshot.data());

  if (!userSnapshot.exists()) {
    //console.log(userAuth, "userAuth");
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
