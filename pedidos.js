import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const container = document.getElementById("containerPedidos");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

 const pedidosRef = collection(db, "usuarios", user.uid, "pedidos");
 const q = query(pedidosRef, orderBy("data", "desc"));
 const snapshot = await getDocs(q);

  if (snapshot.empty) {
    container.innerHTML = `<p class="mensagem-vazia">Você ainda não fez nenhum pedido.</p>`;
    return;
  }

  container.innerHTML = "";

  snapshot.forEach(doc => {
    const pedido = doc.data();
    const dataPedido = new Date(pedido.data).toLocaleDateString("pt-BR");

const total = pedido.total?.toFixed(2) || pedido.itens.reduce((sum, item) => sum + item.preco * item.quantidade, 0).toFixed(2);

const pedidoHTML = `
  <div class="pedido-card">
    <div class="pedido-data">Pedido feito em: ${dataPedido}</div>
    ${pedido.itens.map(item => `
      <div class="produto-item">
        <img src="${item.imagem || 'https://via.placeholder.com/60'}" alt="${item.nome}">
        <div class="produto-info">
          <h6>${item.nome}</h6>
          <span>${item.quantidade} x R$ ${item.preco.toFixed(2)}</span>
        </div>
      </div>
    `).join("")}
    <div style="text-align: right; margin-top: 10px; font-weight: bold; color: #1D2D44;">
      Total do pedido: R$ ${total}
    </div>
  </div>
`;

    container.innerHTML += pedidoHTML;
  });
});
