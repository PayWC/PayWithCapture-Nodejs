var assert = require('chai').assert;
var winston = require('winston');
var CardPayment = require('../src/card-payment');

describe("CardPayment", function() {
  describe("#createPayment()", function() {
    var cardPaymentResponse;

    before(function(){
      var clientId = "577e5fe42989c31100b26f14";
      var clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";
      var cardClient = new CardPayment(clientId, clientSecret, "staging");
      var data = {
        "card_no": "5061020000000000094",
        "exp_month": "01",
        "exp_year": "2018",
        "cvv": "350",
        "pin": "1111",
        "amount": 1000,
        "description": "from nodejs",
        "transaction_id": new Date().getTime(),
        "merchant_id": "577e5fe42989c31100b26f13",
      };
      return cardClient.createPayment(data)
                        .then(function(resp) {
                          winston.info(JSON.stringify(resp));
                          cardPaymentResponse = resp;
                        });
    });

    it("Card payment response should return success", function() {
      winston.info(JSON.stringify(cardPaymentResponse));
    });
  });
});
