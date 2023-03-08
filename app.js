const express = require('express')
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const path = require('path');

// Creating exoress app
const app = express();

// Keys
const PUBLISHABLE_KEY = process.env.PUBLISHABLE_KEY || "";
const SECRATE_KEY = process.env.SECRATE_KEY || "";

const stripe = require('stripe')(SECRATE_KEY);

// Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('view engine','ejs');

//Routes
app.get('/',(req,res)=>{
    res.render('home',{
        key: PUBLISHABLE_KEY
    })
})

app.post('/payment',(req,res)=>{
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name:'Yajindra',
        address:{
            line1:'Tikathli',
            postal_code: '20110',
            city: 'New Delhi',
            state:'Kathmandu',
            country:'Nepal'
        }
    })
    .then((customer)=>{
        return stripe.charges.create({
            amount: 7000,
            description:'Node js course',
            currency:'USD',
            customer: customer.id
        })
    })
    .then((charge)=>{
        console.log(charge);
        res.send('Success')
    })
    .catch((err)=>{
        res.send(err);
    })
})

const port = process.env.PORT || 3000;
// Creating express server
app.listen(port,()=>{
    console.log(`App is running on port: ${port}`);
    console.log(`Click here to visit : http://localhost:${port}`);
})
