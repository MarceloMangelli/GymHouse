firebase.auth().onAuthStateChanged((user) => {
  document.body.style.visibility = "visible";
  const logoutBtn = document.getElementById("logout-button");
  const logoutBtnMobile = document.getElementById("logout-button-mobile");
  if (logoutBtn) {
    logoutBtn.style.display = user ? "block" : "none";
  }
  if (logoutBtnMobile) {
    logoutBtnMobile.style.display = user ? "block" : "none";
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
