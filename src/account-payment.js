var winston = require('winston');
var RequestBuilder = require('./request-builder');
var Values = require('./values');
var Authentication = require('./authentication');
var Q = require('q');
/**
* This class is responsible for making acount payments
* with the PayWithCapture API
* constructor function
* var cardClient = new AccountPayment(clientId, clientSecret, "staging")
*/

var AccountPayment = function(clientId, clientSecret, env) {
  var _clientId = clientId,
      _clientSecret = clientSecret,
      _env = env;

  /*
  * @method createPayment responsible for creating payments
  * if a payment requires validation then do validatePayment after
  * create. if not then the payment is successful onces createPayment returns success.
  * @param data['amount']
  * @param data['description']
  * @param data['transaction_id']
  * @param data['merchant_id']. Your merchant id can be found in your PayWithCapture dev portal settings page
  * @param data['account_number']
  *
  * @return promise
  */
  this.createPayment = function(data) {
    var deferred = Q.defer();
    var auth = new Authentication(_clientId, _clientSecret, _env);
    auth.authenticate()
        .then(function(authResp) {
            var builderPromise = new RequestBuilder(Values.server_base_url[_env])
                                  .addAccessToken(authResp['access_token'])
                                  .addData("type", "account")
                                  .addData("amount", data['amount'])
                                  .addData('description', data['description'])
                                  .addData('transaction_id', data['transaction_id'])
                                  .addData('merchant_id', data['merchant_id'])
                                  .addData('accountnumber', data['account_number'])
                                  .makePostRequest(Values.payment_path);

           builderPromise.then(function(resp) {
             if (resp.error)
              deferred.reject(resp.error);
             else
              deferred.resolve(JSON.parse(resp.body));
           });
        });

    return deferred.promise;
  };


};

module.exports = AccountPayment;
