function authGuard() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = '../login-registro/login.html';
        } else if (!user.emailVerified) {
            firebase.auth().signOut();
            window.location.href = '../login-registro/login.html';
        } else {
            document.body.style.visibility = 'visible';
        }
    })
}

authGuard();
