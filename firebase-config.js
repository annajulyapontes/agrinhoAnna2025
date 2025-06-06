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
  apiKey: "AIzaSyBDFf0J1h_RGEjEwsDJjciy1i_7Ogfh6og",
  authDomain: "projeto-talento-tech.firebaseapp.com",
  projectId: "projeto-talento-tech",
  storageBucket: "projeto-talento-tech.firebasestorage.app",
  messagingSenderId: "259096245135",
  appId: "1:259096245135:web:8620461b75fbee341551fa",
  measurementId: "G-020N00975M"
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
    mostrarToastPixLike("Você precisa estar logado.", "#1D2D44");
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
