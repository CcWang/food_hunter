var fs = require('fs');
var yelp =  require('./../config/yelp.js');
var request = require('querystring');
var users = require('./../controllers/users.js')
var API_KEY = process.env.google_key;

module.exports = function (app) {
  app.post('/index', function (req, res) {
    // console.log(req.body.list.unshift('Chinese'));
    var results = {};
    var count = 0;
    var restaurants = req.body.list.split(',');
    // console.log( req.body.list.split(','));
    function getRestaurant (element) {
      var food = element.toLowerCase();
      var location = req.body.location.join(',');
      var list ={
      //using google api to get current location
        term:food,
        ll:location,
        limit:20,
        radius_filter:14000,
        sort:2
      }
      yelp.request_yelp(list,function(error, response, body){
        // fs.writeFile('error.log',error);
        results[element] = JSON.parse(body);
        count++;
        if (count === restaurants.length) {
          res.json(results);
        }
      });
    }
    restaurants.forEach(getRestaurant);
    
  });
  app.post('/changeDistance',function(req,res){
    var results = {}
    var location = req.body.location.join(',');
    var limit;
    var list = {
      term:req.body.list,
      ll:location,
      radius_filter:req.body.radius,
      sort:2
    }
    yelp.request_yelp(list,function(error, response, body){
      results[req.body.list] = JSON.parse(body);
      // console.log(results);
      res.json(results);
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
