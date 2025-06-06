import { auth, db } from './firebase-config.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { mostrarToastPixLike } from './script.js';

// Verifica redirecionamento após login
const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get("redirect");

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      mostrarToastPixLike("Login realizado com sucesso!", "#1D2D44");
      setTimeout(() => {
        window.location.href = redirect === "pedidos" ? "pedidos.html" : "index.html";
      }, 3000);
    } catch (error) {
      mostrarToastPixLike("Erro ao fazer login: " + traduzErroFirebase(error), "#1D2D44");
    }
  });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // GARANTIA: usar getElementById se necessário
    const nome = document.getElementById("name").value.trim();
    const telefone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salva dados adicionais no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome,
        telefone: telefone,
        email: email
      });

      mostrarToastPixLike("Usuário cadastrado com sucesso!", "#1D2D44");
      setTimeout(() => {
        window.location.href = redirect === "pedidos" ? "pedidos.html" : "index.html";
      }, 3000);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      mostrarToastPixLike("Erro ao cadastrar: " + traduzErroFirebase(error), "#1D2D44");
    }
  });
}

function traduzErroFirebase(error) {
  const msg = error?.code || "erro-desconhecido";
  switch (msg) {
    case "auth/email-already-in-use":
      return "Este email já está em uso.";
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email ou senha incorretos.";
    case "auth/too-many-requests":
      return "Você fez muitas tentativas.\nTente novamente mais tarde.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/network-request-failed":
      return "Erro de conexão com a internet.";
    default:
      return "Erro desconhecido: " + msg;
  }
}
