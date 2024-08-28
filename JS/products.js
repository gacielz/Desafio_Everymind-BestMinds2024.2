function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../view/index.html"
    }).catch (() => {
        alert('Erro ao fazer logout');
    })
}

formatPrice();

function formatPrice() {
    const priceInput = document.getElementById('price-input');

    priceInput.addEventListener('input', function (e) {
        let value = e.target.value;

        value = value.replace(/[^\d,]/g, '');

        if (value.length > 0) {
            e.target.value = 'R$ ' + value;
        } else {
            e.target.value = '';
        }
    });
}