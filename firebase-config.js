import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
 apiKey: "AIzaSyBFRGf1SR2YZl3gZ2WZyz9XCHO-iZbuS7I",
  authDomain: "agrinhoanna2025.firebaseapp.com",
  projectId: "agrinhoanna2025",
  storageBucket: "agrinhoanna2025.firebasestorage.app",
  messagingSenderId: "1043257689981",
  appId: "1:1043257689981:web:e47f45da77879ee58dae14",
  measurementId: "G-2449L99B2V"
};

// Inicializa
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Persistência no localStorage
setPersistence(auth, browserLocalPersistence).then(() => {
  console.log("Sessão salva no navegador");
}).catch(console.error);

// Salvar pedido
async function salvarPedidoFirestore(pedido) {
  const user = auth.currentUser;
  if (!user) {
    mostrarToastPixLike("Você precisa estar logado.", "#266829");
     setTimeout(() => {
        window.location.href = redirect === "pedidos" ? "pedidos.html" : "index.html";
      }, 3000);
    return;
  }

  try {
    const pedidosRef = collection(db, "usuarios", user.uid, "pedidos");
    await addDoc(pedidosRef, pedido);
    console.log("Pedido salvo!");
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

// Exporta
export { auth, db, salvarPedidoFirestore, onAuthStateChanged };
