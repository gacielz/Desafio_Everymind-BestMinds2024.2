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
        .orderBy('name', 'asc')
        .get()
        .then(snapshot => {
            const products = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
        }));
            addProductsToScreen(products);
        })
}

function addProductsToScreen(products) {
    const table = document.getElementById('products');

    products.forEach(product => {
        console.log(product);
        const tr = document.createElement('tr');
        tr.addEventListener('click' , () => {
            window.location.href = "../view/products.html?uid=" + product.uid;
        })

        const tdName = document.createElement('td');
        tdName.textContent = product.name;
        tr.appendChild(tdName);

        const tdCode = document.createElement('td');
        tdCode.textContent = product.code;
        tr.appendChild(tdCode);

        const tdDescription = document.createElement('td');
        tdDescription.textContent = product.desc;
        tr.appendChild(tdDescription);

        const tdPrice = document.createElement('td');
        tdPrice.textContent = product.price;
        tr.appendChild(tdPrice);

        table.appendChild(tr);
    });
}