if (!isNewProduct()) {
    const uid = getProductUid();
    findProductByUid(uid);
}

function getProductUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

function isNewProduct() {
    return getProductUid() ? false : true;
}

function findProductByUid(uid) {
    firebase.firestore()
        .collection("products")
        .doc(uid)
        .get()
        .then(doc => {
            if(doc.exists) {
                fillProductScreen(doc.data());
                toggleSaveButtonDisabled();
            } else {
                alert("Documento não encontrado");
                window.location.href = "../view/home.html";
            }
        })
        .catch(() => {
            alert("Erro ao recuperar documento");
            window.location.href = "../view/home.html";
        });
}

function fillProductScreen(product) {
    form.name().value = product.name;
    form.code().value = product.code;
    form.desc().value = product.desc;
    form.price().value = product.price; 
}

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

function saveProduct() {
    const product = createProduct();

    if (isNewProduct()) {
        save(product);
    } else {
        update(product);
    }

}

function save(product) {
    firebase.firestore()
        .collection ("products")
        .add(newProduct)
        .then(() => {
            window.location.href = "../view/home.html"
        }).catch(() => {
            alert('Erro ao salvar produto');
        })
}

function update(product) {
    firebase.firestore()
        .collection("products")
        .doc(getProductUid())
        .update(product)
        .then(() => {
            window.location.href = "../view/home.html"
        }).catch(() => {
            alert('Erro ao atualizar produto');
        })
}

function createProduct() {
    return {
        name: form.name().value,
        code: form.code().value,
        desc: form.desc().value,
        price: form.price().value
    };
}

function onChangeName() {
    const name = form.name().value;
    form.nameRequiredError().style.display = !name ? "block" : "none";
    toggleSaveButtonDisabled();
}

function onChangeDesc() {
    const desc = form.desc().value;
    form.descRequiredError().style.display = !desc ? "block" : "none";
    toggleSaveButtonDisabled();
}

function toggleSaveButtonDisabled() {
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
    code: () => document.getElementById('code'),
    name: () => document.getElementById('name'),
    price: () => document.getElementById('price-input'),
    nameRequiredError: () => document.getElementById('name-required-error'),
    desc: () => document.getElementById('desc'),
    descRequiredError: () => document.getElementById('desc-required-error'),
    saveButton: () => document.getElementById('save-button')
}