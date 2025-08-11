// firebase.js

// Importe as funções que você precisa dos SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// A configuração do seu aplicativo da web do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBo1YyF_4IOUcyBDpIjLYNvjiM1C7ZzGqA",
    authDomain: "runaway-e3453.firebaseapp.com",
    databaseURL: "https://runaway-e3453-default-rtdb.firebaseio.com",
    projectId: "runaway-e3453",
    storageBucket: "runaway-e3453.appspot.com",
    messagingSenderId: "1035544434506",
    appId: "1:1035544434506:web:9bfd561cd0050f0a6513b3"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize os serviços do Firebase e exporte-os para uso em outros lugares
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider(); // Crie uma instância do provedor do Google

// Exporte tudo que será usado no app
export { auth, database, googleProvider };