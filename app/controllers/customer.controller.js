const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, creditCardToken } = req.body;


        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Invalid input fields' });
        }

        // Validate credit card using Stripe
        if (!creditCardToken) {
            return res.status(400).json({ message: 'Invalid credit card token' });
        }

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                token: creditCardToken,
            },
        });

        const customer = await stripe.customers.create({
            name: name,
            email: email,
            phone: phone,
            payment_method: paymentMethod.id,
            invoice_settings: {
                default_payment_method: paymentMethod.id
            }
        });

        res.status(200).json({ status: true, message: "Customer Information Created!", data: customer.id });

    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
};

exports.retrieveCustomer = async (req, res) => {
    try {

        const customerId = req.params.id;

        const customer = await stripe.customers.retrieve(customerId);

        res.status(200).json({ status: true, message: "Customer Information", data: customer });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;

        const { name, email, paymentMethod, phone } = req.body;

        const customer = await stripe.customers.update(
            customerId,
            {
                name: name,
                email: email,
                phone: phone
            });
        res.status(200).json({ status: true, message: "Customer Information Updated!", data: customer });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;

        const customer = await stripe.customers.del(customerId);

        res.status(200).json({ status: true, message: "Customer Information Deleted!", data: customer });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.allCustomer = async (req, res) => {
    try {

        const customers = await stripe.customers.list();

        res.status(200).json({ status: true, message: "List all Customers!", data: customers });
    } catch (err) {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}

exports.searchCustomer = async (req, res) => {
    try {
        const { limit, page, created, email, metadata, name, phone } = req.body;

        const customer = await stripe.customers.search({
            query: "",
            name : name,
            email : email,
            phone : phone,
            created : created,
            metadata : metadata,
            limit : limit,
            page : page
        });
    } catch {
        console.log("stripe error : ", err);
        res.status(500).json({ status: false, message: "An error occurred!", err: err.message });
    }
}