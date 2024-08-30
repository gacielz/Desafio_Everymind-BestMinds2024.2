// Função chamada quando o campo de email é alterado
function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

// Função chamada quando o campo de senha é alterado
function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

// Função chamada quando o campo de confirmação de senha é alterado
function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

// Função para registrar um novo usuário
function register() {
    const email = form.email().value;
    const password = form.password().value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
        window.location.href ="../view/home.html"
    }).catch(error => {
        alert(getErrorMessage(error));
    })
}

// Função para obter mensagens de erro personalizadas
function getErrorMessage(error) {
    if(error.code == "auth/email-already-in-use") {
        return "Este email já está em uso";
    }
    return error.message;
}

// Função para redirecionar para a página de login
function login() {
    window.location.href = "../view/index.html"
}

// Função para validar se as senhas coincidem
function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

// Função para habilitar ou desabilitar o botão de registro com base na validade do formulário
function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

// Função para verificar se o formulário é válido
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

// Objeto contendo referências aos elementos do formulário
const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}