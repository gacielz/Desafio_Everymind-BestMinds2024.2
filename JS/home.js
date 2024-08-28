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
    firebase.firestore()
        .collection('products')
        .get()
        .then(snapshot => {
            const products = snapshot.docs.map(doc => doc.data())
            addProductsToScreen(products);
        })
}

function addProductsToScreen(products) {
    const table = document.getElementById('products');

    products.forEach(product => {
        const tr = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.textContent = product.name;
        tr.appendChild(tdName);

        const tdCode = document.createElement('td');
        tdCode.textContent = product.code;
        tr.appendChild(tdCode);

        const tdDescription = document.createElement('td');
        tdDescription.textContent = product.description;
        tr.appendChild(tdDescription);

        const tdPrice = document.createElement('td');
        tdPrice.textContent = formatMoney(product.money);
        tr.appendChild(tdPrice);

        table.appendChild(tr);
    });
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}