import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
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

// Elementos
const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");
const userEmailSpan = document.getElementById("user-email");
const loginMsg = document.getElementById("login-msg");
const productList = document.getElementById("productList");

const emailLoginBtn = document.getElementById("email-login");
const emailRegisterBtn = document.getElementById("email-register");
const googleLoginBtn = document.getElementById("google-login");
const logoutBtn = document.getElementById("logout");

// Login com redirect Google
googleLoginBtn.addEventListener("click", () => {
  signInWithRedirect(auth, provider);
});

// Recupera resultado do redirect
getRedirectResult(auth)
  .then(result => {
    if(result && result.user) {
      showApp(result.user);
    }
  }).catch(err => alert(err.message));

// Login email/senha
emailLoginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  signInWithEmailAndPassword(auth,email,pass).catch(err => loginMsg.textContent = err.message);
});

// Cadastro email/senha
emailRegisterBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth,email,pass).catch(err => loginMsg.textContent = err.message);
});

// Logout
logoutBtn.addEventListener("click", () => signOut(auth));

// Detecta mudança de auth
onAuthStateChanged(auth, user => {
  if(user) showApp(user);
  else {
    loginContainer.classList.remove("hidden");
    appContainer.classList.add("hidden");
  }
});

// Mostrar app
function showApp(user){
  loginContainer.classList.add("hidden");
  appContainer.classList.remove("hidden");
  userEmailSpan.textContent = user.email;

  // Carregar produtos
  onValue(ref(db,"products"), snapshot => {
    productList.innerHTML = "";
    snapshot.forEach(child => {
      const prod = child.val();
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `<h3>${prod.name}</h3><p>${prod.desc || ""}</p><p><strong>R$ ${prod.price}</strong></p>
      <button onclick="window.open('https://wa.me/5548996354447?text=Quero%20comprar%20${encodeURIComponent(prod.name)}','_blank')">Comprar</button>`;
      productList.appendChild(div);
    });
  });
}
