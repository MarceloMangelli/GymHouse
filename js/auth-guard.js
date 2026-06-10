function authGuard() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = '../login-registro/login.html';
        } else {
            document.body.style.visibility = 'visible';
        }
    })
}

authGuard();
