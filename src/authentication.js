var RequestBuilder = require('./request-builder');
var Values = require('./values');
var Q = require('q');
var winston = require('winston');
/*
* This class is responsible for interacting with the pwc
* authentication server to retrieve auth access token
*
******/
var Authentication = function(clientId, clientSecret, env) {
  var clientId = clientId;
  var clientSecret = clientSecret;
  var env = env;

  var authResponse = {
    "access_token": "",
    "expires_in": "",
    "refresh_token": ""
  };

  /*
  * @method Authenticates against the server
  * @return promise
  */
  this.authenticate = function() {
    var deferred = Q.defer();
    var builderPromise = new RequestBuilder(Values.server_base_url[env])
                        .addData("client_id", clientId)
                        .addData("client_secret", clientSecret)
                        .addData("grant_type", "client_credentials")
                        .makePostRequest(Values.authentication_path);

    builderPromise.then(function(resp){
      if (resp.error) {
        // winston.info(JSON.stringify(resp));
        deferred.reject();
      } else {
        // winston.info(JSON.stringify(resp));
        var respObj = JSON.parse(resp.body);
        authResponse['access_token'] = respObj['access_token'];
        authResponse['refresh_token'] = respObj['refresh_token'];
        authResponse['expires_in'] = respObj['expires_in'];
        deferred.resolve(authResponse);
      }
    })

    return deferred.promise;
  }

}

module.exports = Authentication;
