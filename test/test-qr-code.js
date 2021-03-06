var assert = require('chai').assert;
var QrCode = require('../src/qr-code');
var winston = require('winston');

describe("QrCode", function() {
  //when a qr code is generated this variable is
  //set from the server response in generateQrCode
  var productId;
  describe("#generateQrCode()", function() {
    var generateQrCodeResponse;

    before(function() {
      var clientId = "577e5fe42989c31100b26f14";
      var clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";
      var data = {
        "merchant_id": "577e5fe42989c31100b26f13",
        "amount": "1000",
        "image": "746rhgufhfhftfy",
        "name": "fake",
        "description": "test by Ridwan",
        "amount_locked": false
      };
      return new QrCode(clientId, clientSecret, "staging")
              .generateQrCode(data)
              .then(function(resp) {
                generateQrCodeResponse = resp;
                productId = generateQrCodeResponse['data']['id'];
              });
    });

    it("Response from generateQrCode server should be success", function() {
      // winston.info(JSON.stringify(generateQrCodeResponse));
      // winston.info(typeof generateQrCodeResponse);
      assert.equal("success", generateQrCodeResponse['status'], "generateQrCodeResponse is success");
    });
  });

  describe("#fetchProductQrCode()", function() {
    var fetchQrCodeResponse;

    before(function() {
      var clientId = "577e5fe42989c31100b26f14";
      var clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";

      return new QrCode(clientId, clientSecret, "staging")
              .fetchProductQrCode(productId)
              .then(function(resp) {
                fetchQrCodeResponse = resp;
              });
    });

    it("Response from generateQrCode server should be success", function() {
      // winston.info(JSON.stringify(generateQrCodeResponse));
      // winston.info(typeof generateQrCodeResponse);
      assert.equal("success", fetchQrCodeResponse['status'], "fetchQrCodeResponse is success");
    });
  });


});
