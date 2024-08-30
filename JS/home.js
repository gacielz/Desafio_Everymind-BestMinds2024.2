function logout(){
    firebase.auth().signOut().then(() => {
        window.location.href = "../view/index.html"
    }).catch (() => {
        alert('Erro ao fazer logout');
    })
}

findProducts();

function newProduct() {
    window.location.href = "../view/products.html";
}

function findProducts() {
    productService.find()
        .then(products => {
            addProductsToScreen(products);
        }).catch(error => {
            console.log(error);
            alert("Erro ao recuperar produtos");
        })
}

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

function createProductTableItem(product) {
    const tr = document.createElement('tr');
        tr.id = product.uid;
        tr.addEventListener('click' , () => {
            window.location.href = "../view/products.html?uid=" + product.uid;
        })
        return tr;
}

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

function createItem(value) {
    const element = document.createElement('td');
    element.textContent = value;
    return element;
}

function askRemoveProduct(product) {
    const shouldRemove = confirm('Deseja remover o produto?');
    if (shouldRemove) {
        removeProduct(product);
    }
}

function removeProduct(product) {
    productService.remove(product)
        .then(() => {
            document.getElementById(product.uid).remove();
        }).catch(error => {
            console.log(error);
            alert("Erro ao remover produto");
        })

}