//|******************************************************************************************************|
//| Arquivo responsável pelas credencias de login com firebase e inicalização da instância.              |
//| Executa também a escuta do botão de registro e login, tarefas de criar usuário erecupeção de senha.  |
//|******************************************************************************************************|


// Importando as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração das chaves do Firebase da  aplicação web
const firebaseConfig = {
    apiKey: "AIzaSyAdjPwjqvtAGcU5uPkqUT1dxXM6W3A-rqU",
    authDomain: "businessmap-40e88.firebaseapp.com",
    projectId: "businessmap-40e88",
    storageBucket: "businessmap-40e88.appspot.com",
    messagingSenderId: "854634385555",
    appId: "1:854634385555:web:e6976172ce82c5ad5c3d66"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Função para exibir mensagens
function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

// Adicionando um listener ao botão de registro
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

  // Criando um usuário com email e senha
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user=userCredential.user;
            const userData={
                email: email,
                firstName: firstName,
                lastName:lastName
            };
            showMessage('Conta Criada com Sucesso', 'signUpMessage');
            const docRef=doc(db, "users", user.uid);
            setDoc(docRef,userData)
                .then(()=>{
                    window.location.href='./index.html'; // Após logado com sucesso direciona para esse arquivo
                })
                .catch((error)=>{
                    console.error("erro ao escrever documento", error);
                });
        })
        .catch((error)=>{
            const errorCode=error.code;
            if(errorCode=='auth/email-already-in-use'){
                showMessage('Endereço de email Já Existe !!!', 'signUpMessage');
            }
            else{
                showMessage('Não é possível criar usuário', 'signUpMessage');
            }
        });
});

// Adicionando um listener ao botão de login
const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            showMessage('login foi bem sucedido', 'signInMessage');
            const user=userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href='../index.html';
        })
        .catch((error)=>{
            const errorCode=error.code;
            if(errorCode==='auth/invalid-credential'){
                showMessage('Senha ou email incorretos', 'signInMessage');
            }
            else{
                showMessage('Conta não existe', 'signInMessage');
            }
        });
});

// Obtendo elementos do DOM para recuperação de senha
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToSignIn = document.getElementById('backToSignIn');
const submitForgotPassword = document.getElementById('submitForgotPassword');

// Adicionando listener ao link de recuperação de senha
forgotPasswordLink.addEventListener('click', function(){
    document.getElementById('signIn').style.display = 'none';
    document.getElementById('forgotPassword').style.display = 'block';
});

// Adicionando listener ao botão de voltar ao login
backToSignIn.addEventListener('click', function(){
    document.getElementById('forgotPassword').style.display = 'none';
    document.getElementById('signIn').style.display = 'block';
});

// Adicionando listener ao botão de enviar email de recuperação
submitForgotPassword.addEventListener('click', function(event){
    event.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage('Email de recuperação enviado', 'forgotPasswordMessage');
        })
        .catch((error) => {
            showMessage('Erro ao enviar email de recuperação', 'forgotPasswordMessage');
        });
});
