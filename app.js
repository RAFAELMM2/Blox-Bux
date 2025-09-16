import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC3wm5X7fBXjC8hUQv4sRdHS-v74KWIBC4
",
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

// ---------------- Admin
const adminBtn = document.getElementById("admin-btn");
const adminPanel = document.getElementById("admin-panel");
const addProdBtn = document.getElementById("add-prod");
const prodName = document.getElementById("prod-name");
const prodDesc = document.getElementById("prod-desc");
const prodPrice = document.getElementById("prod-price");
const prodImg = document.getElementById("prod-img");
const productList = document.getElementById("productList");
const logoutBtn = document.getElementById("logout");

const admins = ["marymartins5821@gmail.com","jp9877475@gmail.com"];

onAuthStateChanged(auth,user=>{
  if(user){
    document.getElementById("user-email").textContent=user.email;
    if(admins.includes(user.email)) adminBtn.style.display="inline-block";
  }else window.location.href="login.html";
});

logoutBtn.addEventListener("click",()=>signOut(auth));

// Mostrar painel admin
adminBtn.addEventListener("click",()=> adminPanel.classList.toggle("hidden"));

// Adicionar produto
addProdBtn.addEventListener("click",()=>{
  if(!prodName.value || !prodPrice.value) return;
  push(ref(db,"products"),{
    name: prodName.value,
    desc: prodDesc.value,
    price: prodPrice.value,
    img: prodImg.value
  });
  prodName.value=""; prodDesc.value=""; prodPrice.value=""; prodImg.value="";
});

// Carregar produtos
const productsRef = ref(db,"products");
onValue(productsRef,snap=>{
  productList.innerHTML="";
  snap.forEach(child=>{
    const prod=child.val();
    const prodId=child.key;
    const div=document.createElement("div");
    div.className="product";
    div.innerHTML=`
      <h3>${prod.name}</h3>
      <p>${prod.desc || ""}</p>
      <p><strong>R$ ${prod.price}</strong></p>
      <button onclick="window.open('https://wa.me/5548996354447?text=Quero%20comprar%20${encodeURIComponent(prod.name)}','_blank')">Comprar</button>
    `;
    if(admins.includes(auth.currentUser.email)){
      const removeBtn=document.createElement("button");
      removeBtn.textContent="Remover";
      removeBtn.style.marginTop="5px";
      removeBtn.addEventListener("click",()=>remove(ref(db,`products/${prodId}`)));
      div.appendChild(removeBtn);
    }
    productList.appendChild(div);
  });
});
