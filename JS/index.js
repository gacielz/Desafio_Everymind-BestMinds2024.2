// Função que observa o estado de autenticação do usuário
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../view/home.html";
    }
});

// Função chamada quando o campo de e-mail é alterado
function onChangeEmail() {
    toggleButtonsDisabled();
    toggleEmailErrors();
}

// Função chamada quando o campo de senha é alterado
function onChangePassword(){
   toggleButtonsDisabled(); 
   togglePasswordErrors(); 
}

// Função de login usando e-mail e senha
function login() {
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(response => {
        window.location.href = "../view/home.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

// Função que redireciona para a tela de registro
function register() {
    window.location.href = "../view/register.html"
}
 
// Função que retorna uma mensagem de erro personalizada com base no código de erro
function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential") {
        return "Usuário não encontrado";
    }
    return error.message;
}

// Função para recuperação de senha
function recoverPassword() {
    firebase.auth().sendPasswordResetEmail(
        form.email().value
    ).then(() => {
        alert('Um email foi enviado para a redefinição da senha');
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

// Função para verificar se o e-mail é válido
function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

// Função que exibe ou oculta os erros de e-mail
function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

// Função que exibe ou oculta os erros de senha
function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

// Função que ativa ou desativa os botões de acordo com a validação dos campos
function toggleButtonsDisabled() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

// Função que verifica se a senha é válida
function isPasswordValid() {
    const password = form.password().value;
    if (!password) {
        return false;
    }
    return true;
}

// Objeto que contém referências aos elementos do formulário na página
const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button')
}
