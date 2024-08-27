firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "../view/index.html";
    }
})