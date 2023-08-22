const reportController = require("../controllers/report.controller.js");
var router = require("express").Router();

module.exports = app => {

    // List all PaymentIntents
    router.get('/allPaymentIntents', reportController.allPaymentsIntents);

    // List all balance transactions
    router.get('/allBalanceTransactions', reportController.allBalanceTransactions);

    // List all charges
    router.get('/allCharges', reportController.allcharges);

    // List all invoices
    router.get('/allInvoices', reportController.allInvoices);

    // List all Subscription
    router.get('/allSubscriptions', reportController.allSubscriptions);

    app.use("/api/reports", router);

};
