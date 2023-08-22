const dotenv = require('dotenv');
const { startSession } = require('pg/lib/crypto/sasl');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createProduct = async (req, res) => {
    try {

        const { name, description, images } = req.body;

        const product = await stripe.products.create({
            name: name,
            description: description,
            images: images

        });

        res.status(200).json({ status: true, message: "Product Information Created!", data: product.id });

    } catch (err) {
        startSession
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
};

exports.retrieveProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await stripe.products.retrieve(productId);

        res.status(200).json({ status: true, message: "Product Information", data: product });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, active, description, default_price, images, livemode } = req.body;

        const product = await stripe.products.update(
            productId,
            {
                name: name,
                active: active,
                description: description,
                default_price: default_price,
                images: images
            }
        )

        res.status(200).json({ status: true, message: "Product Information Updated!", data: product });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await stripe.products.del(productId);

        res.status(200).json({ status: true, message: "Product Information Deleted!", data: product });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.allProduct = async (req, res) => {
    try {

        const products = await stripe.products.list();

        res.status(200).json({ status: true, message: "List all Products!", data: products });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.searchProduct = async (req, res) => {
    try {

        const { limit, page, created, active, livemode, name, default_price } = req.body;

        const products = await stripe.customers.search({
            query: "",
            page: page,
            name: name,
            limit: limit,
            active: active,
            created: created,
            livemode: livemode,
            default_price: default_price
        });

        res.status(200).json({ status: true, message: "List all Products!", data: products });
    } catch {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}