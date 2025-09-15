// Firebase modular (v10)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC3wm5X7fBXjC8hUQv4sRdHS-v74KWIBC4",
  authDomain: "blox-bux.firebaseapp.com",
  databaseURL: "https://blox-bux-default-rtdb.firebaseio.com",
  projectId: "blox-bux",
  storageBucket: "blox-bux.appspot.com",
  messagingSenderId: "2964601609",
  appId: "1:2964601609:web:67ee85c8174825aee471d8",
  measurementId: "G-W2BW6GDCSY"
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
