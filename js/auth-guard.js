function authGuard() {
    if (typeof firebase === "undefined" || !firebase.auth) {
        window.location.href = "../login-registro/login.html";
        return;
    }

    const fallback = setTimeout(() => {
        window.location.href = "../login-registro/login.html";
    }, 6000);

    try {
        firebase.auth().onAuthStateChanged((user) => {
            clearTimeout(fallback);
            if (!user) {
                window.location.href = "../login-registro/login.html";
            } else if (!user.emailVerified) {
                firebase.auth().signOut();
                window.location.href = "../login-registro/login.html";
            } else {
                const overlay = document.getElementById("loading-overlay");
                if (overlay) overlay.remove();
            }
        });
    } catch (e) {
        clearTimeout(fallback);
        window.location.href = "../login-registro/login.html";
    }
}

authGuard();
