const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createSubscription = async (req, res) => {
    try {
        
        const { customerId, items } = req.body;

        const subscription = await stripe.subscriptions.create({
            customer : customerId,
            items : items
        })

        res.status(200).json({ status: true, message: "Subscription Information Created!", data: subscription.id });

    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
};

exports.retrieveSubscription = async (req, res) => {
    try {

        const subscriptionId = req.params.id;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        res.status(200).json({ status: true, message: "Subscription Information", data: subscription });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.updateSubscription = async (req, res) => {
    try {
        const subscriptionId = req.params.id;

        const { orderId } = req.body;

        const subscription = await stripe.subscriptions.update(
            subscriptionId,
            {
                metadata: { order_id : orderId }
            });
        res.status(200).json({ status: true, message: "Subscription Information Updated!", data: subscription });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.resumeSubscription = async (req, res) => {
    try {
        const subscriptionId = req.params.id;

        const subscription = await stripe.subscriptions.resume(
            subscriptionId,
            {billing_cycle_anchor: 'now'}
            );

        res.status(200).json({ status: true, message: "Subscription Information Deleted!", data: subscription });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.cancelSubscription = async (req, res) => {
    try {
        const subscriptionId = req.params.id;

        const subscription = await stripe.subscriptions.cancel(subscriptionId);

        res.status(200).json({ status: true, message: "Subscription Information Deleted!", data: subscription });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.allSubscription = async (req, res) => {
    try {

        const subscriptions = await stripe.subscriptions.list();

        res.status(200).json({ status: true, message: "List all Subscriptions!", data: subscriptions });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.searchSubscription = async (req, res) => {
    try {

        const { limit, page, created, email, metadata, name, phone } = req.body;

        const Subscriptions = await stripe.Subscriptions.search({
            query: "",
            page: page,
            name: name,
            limit: limit,
            email: email,
            phone: phone,
            created: created,
            metadata: metadata,
        });

        res.status(200).json({ status: true, message: "List all Subscriptions!", data: Subscriptions });
    } catch {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}