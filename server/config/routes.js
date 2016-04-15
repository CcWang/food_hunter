var fs = require('fs');
var yelp =  require('./../config/yelp.js');
var request = require('querystring');
var users = require('./../controllers/users.js')
var API_KEY = process.env.google_key;

module.exports = function (app) {
  app.post('/index', function (req, res) {
    // console.log(req.body.list.unshift('Chinese'));
    
    var food = req.body.list.join(',').toLowerCase();
    var list ={
      //using google api to get current location
      term:food,
      cll:'37.3895,-122.0183',
      sort:2,
      limit:5,
      radius:20000

    }
    yelp.request_yelp(list,function(error, response, body){
      fs.writeFile('body.log',body);
      fs.writeFile('error.log',error);
      console.log(body['error']);
      res.json(body);
    });
  });
  app.post('/user',function(req,res){
    users.findOne(req,res);
  });
  app.post('/create',function(req,res){
    users.create(req,res);
  });
  app.post('/updateCategory/:id',function(req,res){
    users.updateCategory(req,res);
  });
  app.post('/findByEmail',function(req,res){
    users.findByEmail(req,res);
  });
  app.post('/getGoogleKey',function(req,res){
    res.json({key:API_KEY});
  });
}
