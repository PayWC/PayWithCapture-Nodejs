var assert = require('chai').assert;
var winston = require('winston');
var AccountPayment = require('../src/account-payment');

describe("AccountPayment", function() {
  describe("#createPayment", function() {
      var accountPaymentResp;

      before(function() {
        var clientId = "577e5fe42989c31100b26f14",
            clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";
        var accountClient = new AccountPayment(clientId, clientSecret, "staging");
        var data = {
          "amount":1000,
          "description": "test from nodejs library",
          "transaction_id": new Date().getTime(),
          "merchant_id": "577e5fe42989c31100b26f13",
          "account_number": "0690000032"
        };
        return accountClient
                  .createPayment(data)
                  .then(function(resp) {
                    // winston.info(JSON.stringify(resp));
                    accountPaymentResp = resp;
                  });
      });

      it("Should be successful", function() {
        assert.equal(accountPaymentResp['status'], "success", "Account payment successful");
      });


  });
});
