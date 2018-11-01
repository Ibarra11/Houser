const express = require('express');
const app = express();
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const stripe = require('stripe')(process.env.PAYMENT_KEY);

// Controllers
const authCtrl = require('./controllers/authController');
const propertyCtrl = require('./controllers/propertyController');
const workOrderCtrl = require('./controllers/workOrderController');
const paymentCtrl = require('./controllers/paymentController');

const {
    SERVER_PORT, CONNECTION_STRING, SESSION_SECRET
} = process.env;

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING)
    .then(db => {
        console.log('DB Running');
        app.set('db', db);
    })
    .catch(err => console.error(err));

// Handle owners login and signup
app.post('/api/signup', authCtrl.ownerRegistration);
app.post('/api/login', authCtrl.ownerLogin);

// Property request
app.post('/api/property', propertyCtrl.addProperty);
app.get('/api/property', propertyCtrl.getProperties);
app.delete('/api/property/:propertyId', propertyCtrl.deleteProperty);
app.put('/api/property/:propertyId', propertyCtrl.updateProperty);

// Work order request
app.post('/api/work_orders', workOrderCtrl.createWorkOrder);
app.get('/api/work_orders', workOrderCtrl.getWorkOrders);
app.post('/api/work_orders/completed', workOrderCtrl.completedWorkOrder);
app.get('/api/work_orders/completed', workOrderCtrl.getCompletedWorkOrders);
app.put('/api/workorder/:id', workOrderCtrl.updateWorkOrder);
app.delete('/api/workorder/:id', workOrderCtrl.deleteWorkOrder);


// Payments
app.post('/api/payment', async (req, res, next) => {
    let { name, ssn } = req.body;
    let { property_id } = (await req.app.get('db').get_tenant_information([name, ssn]))[0];
    if (property_id) {
        req.property_id = property_id;
        next();
    }
    else {
        res.status(400).send("No tenant found");
    }
}, async (req, res) => {
    let { amount, token } = req.body;
    let stripeAmount = amount * 100;
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newDate = year + '/' + month + "/" + day;
    console.log(newDate);
    try {
        let response = await stripe.charges.create({
            amount: stripeAmount,
            currency: "usd",
            description: "An example charge",
            source: token.id
        })
        let stripeId = response.id;
        let paymentResponse = await req.app.get('db').insert_payment([req.property_id, amount, newDate, stripeId]);
        if (paymentResponse) {
            res.status(200).send("Payment Successful");
        }
        else {
            res.status(400).send("Payment unsucceessful");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
});

app.get('/api/payments', paymentCtrl.getPayments);

app.listen(SERVER_PORT, console.log('Server running'));


