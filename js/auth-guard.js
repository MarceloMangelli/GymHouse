document.body.style.visibility = 'visible';

function authGuard() {
    try {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    window.location.href = '../login-registro/login.html';
                } else if (!user.emailVerified) {
                    firebase.auth().signOut();
                    window.location.href = '../login-registro/login.html';
                }
            });
        }
    } catch (e) {}
}

authGuard();
