// Função para realizar o logout do usuário
function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../view/index.html"
    }).catch (() => {
        alert('Erro ao fazer logout');
    })
}

findProducts();

// Função para redirecionar para a página de adicionar/editar um novo produto
function newProduct() {
    window.location.href = "../view/products.html";
}

// Função para buscar os produtos do Firestore usando o serviço de produtos
function findProducts() {
    productService.find()
        .then(products => {
            addProductsToScreen(products);
        }).catch(error => {
            console.log(error);
            alert("Erro ao recuperar produtos");
        })
}

// Função para adicionar produtos na tabela HTML
function addProductsToScreen(products) {
    const table = document.getElementById('products');

    products.forEach(product => {
        const tr = createProductTableItem(product);

        tr.appendChild(createItem(product.name));

        const tdCode = document.createElement('td');
        tdCode.textContent = product.code;
        tr.appendChild(tdCode);

        tr.appendChild(createItem(product.desc));

        const tdPrice = document.createElement('td');
        tdPrice.textContent = product.price;
        tdPrice.classList.add('non-border-right')
        tr.appendChild(tdPrice);
        
        tr.appendChild(createDeleteButton(product));

        table.appendChild(tr);
    });
}

// Função para criar um item de produto na tabela
function createProductTableItem(product) {
    const tr = document.createElement('tr');
        tr.id = product.uid;
        tr.addEventListener('click' , () => {
            window.location.href = "../view/products.html?uid=" + product.uid;
        })
        return tr;
}

// Função para criar um botão de deletar para cada produto
function createDeleteButton(product) {
    const tdDeleteButton = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('danger');
    deleteButton.addEventListener('click', event => {
        event.stopPropagation();
        askRemoveProduct(product);
    })
    deleteButton.innerHTML = "Remover";
    tdDeleteButton.classList.add('non-border-left');
    tdDeleteButton.appendChild(deleteButton);
    return tdDeleteButton;
}

// Função para criar um elemento de célula (td) com o valor fornecido
function createItem(value) {
    const element = document.createElement('td');
    element.textContent = value;
    return element;
}

// Função para perguntar ao usuário se ele deseja remover um produto
function askRemoveProduct(product) {
    const shouldRemove = confirm('Deseja remover o produto?');
    if (shouldRemove) {
        removeProduct(product);
    }
}

// Função para remover um produto do Firestore e da tela
function removeProduct(product) {
    productService.remove(product)
        .then(() => {
            document.getElementById(product.uid).remove();
        }).catch(error => {
            console.log(error);
            alert("Erro ao remover produto");
        })

}