const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.allPaymentsIntents = async (req, res) => {
    try {

        const paymentIntents = await stripe.paymentIntents.list();

        res.status(200).json({ status: true, message: "List all PaymentIntents!", data: paymentIntents });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.allBalanceTransactions = async (req, res) => {
    try {

        const balanceTransactions = await stripe.balanceTransactions.list();

        res.status(200).json({ status: true, message: "List all PaymentIntents!", data: balanceTransactions });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.allcharges = async (req, res) => {
    try {

        const charges = await stripe.charges.list();

        res.status(200).json({ status: true, message: "List all PaymentIntents!", data: charges });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.allInvoices = async (req, res) => {
    try {

        const invoices = await stripe.invoices.list();

        res.status(200).json({ status: true, message: "List all PaymentIntents!", data: invoices });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.allSubscriptions = async (req, res) => {
    try {

        const subscriptions = await stripe.subscriptions.list();

        res.status(200).json({ status: true, message: "List all PaymentIntents!", data: subscriptions });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}
