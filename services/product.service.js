const productService = {
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

    remove: product => {
        return firebase.firestore()
            .collection("products")
            .doc(product.uid)
            .delete()
    },

    findByUid: uid => {
        return firebase.firestore()
            .collection("products")
            .doc(uid)
            .get()
            .then(doc => {
                return doc.data();
            })
    },

    save: product => {
        return firebase.firestore()
            .collection ("products")
            .add(product);
    },

    update: product => {
        return firebase.firestore()
            .collection("products")
            .doc(getProductUid())
            .update(product);
    }

}