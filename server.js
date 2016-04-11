require('dotenv').config();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'./client')));

var yelp = require('./server/config/yelp.js');
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(8899,function () {
  console.log('listing on 8899 foodHunter');
})
