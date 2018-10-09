const express = require('express');
const app = express();
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// Controllers
const authCtrl = require('./controllers/authController');
const propertyCtrl = require('./controllers/propertyController');


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



app.listen(SERVER_PORT, console.log('Server running'));


