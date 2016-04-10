var fs = require('fs');
var yelp =  require('./../config/yelp.js');
var request = require('querystring');
module.exports = function (app) {
  app.get('/index', function (req, res) {
    console.log('get/index');
    yelp.request_yelp({}, function(error, response, body){
      fs.writeFile('response.log',response);
      fs.writeFile('body.log',body);
    });
  })
}
