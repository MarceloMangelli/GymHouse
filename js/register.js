function showContent() {
    document.body.style.visibility = 'visible';
}

const fallbackTimer = setTimeout(showContent, 3000);

try {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(user => {
            clearTimeout(fallbackTimer);
            showContent();
            if (user && user.emailVerified) {
                window.location.href = '../index.html';
            } else if (user && !user.emailVerified) {
                firebase.auth().signOut();
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

function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    const confirmPassword = form.confirmPassword().value;
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;
    form.confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;
}

function register() {
    showLoading();
    hideAuthError();
    firebase.auth().createUserWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(result => {
        return result.user.sendEmailVerification();
    }).then(() => {
        return firebase.auth().signOut();
    }).then(() => {
        hideLoading();
        form.registerButton().disabled = true;
        showAuthSuccess('Um email de confirmação foi enviado para ' + form.email().value + '. Verifique sua caixa de entrada (não esqueça de olhar o spam) e faça login após confirmar.');
    }).catch(error => {
        hideLoading();
        showAuthError(getErrorMessage(error));
    });
}

function goToLogin() {
    window.location.href = 'login.html';
}

function getErrorMessage(error) {
    if (error.code == 'auth/email-already-in-use') {
        return 'Este email já está cadastrado';
    }
    return error.message;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
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
    confirmPassword: () => document.getElementById('confirm-password'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    registerButton: () => document.getElementById('register-button')
}
