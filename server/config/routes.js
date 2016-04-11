var fs = require('fs');
var yelp =  require('./../config/yelp.js');
var request = require('querystring');
var users = require('./../controllers/users.js')
module.exports = function (app) {
  app.get('/index', function (req, res) {
    console.log('get/index');
    yelp.request_yelp({}, function(error, response, body){
      fs.writeFile('response.log',response);
      fs.writeFile('body.log',body);
    });
  });
  app.post('/user',function(req,res){
    users.findOne(req,res);
  });
  app.post('/create',function(req,res){
    users.create(req,res);
  })
}
