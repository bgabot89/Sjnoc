//api key is set here
var express = require('express');

var app = express();

var path = require('path');

app.use(express.static('public'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});



app.listen('3000');
console.log('working on 3000');

var stripe = require('stripe')('sk_test_kdKA2VjFkSR43TuQUTDDFqkA');

// const token = request.body.stripeToken; //using express
