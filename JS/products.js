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

function onChangeName() {
    const name = form.name().value;
    form.nameRequiredError().style.display = !name ? "block" : "none";
    toggleSaveButtonType()
}

function onChangeDesc() {
    const desc = form.desc().value;
    form.descRequiredError().style.display = !desc ? "block" : "none";
    toggleSaveButtonType()
}

function toggleSaveButtonType() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const name = form.name().value;
    if (!name) {
        return false;
    }

    const desc = form.desc().value;
    if (!desc) {
        return false;
    }

    return true;
}

const form = {
    name: () => document.getElementById('name'),
    nameRequiredError: () => document.getElementById('name-required-error'),
    desc: () => document.getElementById('desc'),
    descRequiredError: () => document.getElementById('desc-required-error'),
    saveButton: () => document.getElementById('save-button')
}