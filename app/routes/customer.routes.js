const customerController = require("../controllers/customer.controller.js");
var router = require("express").Router();

module.exports = app => {

    // Create a new Customer
    router.post('/create', customerController.createCustomer);

    // Retrieve a Customer
    router.get('/:id', customerController.retrieveCustomer);

    // Update a Customer
    router.put('/:id', customerController.updateCustomer);

    // Delete a Customer
    router.delete('/:id', customerController.deleteCustomer);

    // List all Customers
    router.get('/', customerController.allCustomer);

    // Search Customers
    router.get('/', customerController.allCustomer);

    app.use("/api/customers", router);

};
