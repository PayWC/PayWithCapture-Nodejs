var RequestBuilder = require('./request-builder');
var Authentication = require('./authentication');
var Values = require('./values');
var Q = require('q');
var winston = require('winston');

/*
* @class CardPayment. Responsible for card payments
* @param clientId. Your clientId can be found in PWC devcenter
* @param clientSecret. Your clientSecret can be found in PWC devcenter.
*/
var CardPayment = function(clientId, clientSecret, env) {
  var _clientId = clientId,
      _clientSecret = clientSecret,
      _env = env;

  /*
  * @method createPayment responsible for creating a payment on
  * PayWithCapture Server. Some payments require validation after
  * creation. If so then do validatePayment if not no need to validatePayment
  * @param data['amount']
  * @param data['description']
  * @param data['transaction_id']
  * @param data['merchant_id']
  * @param data['card_no']
  * @param data['exp_month']
  * @param data['exp_year']
  * @param data['cvv']
  * @param data['pin'] //optional
  * @param data['bvn'] //optional
  * @param data['redirect_url'] //optional
  */
  this.createPayment = function(data) {
    winston.info("In createPayment");
    var deferred = Q.defer();
    var auth = new Authentication(_clientId, _clientSecret, _env)
    auth.authenticate()
        .then(function(authResp) {
          winston.info("In authenticate callback");
          winston.info("Response from auth: "+ JSON.stringify(authResp));
          var builder = new RequestBuilder(Values.server_base_url[_env])
                          .addAccessToken(authResp['access_token'])
                          .addData("type", "card")
                          .addData("amount", data['amount'])
                          .addData("description", data['description'])
                          .addData("merchant_id", data['merchant_id'])
                          .addData("cardno", data['card_no'])
                          .addData("expmth", data['exp_month'])
                          .addData("expyear", data['exp_year'])
                          .addData("cvv", data['cvv']);
          winston.info("before the first if");
          if (data['pin'] !== undefined)
            builder.addData("pin", data['pin']);
          winston.info("after the first if");
          if (data['bvn'] !== undefined)
            builder.addData("bvn", data['bvn']);

          if (data['redirect_url'] !== undefined)
            builder.addData("redirect_url", data['redirect_url']);

          winston.info("About to enter makePostRequest");
          builder.makePostRequest(Values.payment_path)
                  .then(function(resp) {
                    winston.info('in makePostRequest callback and server response is '+JSON.stringify(resp));
                    if (resp.error){
                      deferred.reject(resp.error);
                    } else {
                      deferred.resolve(resp.body);
                    }
                  });

        });

    return deferred.promise;
  };
};

module.exports = CardPayment;
