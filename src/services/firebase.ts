import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwDmUERxTSSH8_l3X7nfCbIbUBRugQ-Uo",
  authDomain: "projeto-tarefas-1.firebaseapp.com",
  projectId: "projeto-tarefas-1",
  storageBucket: "projeto-tarefas-1.appspot.com",
  messagingSenderId: "412232412466",
  appId: "1:412232412466:web:6530e86b452b32c76f7b2b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const auth = getAuth(app)
export { db }