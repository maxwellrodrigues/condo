//|******************************************************************************************************|
//| Arquivo responsável pelas credencias  e verificação de autenticação do usuário.                      |
//|******************************************************************************************************|
// VErificar se está implementado, parece que não.



// Importa e inicializa o Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Importa os módulos de autenticação e Firestore do Firebase
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração das chaves do Firebase com as credenciais do projeto
const firebaseConfig = {
  apiKey: "AIzaSyAdjPwjqvtAGcU5uPkqUT1dxXM6W3A-rqU",
  authDomain: "businessmap-40e88.firebaseapp.com",
  projectId: "businessmap-40e88",
  storageBucket: "businessmap-40e88.appspot.com",
  messagingSenderId: "854634385555",
  appId: "1:854634385555:web:e6976172ce82c5ad5c3d66"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obtém instâncias de autenticação e Firestore do Firebase
const auth = getAuth();
const db = getFirestore();

// Verifica o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário autenticado:", user.uid);
    // Aqui você pode adicionar lógica adicional se necessário
  } else {
    console.log("Usuário não autenticado, redirecionando para login");
    window.location.href = "index.html";
  }
});

