var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash');
module.exports={
  request_yelp: function (set_parameters,cb) {
    var httpMethod ='GET';
    var url = 'http://api.yelp.com/v2/search';
    var default_parameters = {
     
    };
    var required_parameters = {
      oauth_consumer_key : process.env.oauth_consumer_key,
      oauth_token : process.env.oauth_token,
      oauth_nonce:n(),
      oauth_timestamp: n().toString().substr(0,10),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_versuin: '1.0'
    };
    var parameters = _.assign(default_parameters, set_parameters, required_parameters);

    /* We set our secrets here */
    var consumerSecret = process.env.consumerSecret;
    var tokenSecret = process.env.tokenSecret;

    /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
    /* Note: This signature is only good for 300 seconds after the oauth_timestamp */
    var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

    /* We add the signature to the list of paramters */
    parameters.oauth_signature = signature;

    /* Then we turn the paramters object, to a query string */
    var paramURL = qs.stringify(parameters);

    /* Add the query string to the url */
    var apiURL = url+'?'+paramURL;

    /* Then we use request to send make the API Request */
    request(apiURL, function(error, response, body){
      console.log(apiURL);
      return cb(error, response, body);
      });
    }
}
