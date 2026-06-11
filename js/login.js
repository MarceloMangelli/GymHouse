document.body.style.visibility = 'visible';

try {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(user => {
            if (user && user.emailVerified) {
                window.location.replace('../index.html');
            } else if (user && !user.emailVerified) {
                firebase.auth().signOut();
            }
        });

        firebase.auth().getRedirectResult().then(result => {
            if (result.user) {
                window.location.replace('../index.html');
            }
        }).catch(error => {
            showAuthError(getErrorMessage(error));
        });
    }
} catch (e) {}

function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
} 

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        showAuthSuccess('Se este email estiver cadastrado, você receberá um link de recuperação');
    }).catch(error => {
        hideLoading();
        showAuthError(getErrorMessage(error));
    });

}

function login() {
    showLoading();
    hideAuthError();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value , form.password().value
    ).then(result => {
        const user = result.user;
        if (!user.emailVerified) {
            return firebase.auth().signOut().then(() => {
                throw { code: 'email-not-verified' };
            });
        }
        hideLoading();
        window.location.href = '../index.html';
    }).catch(error => {
        hideLoading();
        showAuthError(getErrorMessage(error));
    });
}

function loginWithGoogle() {
    showLoading();
    hideAuthError();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
}

function getErrorMessage(error) {
    if (error.code == 'auth/invalid-login-credentials'){
        return 'Email ou senha inválidos';
    }
    if (error.code == 'email-not-verified') {
        return 'Você ainda não confirmou seu email. Acesse sua caixa de entrada (ou spam) e clique no link de verificação que enviamos.';
    }
    return error.message;
}

function register() {
    window.location.href = 'register.html';
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}

function showAuthError(message) {
    const el = document.getElementById('auth-error');
    if (el) {
        el.textContent = message;
        el.classList.add('error-visivel');
    }
}

function hideAuthError() {
    const el = document.getElementById('auth-error');
    if (el) {
        el.textContent = '';
        el.classList.remove('error-visivel');
    }
}

function showAuthSuccess(message) {
    const el = document.getElementById('auth-error');
    if (el) {
        el.textContent = message;
        el.className = 'error auth-error success-visivel';
    }
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("form-login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
} 

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
