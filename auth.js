// =====================================================================
// auth.js — Login passwordless via "link de e-mail" (Firebase Auth)
// Firebase JS SDK v10 — build COMPAT (carregado via <script> clássico, sem ES modules)
// NÃO conecta com app.js nem storage.js nesta etapa.
// =====================================================================

const firebaseConfig = {
  apiKey: "AIzaSyCCzLjB7yP_At1kNwO-I8FYGEX3oOaNVlA",
  authDomain: "gtg-tracker-c529b.firebaseapp.com",
  projectId: "gtg-tracker-c529b",
  storageBucket: "gtg-tracker-c529b.firebasestorage.app",
  messagingSenderId: "38777610117",
  appId: "1:38777610117:web:8a3a400e1789636b8a2eec"
};

// Chave do localStorage que guarda o e-mail pendente de confirmação
const GTG_EMAIL_PENDENTE_KEY = "gtg_email_pendente";

// Inicializa o Firebase (idempotente: não recria se já foi inicializado,
// o que importa se este script for incluído mais de uma vez por engano).
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ---------------------------------------------------------------------
// Listener global de estado de auth.
// Por enquanto só loga no console (a integração com a UI virá depois).
// ---------------------------------------------------------------------
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("[Auth] Usuário logado:", user.email, "| UID:", user.uid);
  } else {
    console.log("[Auth] Nenhum usuário logado.");
  }
});

// ---------------------------------------------------------------------
// enviarLinkLogin(email)
// Dispara o e-mail com o link de login (passwordless) e salva o e-mail
// digitado no localStorage, para confirmar quando o usuário voltar pelo link.
// ---------------------------------------------------------------------
async function enviarLinkLogin(email) {
  email = (email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    throw new Error("E-mail inválido.");
  }

  const actionCodeSettings = {
    // URL para onde o Firebase redireciona após o clique no link do e-mail.
    // Usamos a própria página (sem query/hash) para que completarLoginSeNecessario()
    // detecte o link aqui mesmo.
    url: window.location.origin + window.location.pathname,
    handleCodeInApp: true, // obrigatório para sign-in com link de e-mail
  };

  await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);

  // Salva o e-mail para confirmar na volta (evita pedir de novo ao usuário).
  localStorage.setItem(GTG_EMAIL_PENDENTE_KEY, email);
  console.log("[Auth] Link de login enviado para:", email);
}

// ---------------------------------------------------------------------
// completarLoginSeNecessario()
// Verifica se a URL atual é um link de confirmação de login. Se for,
// completa o signIn com o e-mail salvo (ou pede ao usuário se faltar).
// Retorna o usuário logado, ou null se a URL não for um link de login.
// ---------------------------------------------------------------------
async function completarLoginSeNecessario() {
  const href = window.location.href;

  if (!firebase.auth().isSignInWithEmailLink(href)) {
    return null;
  }

  let email = localStorage.getItem(GTG_EMAIL_PENDENTE_KEY);
  if (!email) {
    email = (window.prompt("Confirme seu e-mail para concluir o login:") || "").trim();
  }
  if (!email) {
    console.warn("[Auth] E-mail não informado — não foi possível completar o login.");
    return null;
  }

  try {
    const result = await firebase.auth().signInWithEmailLink(email, href);
    console.log("[Auth] Login concluído com sucesso:", result.user.email);

    // Limpa o e-mail pendente e remove o link da URL (links são de uso único).
    localStorage.removeItem(GTG_EMAIL_PENDENTE_KEY);
    window.history.replaceState({}, document.title, window.location.pathname);
    return result.user;
  } catch (err) {
    console.error("[Auth] Falha ao concluir login via link:", err);
    throw err;
  }
}

// ---------------------------------------------------------------------
// getUsuarioAtual()
// Retorna o usuário logado (síncrono por baixo dos panos, mas mantido
// async para casar com o restante da API e facilitar migração futura).
// ---------------------------------------------------------------------
async function getUsuarioAtual() {
  return firebase.auth().currentUser;
}

// ---------------------------------------------------------------------
// logout()
// ---------------------------------------------------------------------
async function logout() {
  await firebase.auth().signOut();
  console.log("[Auth] Logout realizado.");
}

// ---------------------------------------------------------------------
// Auto-executa ao carregar a página: tenta completar o login se a URL
// atual for um link de confirmação. Roda só depois do DOM estar pronto.
// ---------------------------------------------------------------------
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", completarLoginSeNecessario);
} else {
  completarLoginSeNecessario();
}
