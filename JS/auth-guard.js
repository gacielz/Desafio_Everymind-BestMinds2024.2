// Monitora o estado de autenticação do usuário
firebase.auth().onAuthStateChanged(user => {
    // Se o usuário não estiver autenticado (user é null), redireciona para a página de login
    if (!user) {
        window.location.href = "../view/index.html";
    }
})