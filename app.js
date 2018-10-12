
const express = require('express');
const app = express();
const path = require('path');
//add a middleware view to hook up express, node.js to the client-side files, html
const bodyParser = require("body-parser");
const stripe = require ('stripe')('sk_test_kdKA2VjFkSR43TuQUTDDFqkA');

//publishable and secret keys
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

// const token = request.body.stripeToken;

//holds html files
// app.use(express.static(__dirname + '/View'));

//holds static files such as images and js files here
// app.use(express.static(`${__dirname}/public`));

// app.use(express.static('public'));

// app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/static', express.static('./public'));

// app.use(express.static(path.join(__dirname, 'public')))


//allow user of body parser middleware
app.use(bodyParser.json());
app.use(require('body-parser').urlencoded({extended: false}));

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    // res.sendFile(path.join(__dirname + '/index.html'));
  res.sendFile(path.join(__dirname+ '/index.html'));
});

app.get('/success', function(req,res) {
  // res.sendFile('/success.html');
  res.sendFile(path.join(__dirname+ '/success.html'));
})

app.get('/dor', function(req,res) {
  // res.sendFile('/success.html');
  res.sendFile(path.join(__dirname+ '/dor.html'));
})

app.get('/about', function(req,res) {
  res.sendFile(path.join(__dirname+ '/about.html'));
})

app.get('/newsletter', function(req,res) {
  res.sendFile(path.join(__dirname+ '/newsletter.html'));
})

app.get('/more', function(req,res) {
  res.sendFile(path.join(__dirname+ '/more.html'));
})

//route to charge
app.post('/charge', function(req,res) {
  let amount = 500; //charge 5.00

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
    // .then(charge => res.send(charge))
    .then(charge => {
      console.log(res);
      res.redirect('/success');
   })

    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });

  // console.log(req.body);
  // res.send('TEST');
});


app.listen('3000');
console.log('working on 3000');
