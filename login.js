import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase, ref, onValue, push, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ------------------------
const firebaseConfig = {
  apiKey: "AIzaSyC3wm5X7fBXjC8hUQv4sRdHS-v74KWIBC4
", // COLE A API KEY CORRETA
  authDomain: "blox-bux.firebaseapp.com",
  databaseURL: "https://blox-bux-default-rtdb.firebaseio.com",
  projectId: "blox-bux",
  storageBucket: "blox-bux.appspot.com",
  messagingSenderId: "2964601609",
  appId: "1:2964601609:web:67ee85c8174825aee471d8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

// ------------------------
// Elementos DOM
const loginMsg = document.getElementById("login-msg");
const emailLoginBtn = document.getElementById("email-login");
const emailRegisterBtn = document.getElementById("email-register");
const googleLoginBtn = document.getElementById("google-login");

// ------------------------
// Login Google
googleLoginBtn.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});
getRedirectResult(auth)
  .then(result => {
    if (result && result.user) window.location.href="index.html";
  })
  .catch(err => loginMsg.textContent = err.message);

// ------------------------
// Email/Senha
emailLoginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  signInWithEmailAndPassword(auth,email,pass)
    .then(()=> window.location.href="index.html")
    .catch(err=>loginMsg.textContent=err.message);
});

emailRegisterBtn.addEventListener("click", ()=>{
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth,email,pass)
    .then(()=> window.location.href="index.html")
    .catch(err=>loginMsg.textContent=err.message);
});
