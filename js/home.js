const loadingOverlay = document.getElementById("loading-overlay");

function showContent() {
  document.body.style.visibility = "visible";
  if (loadingOverlay) loadingOverlay.remove();
}

const fallbackTimer = setTimeout(showContent, 3000);

function handleAuth(user) {
  clearTimeout(fallbackTimer);
  showContent();
  if (!user) return;
  if (!user.emailVerified) {
    firebase.auth().signOut();
    return;
  }
  const logoutBtn = document.getElementById("logout-button");
  const logoutBtnMobile = document.getElementById("logout-button-mobile");
  const loginBtn = document.getElementById("login-button");
  const loginBtnMobile = document.getElementById("login-button-mobile");
  if (logoutBtn) logoutBtn.style.display = "block";
  if (logoutBtnMobile) logoutBtnMobile.style.display = "block";
  if (loginBtn) loginBtn.style.display = "none";
  if (loginBtnMobile) loginBtnMobile.style.display = "none";
  const ctaBtn = document.getElementById("cta-button");
  if (ctaBtn) ctaBtn.href = "#fundamentos";
}

try {
  if (typeof firebase !== "undefined" && firebase.auth) {
    firebase.auth().onAuthStateChanged(handleAuth);
  } else {
    clearTimeout(fallbackTimer);
    showContent();
  }
} catch (e) {
  clearTimeout(fallbackTimer);
  showContent();
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Usuário deslogado com sucesso.");
    })
    .catch((error) => {
      console.error("Erro ao deslogar o usuário: ", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
    });
  }
});
