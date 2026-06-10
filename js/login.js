firebase.auth().onAuthStateChanged(user => {
    document.body.style.visibility = 'visible';
    if (user) {
        window.location.href = '../index.html';
    }
})

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
    ).then(responde => {
        hideLoading();
        window.location.href = '../index.html';
    }).catch(error => {
        hideLoading();
        showAuthError(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == 'auth/invalid-login-credentials'){
        return 'Email ou senha inválidos';
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

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
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
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
} 

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
