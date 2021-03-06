var Q = require('q');
var RequestBuilder = require('./request-builder');
var Authentication = require('./authentication');
var winston = require('winston');
var Values = require('./values');

/*
* responsible for generating and fetching product qr code from pwc server
*/
var QrCode = function(clientId, clientSecret, env) {
  var _clientId = clientId,
      _clientSecret = clientSecret,
      _env = env;

  /*
  * @method generateQrCode
  * this method uses a product information to generate its unique
  * qr code on PayWithCapture server
  * @param data[merchant_id]
  * @param data[amount]
  * @param data[name]
  * @param data[description]
  * @param data[amount_locked]
  * @param data[image]. A base64 encoded string for the image
  */
  this.generateQrCode = function(data) {
    var deferred = Q.defer();
    new Authentication(_clientId, _clientSecret, _env)
        .authenticate()
        .then(function(authResp) {
          winston.info("In Authenticate of generateQrCode");
          new RequestBuilder(Values.server_base_url[_env])
                .addAccessToken(authResp['access_token'])
                .addData("merchant_id", data['merchant_id'])
                .addData("amount", data['amount'])
                .addData("name", data['name'])
                .addData("image", data['image'])
                .addData("description", data['description'])
                .addData("amountlocked", data['amount_locked'])
                .makePostRequest(Values.qr_code_path)
                .then(function(resp) {
                  winston.info("In RequestBuilder of generateQrCode");
                  if (resp.error) {
                    deferred.reject();
                  } else {
                    deferred.resolve(JSON.parse(resp.body));
                  }
                });
        });

    return deferred.promise;
  };

  /*
  * after a product qrCode is generated on the server
  * you can then use fetchProductQrCode to fetch its qr code using the product Id
  * @param productId
  */
  this.fetchProductQrCode = function(productId) {
    var deferred = Q.defer();
    new Authentication(_clientId, _clientSecret, _env)
      .authenticate()
      .then(function(authResp) {
        new RequestBuilder(Values.server_base_url[_env])
          .addAccessToken(authResp['access_token'])
          .addData("product_id", productId)
          .makePostRequest(Values.qr_code_path)
          .then(function(resp) {
            if (resp.error) {
              deferred.reject();
            } else {
              deferred.resolve(JSON.parse(resp.body));
            }
          });
      });
    return deferred.promise;
  }
}

module.exports = QrCode;
