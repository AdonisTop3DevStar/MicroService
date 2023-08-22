const subscriptionController = require("../controllers/subscription.controller.js");
var router = require("express").Router();

module.exports = app => {

    // Create a new Subscription
    router.post('/create', subscriptionController.createSubscription);

    // Retrieve a Subscription
    router.get('/:id', subscriptionController.retrieveSubscription);

    // Update a Subscription
    router.put('/:id', subscriptionController.updateSubscription);

    // Resume a Subscription
    router.post('/:id', subscriptionController.resumeSubscription);

    // Cancel a Subscription
    router.delete('/:id', subscriptionController.cancelSubscription);

    // List all Subscriptions
    router.get('/', subscriptionController.allSubscription);

    // Search Subscriptions
    router.get('/', subscriptionController.allSubscription);

    app.use("/api/subscriptions", router);

};
