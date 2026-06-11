function authGuard() {
    if (typeof firebase === "undefined" || !firebase.auth) {
        window.location.replace("../login-registro/login.html");
        return;
    }

    const fallback = setTimeout(() => {
        window.location.replace("../login-registro/login.html");
    }, 2000);

    try {
        firebase.auth().onAuthStateChanged((user) => {
            clearTimeout(fallback);
            if (!user) {
                window.location.replace("../login-registro/login.html");
            } else if (!user.emailVerified) {
                firebase.auth().signOut();
                window.location.replace("../login-registro/login.html");
            } else {
                const overlay = document.getElementById("loading-overlay");
                if (overlay) overlay.remove();
                document.body.style.visibility = "visible";
            }
        });
    } catch (e) {
        clearTimeout(fallback);
        window.location.replace("../login-registro/login.html");
    }
}

authGuard();
