const loadingOverlay = document.getElementById("loading-overlay");

function showContent() {
  document.body.style.visibility = "visible";
  if (loadingOverlay) loadingOverlay.remove();
}

showContent();

function updateUI(user) {
  const logoutBtn = document.getElementById("logout-button");
  const logoutBtnMobile = document.getElementById("logout-button-mobile");
  const loginBtn = document.getElementById("login-button");
  const loginBtnMobile = document.getElementById("login-button-mobile");
  const ctaBtn = document.getElementById("cta-button");

  if (user && user.emailVerified) {
    if (logoutBtn) logoutBtn.style.display = "block";
    if (logoutBtnMobile) logoutBtnMobile.style.display = "block";
    if (loginBtn) loginBtn.style.display = "none";
    if (loginBtnMobile) loginBtnMobile.style.display = "none";
    if (ctaBtn) ctaBtn.href = "#fundamentos";
  } else {
    if (logoutBtn) logoutBtn.style.display = "none";
    if (logoutBtnMobile) logoutBtnMobile.style.display = "none";
    if (loginBtn) loginBtn.style.display = "block";
    if (loginBtnMobile) loginBtnMobile.style.display = "block";
    if (ctaBtn) ctaBtn.href = "login-registro/login.html";
  }

  if (user && !user.emailVerified) {
    firebase.auth().signOut();
  }
}

try {
  if (typeof firebase !== "undefined" && firebase.auth) {
    firebase.auth().onAuthStateChanged(updateUI);
  } else {
    updateUI(null);
  }
} catch (e) {
  updateUI(null);
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
