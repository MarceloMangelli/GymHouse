firebase.auth().onAuthStateChanged((user) => {
  document.body.style.visibility = "visible";
  const overlay = document.getElementById("loading-overlay");
  if (overlay) overlay.remove();
  if (user && !user.emailVerified) {
    firebase.auth().signOut();
    return;
  }
  const logoutBtn = document.getElementById("logout-button");
  const logoutBtnMobile = document.getElementById("logout-button-mobile");
  const loginBtn = document.getElementById("login-button");
  const loginBtnMobile = document.getElementById("login-button-mobile");
  if (logoutBtn) {
    logoutBtn.style.display = user ? "block" : "none";
  }
  if (logoutBtnMobile) {
    logoutBtnMobile.style.display = user ? "block" : "none";
  }
  if (loginBtn) {
    loginBtn.style.display = user ? "none" : "block";
  }
  if (loginBtnMobile) {
    loginBtnMobile.style.display = user ? "none" : "block";
  }
  const ctaBtn = document.getElementById("cta-button");
  if (ctaBtn && user) {
    ctaBtn.href = "#fundamentos";
  }
});

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
