var Values = require('./values');
var winston = require('winston');
var RequestBuilder = require('./request-builder');
var Authentication = require('./authentication');
var Q = require('q');

/*
* PosPrinting class is used for printing details of transactions
* new PosPrinting(clientId, clientSecret, env);
*/
var PosPrinting = function(clientId, clientSecret, env) {
  var _clientId = clientId,
      _clientSecret = clientSecret,
      _env = env;

  /*
  * printFromMerchantCode can be used to print details of transactions
  * by a merchant using the merchants code. Your merchant code can be found
  * on your pwc devcenter account page
  * return promise
  */
  this.printFromMerchantCode = function(merchantCode) {
    var deferred = Q.defer();
    var auth = new Authentication(_clientId, _clientSecret, _env);
    auth.authenticate().then(function(authResp) {
      new RequestBuilder(Values.server_base_url[_env])
          .addAccessToken(authResp['access_token'])
          .addData("merchant_code", merchantCode)
          .makePostRequest(Values.pos_printing_path)
          .then(function(resp) {
            winston.info("printFromMerchantCode response from server: "+JSON.stringify(resp))
            if(resp.error){
              deferred.reject();
            } else {
              deferred.resolve(JSON.parse(resp.body));
            }
          });
    });

    return deferred.promise;
  };

  this.printFromReferenceNo = function(ref) {
    var deferred = Q.defer();
    var auth = new Authentication(_clientId, _clientSecret, _env);
    auth.authenticate().then(function(authResp) {
      new RequestBuilder(Values.server_base_url[_env])
          .addAccessToken(authResp['access_token'])
          .addData("reference_no", ref)
          .makePostRequest(Values.pos_printing_path)
          .then(function(resp) {
            winston.info("printFromMerchantCode response from server: "+JSON.stringify(resp))
            if(resp.error){
              deferred.reject();
            } else {
              deferred.resolve(JSON.parse(resp.body));
            }
          });
    });

    return deferred.promise;
  };
}

module.exports = PosPrinting;
