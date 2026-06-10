let loadingElement = null;

function showLoading() {
  if (loadingElement) return;
  loadingElement = document.createElement("div");
  loadingElement.className = "loading";
  loadingElement.setAttribute("role", "status");
  loadingElement.innerHTML = "<label>Carregando...</label>";
  document.body.appendChild(loadingElement);
}

function hideLoading() {
  if (loadingElement && loadingElement.parentNode) {
    document.body.removeChild(loadingElement);
    loadingElement = null;
  }
}
