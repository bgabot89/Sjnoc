
const express = require('express');
const path = require('path');
const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
//add a middleware view to hook up express, node.js to the client-side files, html
const bodyParser = require("body-parser");
// const stripe = require ('stripe')('sk_test_kdKA2VjFkSR43TuQUTDDFqkA');

const exphbs = require('express-handlebars');

//requiring check object from express-validator package
const { check } = require('express-validator/check')


const app = express();

//publishable and secret keys
// const keyPublishable = process.env.PUBLISHABLE_KEY;
// const keySecret = process.env.SECRET_KEY;

// const token = request.body.stripeToken;

//holds html files
// app.use(express.static(__dirname + '/View'));

//holds static files such as images and js files here
// app.use(express.static(`${__dirname}/public`));

// app.use(express.static('public'));

// app.use('/', express.static(path.join(__dirname, 'public')))

// app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// app.use(express.static(path.join(__dirname, 'public')))


//allow use of view engine middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//allow user of body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.use(require('body-parser').urlencoded({extended: false}));

// Set Static Folder
app.use('/static', express.static('./public'));

app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist/'));

//NEW ROUTING
app.get('/', (req, res) => {
  // console.log(keys);
  res.render('index', {
    stripePublishableKey: keys.stripePublishableKey
  });
});

app.get('/dor', (req, res) => {
  res.render('dor');
});

//testing payment checkout page -- for TESTING PURPOSES only

app.get('/payment', (req, res) => {
  // console.log(keys);
  res.render('charge', {
    stripePublishableKey: keys.stripePublishableKey
  });
});

app.get('/test', (req,res) => {
  res.render('test', {
    stripePublishableKey: keys.stripePublishableKey
  })
});

app.get('/success', (req,res) => {
  res.render('success');
})


app.post('/charge', (req, res) => {

  console.log(req.body);

  const amount = req.body.tokenAmt;

  //creates a new customer from form
  stripe.customers.create({
    email: req.body.email, //-->email: req.body.email
    source: req.body.tokenid //-->card: req.body.id
  })

  .then(customer => stripe.charges.create({
    amount,
    description: 'Donation',
    currency: 'usd',
    customer: customer.id
  }))

  .then(charge => {
    console.log('charged successful');
    res.render('success');
  });

  // .catch(err => {
  //   console.log("Error:", err);
  //   res.status(500).send({error: "Purchase failed"});
  // });

});

//OLD ROUTING with html files
// app.get('/', function(req, res) {
//     // res.sendFile(path.join(__dirname + '/index.html'));
//   res.sendFile(path.join(__dirname+ '/index.html'));
// });
//
// app.get('/success', function(req,res) {
//   // res.sendFile('/success.html');
//   res.sendFile(path.join(__dirname+ '/success.html'));
// })
//
// app.get('/dor', function(req,res) {
//   // res.sendFile('/success.html');
//   res.sendFile(path.join(__dirname+ '/dor.html'));
// })
//
// app.get('/about', function(req,res) {
//   res.sendFile(path.join(__dirname+ '/about.html'));
// })
//
// app.get('/newsletter', function(req,res) {
//   res.sendFile(path.join(__dirname+ '/newsletter.html'));
// })
//
// app.get('/more', function(req,res) {
//   res.sendFile(path.join(__dirname+ '/more.html'));
// })

//route to charge
// app.post('/charge', function(req,res) {
//   let amount = 500; //charge 5.00
//
//   stripe.customers.create({
//     email: req.body.email,
//     card: req.body.id
//   })
//   .then(customer =>
//     stripe.charges.create({
//         amount,
//         description: "Sample Charge",
//         currency: 'usd',
//         customer: customer.id
//     }))
//     // .then(charge => res.send(charge))
//
//     .then(charge => res.render('success'))
//
//     .catch(err => {
//       console.log("Error:", err);
//       res.status(500).send({error: "Purchase Failed"});
//     });


  // console.log(req.body);
  // res.send('TEST');
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

console.log('working on 3000');
