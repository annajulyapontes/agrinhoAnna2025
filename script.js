import { auth, db, salvarPedidoFirestore } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

console.log("Script.js carregado com sucesso");

const produtos = [
  { nome: 'Maçã', preco: 13.98, categoria: 'frutas', imagem: 'img/maça.jpg', unidade: 'kg' },
  { nome: 'Laranja', preco: 6.98, categoria: 'frutas', imagem: 'img/laranja.jpg', unidade: 'kg' },
  { nome: 'Caqui', preco: 9.98, categoria: 'frutas', imagem: 'img/caqui.jpg', unidade: 'kg' },
  { nome: 'Manga', preco: 9.98, categoria: 'frutas', imagem: 'img/manga.jpg', unidade: 'kg' },
  { nome: 'Abacaxi', preco: 8.98, categoria: 'frutas', imagem: 'img/abacaxi.jpg', unidade: 'un' },
  { nome: 'Pepino', preco: 5.98, categoria: 'verduras', imagem: 'img/pepino.jpg', unidade: 'kg' },
  { nome: 'Pepino Japonês', preco: 5.98, categoria: 'verduras', imagem: 'img/pepino japonês.jpg', unidade: 'kg' },
  { nome: 'Pitaya', preco: 16.98, categoria: 'frutas', imagem: 'img/pitaya.jpg', unidade: 'kg' },
  { nome: 'Ponkan', preco: 5.98, categoria: 'frutas', imagem: 'img/ponkan.jpg', unidade: 'kg' },
  { nome: 'Goiaba', preco: 4.00, categoria: 'frutas', imagem: 'img/goiaba.jpg', unidade: 'kg' },
  { nome: 'Limão', preco: 5.50, categoria: 'frutas', imagem: 'img/limão.jpg', unidade: 'kg' },
  { nome: 'Tomate', preco: 9.98, categoria: 'verduras', imagem: 'img/tomate.jpg', unidade: 'kg' },
  { nome: 'Chuchu', preco: 6.98, categoria: 'verduras', imagem: 'img/chuchu.jpg', unidade: 'kg' },
  { nome: 'Inhame', preco: 9.98, categoria: 'verduras', imagem: 'img/inhame.jpg', unidade: 'kg' },
  { nome: 'Beterraba', preco: 5.98, categoria: 'verduras', imagem: 'img/beterraba.jpg', unidade: 'kg' },
  { nome: 'Cebola', preco: 3.98, categoria: 'verduras', imagem: 'img/cebola.jpg', unidade: 'kg' },
  { nome: 'Cebola Roxa', preco: 9.98, categoria: 'verduras', imagem: 'img/cebola roxa.jpg', unidade: 'kg' },
  { nome: 'Repolho', preco: 3.98, categoria: 'verduras', imagem: 'img/repolho.jpg', unidade: 'un' },
  { nome: 'Repolho Roxo', preco: 5.98, categoria: 'verduras', imagem: 'img/repolho roxo.jpg', unidade: 'un' },
  { nome: 'Abóbora Cabotiá', preco: 5.98, categoria: 'verduras', imagem: 'img/cabotiá.jpg', unidade: 'un' },
  { nome: 'Couve', preco: 7.98, categoria: 'verduras', imagem: 'img/couve.jpg', unidade: 'kg' },
  { nome: 'Batata', preco: 7.98, categoria: 'verduras', imagem: 'img/batata.jpg', unidade: 'kg' },
  { nome: 'Batata Doce Roxa', preco: 4.98, categoria: 'verduras', imagem: 'img/batata doce.jpg', unidade: 'kg' },
  { nome: 'Cenoura', preco: 5.98, categoria: 'verduras', imagem: 'img/cenoura.jpg', unidade: 'kg' },
  { nome: 'Pão', preco: 15, categoria: 'artesanais', imagem: 'img/pão.jpg', unidade: 'un' },
  { nome: 'Queijo', preco: 30, categoria: 'artesanais', imagem: 'img/queijo.jpg', unidade: 'un' },
  { nome: 'Bolo de Chocolate', preco: 35, categoria: 'artesanais', imagem: 'img/Bolo de chocolate.jpg', unidade: 'un' },
  { nome: 'Empadão de Frango', preco: 35, categoria: 'artesanais', imagem: 'img/empadão de frango.jpg', unidade: 'un' },
  { nome: 'Torta de Maracujá', preco: 35, categoria: 'artesanais', imagem: 'img/torta de maracujá.jpg', unidade: 'un' },
  { nome: 'Doce de Leite', preco: 10.00, categoria: 'artesanais', imagem: 'img/doce de leite.jpg', unidade: 'un' },
  { nome: 'Maracujá', preco: 11.98, categoria: 'frutas', imagem: 'img/maracuja.jpg', unidade: 'kg' },
  { nome: 'Acerola', preco: 15.98, categoria: 'frutas', imagem: 'img/acerola.jpg', unidade: 'kg' },
  { nome: 'Bolo Red Velvet', preco: 35, categoria: 'artesanais', imagem: 'img/bolo red velvet.jpg', unidade: 'un' },
  { nome: 'Bolo de Cenoura com cobertura de chocolate', preco: 35, categoria: 'artesanais', imagem: 'img/bolo de cenoura com cobertura de chocolate.jpg', unidade: 'un' },
  { nome: 'Bolo de Limão', preco: 35, categoria: 'artesanais', imagem: 'img/bolo de limão.jpg', unidade: 'un' },
  { nome: 'Bolo de Laranja com Coco', preco: 35, categoria: 'artesanais', imagem: 'img/bolo.jpg', unidade: 'un' },
  { nome: 'Brigadeiro Cremoso', preco: 13.99, categoria: 'artesanais', imagem: 'img/brigadeiro cremoso.jpg', unidade: 'un' },
  { nome: 'Pé de Moça Cremoso', preco: 13.99, categoria: 'artesanais', imagem: 'img/pé de moça cremoso.jpg', unidade: 'un' },
  { nome: 'Doce de Abóbora', preco: 5.98, categoria: 'artesanais', imagem: 'img/doce de abobora.jpg', unidade: '200g' },
  { nome: 'Uva', preco: 12.98, categoria: 'frutas', imagem: 'img/uva.jpg', unidade: 'kg' },
  { nome: 'Morango', preco: 38.98, categoria: 'frutas', imagem: 'img/morango.jpg', unidade: 'kg' },
  { nome: 'Pera', preco: 8.98, categoria: 'frutas', imagem: 'img/pera.jpg', unidade: 'kg' },
  { nome: 'Quiabo', preco: 10.08, categoria: 'verduras', imagem: 'img/quiabo.jpg', unidade: 'kg' },
  { nome: 'Melancia Inteira', preco: 2.98, categoria: 'frutas', imagem: 'img/melancia inteira.jpg', unidade: 'kg' },
  { nome: '1/4 da Melancia', preco: 2.98, categoria: 'frutas', imagem: 'img/melancia 1 parte.jpg', unidade: 'kg' },
  { nome: 'Berinjela', preco: 10.98, categoria: 'verduras', imagem: 'img/berinjela.jpg', unidade: 'kg' },
  { nome: 'Coco', preco: 5.98, categoria: 'frutas', imagem: 'img/coco.jpg', unidade: 'kg' },
  { nome: 'Abobrinha', preco: 7.98, categoria: 'verduras', imagem: 'img/abobrinha.jpg', unidade: 'kg' },
  { nome: 'Alho', preco: 36.98, categoria: 'verduras', imagem: 'img/alho.jpg', unidade: 'kg' },
  { nome: 'Banana', preco: 5.98, categoria: 'frutas', imagem: 'img/banana.jpg', unidade: 'kg' },
];

let carrinho = [];

function renderizarProdutos() { 
  console.log("Função renderizarProdutos chamada");
  
  produtos.forEach((p, index) => {
    // ⚠️ PULA produtos marcados como promoção
    if (p.emPromocao) return;

    const categoriaDiv = document.getElementById(p.categoria);
    if (!categoriaDiv) return;

    categoriaDiv.innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img src="${p.imagem || 'https://via.placeholder.com/150'}" class="card-img-top produto-img" alt="${p.nome}">
          <div class="card-body">
            <h5 class="card-title">${p.nome}</h5>
            <p class="card-text">
              R$ ${p.preco.toFixed(2)} <span class="unidade">${p.unidade || 'kg'}</span>
            </p>
            <div class="input-group mb-2">
              <button class="btn btn-outline-secondary" onclick="alterarQuantidade(${index}, -1)">-</button>
              <input type="number" id="qtd-${index}" class="form-control text-center" value="1" min="1">
              <button class="btn btn-outline-secondary" onclick="alterarQuantidade(${index}, 1)">+</button>
            </div>
            <button class="btn btn-primary w-100" onclick="adicionarCarrinho(${index})">Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>`;
  });
}


function alterarQuantidade(index, delta) {
  const input = document.getElementById(`qtd-${index}`);
  let valor = parseInt(input.value);
  valor = isNaN(valor) ? 1 : valor + delta;
  input.value = Math.max(1, valor);
}

function adicionarCarrinho(index) {
  console.log('Adicionando produto ao carrinho:', produtos[index]);

  const qtd = parseInt(document.getElementById(`qtd-${index}`).value);
  const item = produtos[index];
  const existente = carrinho.find(p => p.nome === item.nome);

  if (existente) {
    existente.quantidade += qtd;
  } else {
    carrinho.push({
      nome: item.nome,
      preco: item.preco,
      imagem: item.imagem,
      unidade: item.unidade,
      quantidade: qtd
    });
  }

  atualizarCarrinho();

  // ✅ Animação no ícone do carrinho
  const icone = document.getElementById('btnCarrinho');
  if (icone) {
    icone.classList.add('animado');
    setTimeout(() => icone.classList.remove('animado'), 400);
  }
}


function atualizarCarrinho() {
  const div = document.getElementById('listaCarrinho');
  div.innerHTML = '';
  let total = 0;
  let totalItens = 0;

  if (carrinho.length === 0) {
    div.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <i class="bi bi-emoji-frown" style="font-size: 60px; color: #1D2D44; margin-bottom: 10px;"></i>
        <div style="font-size: 1.2rem; font-weight: bold; color: #1D2D44;">Seu carrinho está vazio</div>
        <div style="font-size: 0.9rem; color: #555;">Adicione produtos para começar sua compra!</div>
      </div>
    `;
  } else {
    carrinho.forEach((item, index) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;
      totalItens += item.quantidade;

      div.innerHTML += `
        <div class="item-carrinho">
          <button class="remove-btn" onclick="removerItemCarrinho(${index})">&times;</button>
          <img src="${item.imagem || 'https://via.placeholder.com/60'}" alt="${item.nome}">
          
          <div class="item-carrinho-conteudo">
            <div class="item-carrinho-info">
              <h6>${item.nome}</h6>
              <p>${item.quantidade} ${item.unidade} x R$ ${item.preco.toFixed(2)}</p>
            </div>
            <div class="item-carrinho-controls">
              <button onclick="alterarQuantidadeCarrinho(${index}, -1)">−</button>
              <span>${item.quantidade}</span>
              <button onclick="alterarQuantidadeCarrinho(${index}, 1)">+</button>
            </div>
          </div>
        </div>
      `;
    });
  }

  document.getElementById('valorTotal').innerText = `R$ ${total.toFixed(2)}`;

  // Atualiza contador visual no ícone do carrinho
  const contador = document.getElementById('contadorCarrinho');
  contador.innerText = totalItens;
  contador.style.display = totalItens > 0 ? 'inline-block' : 'none';
}

function alterarQuantidadeCarrinho(index, delta) {
  let item = carrinho[index];
  item.quantidade += delta;
  if (item.quantidade < 1) item.quantidade = 1;
  atualizarCarrinho();
}

function removerItemCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

async function finalizarCompraSite() {
  const user = auth.currentUser;

  if (!user) {
   mostrarToastPixLike("Você precisa estar logado para finalizar a compra.", "#3E5C76");
    setTimeout(() => {
    window.location.href = "login.html";
  }, 2500);
    return;
  }
  // ✅ INSIRA ESTA VERIFICAÇÃO LOGO AQUI:
  if (carrinho.length === 0) {
    mostrarToastPixLike("Seu carrinho está vazio. Adicione algum produto antes de finalizar a compra!", "#3E5C76");
    return;
  }

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const pedido = {
    data: new Date().toISOString(),
    total: total,
    itens: carrinho.map(item => ({
      nome: item.nome,
      quantidade: item.quantidade,
      preco: item.preco,
      imagem: item.imagem,
      unidade: item.unidade
    }))
  };

  try {
    await salvarPedidoFirestore(pedido); // salva no Firestore
    document.getElementById("valorPixModal").innerText = `R$ ${total.toFixed(2)}`;
    const modal = new bootstrap.Modal(document.getElementById('modalPix'));
    modal.show();
    carrinho = [];
    atualizarCarrinho();
  } catch (error) {
    console.error("Erro ao salvar pedido:", error);
    mostrarToastPixLike("Erro ao registrar o pedido. Tente novamente.", "#3E5C76");
  }
}
async function finalizarCompraWhatsapp() {
  const user = auth.currentUser;

  if (!user) {
    mostrarToastPixLike("Você precisa estar logado para finalizar a compra.", "#3E5C76");
     setTimeout(() => {
    window.location.href = "login.html";
  }, 2500);
    return;
  }
  // ✅ BARRAR CARRINHO VAZIO:
  if (carrinho.length === 0) {
    mostrarToastPixLike("Seu carrinho está vazio. Adicione algum produto antes de finalizar a compra!", "#D9534F");
    return;
  }

  const pedido = {
    data: new Date().toISOString(),
    total: carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
    itens: carrinho.map(item => ({
      nome: item.nome,
      quantidade: item.quantidade,
      preco: item.preco,
      imagem: item.imagem,
      unidade: item.unidade
    }))
  };

  try {
    await salvarPedidoFirestore(pedido);
    console.log("Pedido salvo com sucesso no Firebase (WhatsApp)");

    // 🔍 Busca dados do usuário
    const userRef = doc(db, "usuarios", user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : {};

    const nome = userData.nome;
    const whatsapp = userData.telefone;
    const email = user.email;

    // 📦 Monta mensagem formatada
    let mensagem = `Olá, *${nome}*!\n\n`;
    mensagem += `*Nome:* ${nome}\n`;
    mensagem += `*Número de Telefone:* ${whatsapp}\n`;
    mensagem += `*Email:* ${email}\n\n`;
    mensagem += `*Produtos:*\n`;

    pedido.itens.forEach(item => {
      const totalItem = item.quantidade * item.preco;
      mensagem += `${item.quantidade} ${item.unidade} ${item.nome}\nValor por ${item.unidade}: R$${item.preco.toFixed(2)} | Total: R$${totalItem.toFixed(2)}\n\n`;
    });

    mensagem += `Total: R$${pedido.total.toFixed(2)}`;

    // 🔗 Gera link
    const url = `https://wa.me/5543998100215?text=${encodeURIComponent(mensagem)}`;

    // ✅ Limpa carrinho
    carrinho = [];
    atualizarCarrinho();

    // 🔄 Abre o WhatsApp
   // 🔄 Abre o WhatsApp (forçando o app em mobile)
if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = `https://api.whatsapp.com/send?phone=5543998100215&text=${encodeURIComponent(mensagem)}`;
} else {
    window.open(url, '_blank');
}


  } catch (error) {
    console.error("Erro ao salvar o pedido:", error);
    mostrarToast("Erro ao salvar o pedido. Tente novamente.", "bg-danger");
  }
}


function alternarCarrinho() {
  const painel = document.getElementById('painelCarrinho');
  painel.style.display = (painel.style.display === 'none' || painel.style.display === '') ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const btnLogin = document.getElementById('btnLogin');
  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
  
function renderizarPromocoesAleatorias() {
  const div = document.getElementById('promocoesDoDia');
  if (!div) return;

  // Geração de seed fixa com base na data (ano + mês + dia)
  const hoje = new Date();
  const seed = hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();

  function seededShuffle(array, seed) {
    let arr = array.slice();
    let random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const embaralhados = seededShuffle(produtos, seed);
  const promocoes = embaralhados.slice(0, 8);

  promocoes.forEach((p) => {
    const precoPromocional = Math.max(p.preco - 3.50, 0.01);
    const index = produtos.indexOf(p);

    div.innerHTML += `
  <div class="card">
    <div class="badge-promocao">Promoção</div>
    <img src="${p.imagem}" class="card-img-top produto-img" alt="${p.nome}">
    <div class="card-body">
      <h5 class="card-title">${p.nome}</h5>
      <p class="card-text preco-promocao">R$ ${precoPromocional.toFixed(2)} <span class="unidade">${p.unidade}</span></p>
      <div class="input-group mb-2">
        <button class="btn btn-outline-secondary" onclick="alterarQuantidadePromo(${index}, -1)">-</button>
        <input type="number" id="qtd-promo-${index}" class="form-control text-center" value="1" min="1">
        <button class="btn btn-outline-secondary" onclick="alterarQuantidadePromo(${index}, 1)">+</button>
      </div>
      <button class="btn btn-primary w-100" onclick="adicionarCarrinhoPromo(${index}, ${precoPromocional})">Adicionar ao Carrinho</button>
    </div>
  </div>`;

  });

  // Scroll limitado horizontal
  let scrollX = 0;
  const scrollStep = 270;
  const container = document.getElementById('promocoesDoDia');
  const wrapper = document.getElementById('promocoesWrapper');

  document.getElementById('btnNextPromo').addEventListener('click', () => {
    const maxScroll = container.scrollWidth - wrapper.clientWidth;
    scrollX = Math.max(scrollX - scrollStep, -maxScroll);
    container.style.transform = `translateX(${scrollX}px)`;
  });

  document.getElementById('btnPrevPromo').addEventListener('click', () => {
    scrollX = Math.min(scrollX + scrollStep, 0);
    container.style.transform = `translateX(${scrollX}px)`;
  });

  promocoes.forEach((p) => {
  p.emPromocao = true;
});

}

 atualizarCarrinho();
 renderizarPromocoesAleatorias(); // primeiro, define os emPromocao = true
 renderizarProdutos();            // depois, gera só os que NÃO estão em promoção



  // Categorias
  document.querySelectorAll('.categoria-link').forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.categoria-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Busca
  const lupaBtn = document.getElementById('btnLupa');
  const campoBusca = document.getElementById('campoBusca');
  if (lupaBtn && campoBusca) {
    lupaBtn.addEventListener('click', () => {
      campoBusca.classList.toggle('d-none');
      campoBusca.focus();
    });

    campoBusca.addEventListener('input', function (e) {
      const termo = e.target.value.toLowerCase();
      document.querySelectorAll('.card').forEach(card => {
        const titulo = card.querySelector('.card-title').textContent.toLowerCase();
        card.style.display = titulo.includes(termo) ? 'block' : 'none';
      });
    });
  }

  // Carrinho
  const btnCarrinho = document.getElementById('btnCarrinho');
  if (btnCarrinho) {
    btnCarrinho.addEventListener('click', () => {
      alternarCarrinho();
    });
  }

  // Menu lateral
  const abrirMenu = document.getElementById('abrirMenu');
  if (abrirMenu) {
    abrirMenu.addEventListener('click', function () {
      const menu = new bootstrap.Offcanvas(document.getElementById('menuLateral'));
      menu.show();
    });
  }
document.querySelectorAll('.menu-lateral a').forEach(link => {
  link.addEventListener('click', function (e) {
    const destino = this.getAttribute('href');

    const menuElement = document.getElementById('menuLateral');
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(menuElement);

    if (offcanvasInstance) {
      offcanvasInstance.hide();

      // Aguarda o evento de fechamento completo
      menuElement.addEventListener('hidden.bs.offcanvas', function handler() {
        // Remove este listener depois de rodar
        menuElement.removeEventListener('hidden.bs.offcanvas', handler);

        // ✅ Remove backdrop manualmente
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        document.body.classList.remove('offcanvas-backdrop', 'modal-open');
        document.body.style.overflow = '';

        if (destino && destino.startsWith('#')) {
          const alvo = document.querySelector(destino);
          if (alvo) {
            alvo.scrollIntoView({ behavior: 'smooth' });
          }
        } else if (destino) {
          window.location.href = destino;
        }
      });
    } else {
      // Caso não esteja no offcanvas, redireciona direto
      if (destino && destino.startsWith('#')) {
        const alvo = document.querySelector(destino);
        if (alvo) {
          alvo.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (destino) {
        window.location.href = destino;
      }
    }
  });
});


});


function alterarQuantidadePromo(index, delta) {
  const input = document.getElementById(`qtd-promo-${index}`);
  let valor = parseInt(input.value);
  valor = isNaN(valor) ? 1 : valor + delta;
  input.value = Math.max(1, valor);
}

function adicionarCarrinhoPromo(index, precoPromocional) {
  const input = document.getElementById(`qtd-promo-${index}`);
  const qtd = parseInt(input.value) || 1;
  const item = produtos[index];
  const existente = carrinho.find(p => p.nome === item.nome);

  if (existente) {
    existente.quantidade += qtd;
  } else {
    carrinho.push({
      nome: item.nome,
      preco: precoPromocional,
      imagem: item.imagem,
      unidade: item.unidade,
      quantidade: qtd
    });
  }

  atualizarCarrinho();

  const icone = document.getElementById('btnCarrinho');
  if (icone) {
    icone.classList.add('animado');
    setTimeout(() => icone.classList.remove('animado'), 400);
  }
}

document.addEventListener('hidden.bs.offcanvas', () => {
  document.body.style.overflow = '';
});

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function () {
  const btnLogin = document.getElementById('btnLogin');
  const pedidosLink = document.querySelector('a[href*="pedidos"]');

  // Atualiza visual do botão Login
  onAuthStateChanged(auth, (user) => {
    if (btnLogin) {
      if (user) {
        btnLogin.innerHTML = `<i class="bi bi-person-circle me-1"></i> <span class="email-pequeno">${user.email}</span>`;
      } else {
        btnLogin.innerHTML = `<i class="bi bi-person-circle"></i>`;
      }
    }

    // Configura clique no botão "Pedidos"
    if (pedidosLink) {
      pedidosLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (user) {
          window.location.href = "pedidos.html";
        } else {
          window.location.href = "login.html?redirect=pedidos";
        }
      });
    }
  });

  // Clique no botão Login vai sempre para login.html
  if (btnLogin) {
    btnLogin.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
});



window.copiarCodigoPix = function () {
  const textarea = document.getElementById("codigoPix");
  navigator.clipboard.writeText(textarea.value)
    .then(() => {
      mostrarToastPixLike("Código Pix copiado! Após a confirmação do pagamento, seu pedido será preparado.", "#1D2D44");
    })
    .catch(err => {
      console.error("Erro ao copiar:", err);
      mostrarToastPixLike("Erro ao copiar o código Pix.", "#d9534f");
    });
};


export function mostrarToastPixLike(mensagem = "Algo aconteceu!", cor = "#0d6efd") {
  // Remove se já existir para não duplicar
  const existente = document.getElementById("toastPixGlobal");
  if (existente) existente.remove();

  // Cria o container do toast
  const toast = document.createElement("div");
  toast.id = "toastPixGlobal";
  toast.style.position = "fixed";
  toast.style.top = "50%";
  toast.style.left = "50%";
  toast.style.transform = "translate(-50%, -50%)";
  toast.style.backgroundColor = cor;
  toast.style.color = "white";
  toast.style.padding = "16px 24px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  toast.style.zIndex = "9999";
  toast.style.fontSize = "20px";
  toast.style.fontFamily = "'Quicksand', sans-serif";
  toast.style.fontWeight = "bold";
  toast.style.textAlign = "center";
  toast.style.textWrap = "wrap";

  toast.innerText = mensagem;

  document.body.appendChild(toast);

  // Remove após 3 segundos
  setTimeout(() => {
    toast.remove();
  }, 3000);
}


// Torna as funções disponíveis globalmente
window.adicionarCarrinho = adicionarCarrinho;
window.alterarQuantidade = alterarQuantidade;
window.atualizarCarrinho = atualizarCarrinho;
window.alterarQuantidadeCarrinho = alterarQuantidadeCarrinho;
window.removerItemCarrinho = removerItemCarrinho;
window.finalizarCompraSite = finalizarCompraSite;
window.alternarCarrinho = alternarCarrinho;
window.finalizarCompraWhatsapp = finalizarCompraWhatsapp;
window.adicionarCarrinhoPromo = adicionarCarrinhoPromo;
window.alterarQuantidadePromo = alterarQuantidadePromo;
