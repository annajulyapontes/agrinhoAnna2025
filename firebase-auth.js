// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { mostrarToastPixLike } from './script.js';

// CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
 apiKey: "AIzaSyBFRGf1SR2YZl3gZ2WZyz9XCHO-iZbuS7I",
  authDomain: "agrinhoanna2025.firebaseapp.com",
  projectId: "agrinhoanna2025",
  storageBucket: "agrinhoanna2025.firebasestorage.app",
  messagingSenderId: "1043257689981",
  appId: "1:1043257689981:web:e47f45da77879ee58dae14",
  measurementId: "G-2449L99B2V"
};

// INICIALIZA
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// FORM DE CADASTRO
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // SALVAR NO FIRESTORE
      await setDoc(doc(db, "usuarios", user.uid), {
      nome: name,
      email: email,
      telefone: phone,
      pedidos: []
});

    mostrarToastPixLike("Usuário cadastrado com sucesso!", "#266829");
      setTimeout(() => {
        window.location.href = redirect === "pedidos" ? "pedidos.html" : "index.html";
      }, 3000);
    } catch (error) {
     mostrarToastPixLike("Erro ao cadastrar: " + traduzErroFirebase(error), "#266829");
    }
  });
}

// FORM DE LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("usuarioLogado", email);
      setTimeout(() => {
        window.location.href = redirect === "pedidos" ? "pedidos.html" : "index.html";
      }, 3000);
    } catch (error) {
    mostrarToastPixLike("Erro ao fazer login: " + traduzErroFirebase(error), "#266829");
    }
  });
}

export { auth, db };
