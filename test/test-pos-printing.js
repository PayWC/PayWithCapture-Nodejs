var assert = require('chai').assert;
var PosPrinting = require('../src/pos-printing');

describe("PosPrinting", function() {

  describe("#printFromMerchantCode()", function() {
    this.timeout(15000); //Fails with default. Default set at 2000ms

    var printedTransaction;
    var clientId = "577e5fe42989c31100b26f14";
    var clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";

    var code = "6836006";
    var printingClient;

    before(function() {
      printingClient = new PosPrinting(clientId, clientSecret, "staging");
      return printingClient.printFromMerchantCode(code)
              .then(function(resp) {
                printedTransaction = resp;
              });
    });

    it("printFromMerchantCode response status should be success", function() {
      assert.equal("success", printedTransaction.status);
    });

  });

  describe("#printFromReferenceNo()", function() {
    var printedTransaction;

    before(function() {
      var clientId = "577e5fe42989c31100b26f14";
      var clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";
      var printingClient = new PosPrinting(clientId, clientSecret, "staging");
      var ref = "39826667671"
      return printingClient.printFromReferenceNo(ref)
                    .then(function(resp) {
                      printedTransaction = resp;
                    });
    });

    it("printFromReferenceNo response status should be success", function() {
      assert.equal("success", printedTransaction.status);
    });

  });
});
