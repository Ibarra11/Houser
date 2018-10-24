const express = require('express');
const app = express();
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');
const stripe = require('stripe')('sk_test_r0TfH7jBUVUvuuVoVVMIAuzu');
require('dotenv').config();

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
app.get('/api/work_orders',workOrderCtrl.getWorkOrders);
app.post('/api/work_orders/completed', workOrderCtrl.completedWorkOrder);
app.get('/api/work_orders/completed', workOrderCtrl.getCompletedWorkOrders);


// Payments
app.post('/api/payment', async (req,res) =>{
    let {amount, token} = req.body;
    amount = amount * 100;
    try{
        let response = await stripe.charges.create({
            amount,
            currency: "usd",
            description: "An example charge",
            source: token.id
        })
        console.log(response)
        res.json({...response.status})
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});

app.listen(SERVER_PORT, console.log('Server running'));


