const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPrice = async (req, res) => {
    try {

        const { unit_amount, currency, recurring, productId } = req.body;

        const price = await stripe.prices.create({
            unit_amount: unit_amount,
            currency: currency,
            recurring: { interval: recurring },
            product: productId
        });

        res.status(200).json({ status: true, message: "Price Information Created!", data: price.id });

    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
};

exports.retrievePrice = async (req, res) => {
    try {

        const priceId = req.params.id;

        const price = await stripe.prices.retrieve(priceId);

        res.status(200).json({ status: true, message: "Price Information", data: price });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.updatePrice = async (req, res) => {
    try {
        const priceId = req.params.id;

        const { orderId } = req.body;

        const price = await stripe.prices.update(
            priceId,
            {
                metadata: { order_id: orderId },
            });

        res.status(200).json({ status: true, message: "Price Information Updated!", data: price });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.allPrice = async (req, res) => {
    try {

        const prices = await stripe.prices.list();

        res.status(200).json({ status: true, message: "List all Prices!", data: prices });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.searchPrice = async (req, res) => {
    try {

    } catch {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}