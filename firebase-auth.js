// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { mostrarToastPixLike } from './script.js';

// CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBDFf0J1h_RGEjEwsDJjciy1i_7Ogfh6og",
  authDomain: "projeto-talento-tech.firebaseapp.com",
  projectId: "projeto-talento-tech",
  storageBucket: "projeto-talento-tech.firebasestorage.app",
  messagingSenderId: "259096245135",
  appId: "1:259096245135:web:8620461b75fbee341551fa",
  measurementId: "G-020N00975M"
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

    mostrarToastPixLike("Usuário cadastrado com sucesso!", "#1D2D44");
      setTimeout(() => {
        window.location.href = redirect === "pedidos" ? "pedidos.html" : "index.html";
      }, 3000);
    } catch (error) {
     mostrarToastPixLike("Erro ao cadastrar: " + traduzErroFirebase(error), "#1D2D44");
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
    mostrarToastPixLike("Erro ao fazer login: " + traduzErroFirebase(error), "#1D2D44");
    }
  });
}

export { auth, db };
