// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDFf0J1h_RGEjEwsDJjciy1i_7Ogfh6og",
  authDomain: "projeto-talento-tech.firebaseapp.com",
  projectId: "projeto-talento-tech",
  storageBucket: "projeto-talento-tech.firebasestorage.app",
  messagingSenderId: "259096245135",
  appId: "1:259096245135:web:8620461b75fbee341551fa",
  measurementId: "G-020N00975M"
};
import { mostrarToastPixLike } from './script.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
       mostrarToastPixLike('Login realizado com sucesso!', "#1D2D44");
       setTimeout(() => {
        window.location.href = redirect === "pedidos" ? "pedidos.html" : "index.html";
      }, 3000);
      })
      .catch(error => {
        mostrarToastPixLike('Erro ao fazer login: ', "#1D2D44" + traduzErroFirebase(error));
      });
  });
}

// CADASTRO
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        mostrarToastPixLike('Cadastro realizado com sucesso!', "#1D2D44");
       setTimeout(() => {
        window.location.href = redirect === "pedidos" ? "pedidos.html" : "index.html";
      }, 3000);
      })
      .catch(error => {
        mostrarToastPixLike('Erro ao cadastrar: ',"#1D2D44" + traduzErroFirebase(error));
      });
  });
}

// SALVAR PEDIDOS
export async function salvarPedidoNoFirestore(pedido) {
  const user = auth.currentUser;
  if (!user) {
    mostrarToastPixLike("Você precisa estar logado para salvar pedidos.", "#1D2D44");
    return;
  }

  const pedidoData = {
    ...pedido,
    email: user.email,
    data: new Date()
  };

  try {
    await addDoc(collection(db, "pedidos", user.uid, "itens"), pedidoData);
    console.log("Pedido salvo com sucesso");
  } catch (e) {
    console.error("Erro ao salvar pedido: ", + traduzErroFirebase(error));
  }
}
