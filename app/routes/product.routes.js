const productController = require("../controllers/product.controller");
var router = require("express").Router();

module.exports = app => {

    // Create a new Product
    router.post('/create', productController.createProduct);

    // Retrieve a Product
    router.get('/:id', productController.retrieveProduct);

    // Update a Product
    router.put('/:id', productController.updateProduct);

    // Delete a Product
    router.delete('/:id', productController.deleteProduct);

    // List all Products
    router.get('/', productController.allProduct);

    // Search Products
    router.get('/', productController.allProduct);

    app.use("/api/products", router);

};
