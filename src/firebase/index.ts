// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { FirebaseResponse } from "./types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function saveOnDatabase(data: any) {
  try {
    await addDoc(collection(db, "answers"), data);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function getAnswers(): Promise<FirebaseResponse> {
  try {
    let result: any[] = [];
    let data = await getDocs(collection(db, `answers`));

    data.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));

    return {
      status: "success",
      data: result,
    };
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      data: [],
    };
  }
}

export { db, saveOnDatabase, getAnswers as getResponses };
