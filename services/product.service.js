// Objeto com os métodos que realizam o CRUD
const productService = {
    // Método para buscar todos os produtos ordenados por nome
    find: () => {
        return firebase.firestore()
            .collection('products')
            .orderBy('name', 'asc')
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id
                }));
            })
    },

    // Método para remover um produto específico pelo 'uid'
    remove: product => {
        return firebase.firestore()
            .collection("products")
            .doc(product.uid)
            .delete()
    },

    // Método para buscar um produto específico pelo 'uid'
    findByUid: uid => {
        return firebase.firestore()
            .collection("products")
            .doc(uid)
            .get()
            .then(doc => {
                return doc.data();
            })
    },

    // Método para salvar um novo produto no Firestore
    save: product => {
        return firebase.firestore()
            .collection ("products")
            .add(product);
    },

    // Método para atualizar um produto existente pelo 'uid'
    update: product => {
        return firebase.firestore()
            .collection("products")
            .doc(getProductUid())
            .update(product);
    }

}