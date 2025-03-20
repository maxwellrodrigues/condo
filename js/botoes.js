//|******************************************************************************************************|
//| Arquivo responsável pelas ações dos botões da aplicação e do meni de navegação.                      |
//|******************************************************************************************************|


//Esse JS tem a Função de controlar açoes dos botões da aplicação do menu de navegação

// Botão de LOGOUT
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdjPwjqvtAGcU5uPkqUT1dxXM6W3A-rqU",
  authDomain: "businessmap-40e88.firebaseapp.com",
  projectId: "businessmap-40e88",
  storageBucket: "businessmap-40e88.appspot.com",
  messagingSenderId: "854634385555",
  appId: "1:854634385555:web:e6976172ce82c5ad5c3d66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Monitora o estado de autenticação, se o usuário está autenticado. Caso não esteja, ele é redirecionado para a página de login
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário autenticado:", user.uid);
    // Aqui você pode adicionar lógica adicional se necessário
  } else {
    console.log("Usuário não autenticado, redirecionando para login");
    window.location.href = "../login/login.html";
  }
});

//Quando o usuário clica no botão de logout, ele é desconectado e redirecionado para a página de login.
const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId');
  signOut(auth)
    .then(() => {
      const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
      window.location.href = `${basePath}/login/login.html`; //  Detectar o Caminho Correto Automaticamente para chmar o arquivo login.html
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
});




// ------------------------- CONTROLE DE AÇÃO PARA BOTÕES DO MENU DE NAVEGAÇÃO------------------------------

//-----Essa função implementa o redirecionamento para as páginas conforme click no menu lateral-----
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".nav-item a");

  // Recupera do localStorage qual item foi salvo como ativo
  const activeItem = localStorage.getItem("activeMenuItem");

  if (activeItem) {
    menuItems.forEach((item) => {
      item.parentElement.classList.remove("active"); // Remove active de todos
      if (item.innerText.trim() === activeItem) {
        item.parentElement.classList.add("active"); // Adiciona active ao item salvo
      }
    });
  }

  // Adiciona evento de clique para salvar o item selecionado e redirecionar
  menuItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault(); // Evita o comportamento padrão do link

      // Remove "active" de todos os itens e adiciona ao clicado
      menuItems.forEach((el) => el.parentElement.classList.remove("active"));
      item.parentElement.classList.add("active");

      // Salva o item selecionado no localStorage
      localStorage.setItem("activeMenuItem", item.innerText.trim());

      // Redireciona para a página correspondente
      const targetPage = getTargetPage(item.innerText.trim());
      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });

  function getTargetPage(menuText) {
    switch (menuText) {
      case "Geral":
        return "index.html";
      case "Bloco-1":
        return "bloco1.html";
      case "Bloco-2":
        return "bloco2.html";
      case "Bloco-3":
        return "bloco3.html";
      //case "Favorites":
        //return "favorites.html";
      default:
        return null;
    }
  }
});



// JavaScript para controlar o menu hambúrguer
const mobileMenu = document.getElementById('mobile-menu');
const mainMenu = document.getElementById('main-menu');

// Cria o overlay dinamicamente
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Abrir/fechar o menu ao clicar no botão de hambúrguer
mobileMenu.addEventListener('click', (event) => {
  event.stopPropagation(); // Impede que o clique se propague para o documento
  mainMenu.classList.toggle('active');
  overlay.style.display = mainMenu.classList.contains('active') ? 'block' : 'none'; // Mostra/esconde o overlay
});

// Fechar o menu ao clicar no overlay
overlay.addEventListener('click', () => {
  mainMenu.classList.remove('active');
  overlay.style.display = 'none'; // Esconde o overlay
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', (event) => {
  if (!mainMenu.contains(event.target) && !mobileMenu.contains(event.target)) {
    mainMenu.classList.remove('active');
    overlay.style.display = 'none'; // Esconde o overlay
  }
});



//! Essa função filtra card favoritado

document.addEventListener("DOMContentLoaded", function () {
  const favoriteButton = document.getElementById('favoriteButton');
  const eventCards = document.querySelectorAll('.event-card');
  let showingFavorites = false; // Variável de estado para acompanhar a exibição

  favoriteButton.addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão do link
    showingFavorites = !showingFavorites; // Alterna o estado
    console.log("Botão de favoritos clicado. Mostrando favoritos:", showingFavorites);

    updateCardVisibility();
  });


  function updateCardVisibility() {
    eventCards.forEach(card => {
      const likeBtn = card.querySelector('.like-btn');
      const isFavorited = likeBtn.classList.contains('bxs-heart');

      if (showingFavorites) {
        // Mostrar apenas favoritos
        if (isFavorited) {
          card.style.display = "block"; // Mostra o card se favoritado
        } else {
          card.style.display = "none"; // Esconde o card se não favoritado
        }
      } else {
        // Mostrar todos os cards
        card.style.display = "block";
      }
    });
  }
});
