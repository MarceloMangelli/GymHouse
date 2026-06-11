function authGuard() {
    const overlay = document.getElementById("loading-overlay");
    if (overlay) overlay.remove();
    document.body.style.visibility = "visible";

    if (typeof firebase === "undefined" || !firebase.auth) {
        window.location.replace("../login-registro/login.html");
        return;
    }

    try {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                window.location.replace("../login-registro/login.html");
            } else if (!user.emailVerified) {
                firebase.auth().signOut();
                window.location.replace("../login-registro/login.html");
            }
        });
    } catch (e) {
        window.location.replace("../login-registro/login.html");
    }
}

authGuard();
