var AccountPayment = require('./src/account-payment');
var CardPayment = require('./src/card-payment');
var QrCode = require('./src/qr-code');
var Otp = require('./src/otp');
var PosPrinting = require('./src/pos-printing');

var PayWithCaptureClient = function(_clientId, _clientSecret, _env) {
  var clientId = _clientId,
      clientSecret = _clientSecret,
      env = _env;

  this.getAccountPayment = function() {
    return new AccountPayment(clientId, clientSecret, env);
  }

  this.getCardPayment = function() {
    return new CardPayment(clientId, clientSecret, env);
  }

  this.getQrCode = function() {
    return new QrCode(clientId, clientSecret, env);
  }

  this.getOtp = function() {
    return new Otp(clientId, clientSecret, env);
  }

  this.PosPrinting = function() {
    return new PosPrinting(clientId, clientSecret, env);
  }
}

module.exports = PayWithCaptureClient;
