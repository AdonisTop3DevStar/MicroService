const priceController = require("../controllers/price.controller");
var router = require("express").Router();

module.exports = app => {

    // Create a new Price
    router.post('/create', priceController.createPrice);

    // Retrieve a Price
    router.get('/:id', priceController.retrievePrice);

    // Update a Price
    router.post('/:id', priceController.updatePrice);

    // List all Prices
    router.get('/', priceController.allPrice);

    // Search Prices
    router.get('/', priceController.allPrice);

    app.use("/api/prices", router);

};
