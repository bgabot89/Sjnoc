const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const stripe = require ('stripe')('sk_test_kdKA2VjFkSR43TuQUTDDFqkA');

//publishable and secret keys
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;



// const token = request.body.stripeToken;

//add a middleware view to hook up express, node.js to the client-side files, html

app.use(express.static('public'));

//allow user of body parser middleware
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: false}));


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//route to charge
app.post('/charge', function(req,res) {
  let amount = 500; //charge 5.00


  // stripe.customers.create({
  //   email: 'foo-customer@example.com'
  // }).then(function(customer){
  //   return stripe.customers.createSource(customer.id, {
  //     object: 'card',
  //     exp_month: 10,
  //     exp_year: 2018,
  //     number: '4242 4242 4242 4242',
  //     cvc: 100
  //   });
  // }).then(function(source) {
  //   return stripe.charges.create({
  //     amount: 1600,
  //     currency: 'usd',
  //     customer: source.customer
  //   });
  //
  //   })

  //
  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: 'usd',
        customer: customer.id
    }))
    .then(charge => res.send(charge))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });

  // console.log(req.body);
  // res.send('TEST');
});


app.listen('3000');
console.log('working on 3000');
