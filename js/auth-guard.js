function showContent() {
    document.body.style.visibility = 'visible';
}

function authGuard() {
    const fallbackTimer = setTimeout(showContent, 3000);
    try {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                clearTimeout(fallbackTimer);
                if (!user) {
                    showContent();
                    window.location.href = '../login-registro/login.html';
                } else if (!user.emailVerified) {
                    showContent();
                    firebase.auth().signOut();
                    window.location.href = '../login-registro/login.html';
                } else {
                    showContent();
                }
            });
        } else {
            clearTimeout(fallbackTimer);
            showContent();
        }
    } catch (e) {
        clearTimeout(fallbackTimer);
        showContent();
    }
}

authGuard();
