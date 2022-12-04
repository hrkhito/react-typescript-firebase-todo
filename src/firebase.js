import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm1VtLS7hnxa-zOFhcuDw5k6qYI7nO8BI",
  authDomain: "todo-af7bd.firebaseapp.com",
  projectId: "todo-af7bd",
  storageBucket: "todo-af7bd.appspot.com",
  messagingSenderId: "882579408160",
  appId: "1:882579408160:web:e7390e81d6644e2372c345"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };