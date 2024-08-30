// Verifica se o produto é novo ou existente, e, se existente, busca os dados dele
if (!isNewProduct()) {
    const uid = getProductUid();
    findProductByUid(uid);
}

// Função que obtém o UID do produto a partir dos parâmetros da URL
function getProductUid() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid');
}

// Função que verifica se o produto é novo
function isNewProduct() {
    return getProductUid() ? false : true;
}

// Função que busca um produto pelo UID e preenche o formulário
function findProductByUid(uid) {
    productService.findByUid(uid)
        .then(product => {
            if(product) {
                fillProductScreen(product);
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

// Função que preenche os campos do formulário com os dados do produto
function fillProductScreen(product) {
    form.name().value = product.name;
    form.code().value = product.code;
    form.desc().value = product.desc;
    form.price().value = product.price; 
}

// Função que faz logout do usuário e redireciona para a tela de login
function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../view/index.html"
    }).catch (() => {
        alert('Erro ao fazer logout');
    })
}

formatPrice();

// Função que adiciona um listener ao campo de preço para formatar sua entrada
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

// Função que salva o produto, verificando se é um novo produto ou se precisa ser atualizado
function saveProduct() {
    const product = createProduct();

    if (isNewProduct()) {
        save(product);
    } else {
        update(product);
    }

}

// Função que salva um novo produto
function save(product) {
    productService.save(product)
        .then(() => {
            window.location.href = "../view/home.html"
        }).catch(() => {
            alert('Erro ao salvar produto');
        })
}

// Função que atualiza um produto existente
function update(product) {
    productService.update(product)
        .then(() => {
            window.location.href = "../view/home.html"
        }).catch(() => {
            alert('Erro ao atualizar produto');
        })
}

// Função que cria um objeto de produto a partir dos campos do formulário
function createProduct() {
    return {
        name: form.name().value,
        code: form.code().value,
        desc: form.desc().value,
        price: form.price().value
    };
}

// Função que direciona para a home ao clicar no botão "Cancelar"
function cancel() {
    window.location.href = "../view/home.html"
}

// Função chamada quando o nome do produto é alterado
function onChangeName() {
    const name = form.name().value;
    form.nameRequiredError().style.display = !name ? "block" : "none";
    toggleSaveButtonDisabled();
}

// Função chamada quando a descrição do produto é alterada
function onChangeDesc() {
    const desc = form.desc().value;
    form.descRequiredError().style.display = !desc ? "block" : "none";
    toggleSaveButtonDisabled();
}

// Função que habilita/desabilita o botão de salvar com base na validade do formulário
function toggleSaveButtonDisabled() {
    form.saveButton().disabled = !isFormValid();
}

// Função que verifica se o formulário é válido
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

// Objeto que contém referências para os elementos do formulário
const form = {
    code: () => document.getElementById('code'),
    name: () => document.getElementById('name'),
    price: () => document.getElementById('price-input'),
    nameRequiredError: () => document.getElementById('name-required-error'),
    desc: () => document.getElementById('desc'),
    descRequiredError: () => document.getElementById('desc-required-error'),
    saveButton: () => document.getElementById('save-button')
}