var assert = require('chai').assert;
var winston = require('winston');
var Otp = require('../src/otp');

describe("Otp", function() {
  describe("#sendVoiceOtp()", function() {
    var voiceOtpResp;
    before(function() {
      var clientId = "577e5fe42989c31100b26f14";
      var clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";
      var client = new Otp(clientId, clientSecret, "staging");
      return client.sendVoiceOtp("+2349098090424")
                   .then(function(resp) {
                     voiceOtpResp = resp;
                    });
    });

    it("sendVoiceOtp response status should be success", function() {
      assert.equal("success", voiceOtpResp['status'], "Voice otp request is successful");
    });
  });

  describe("#sendSmsOtp()", function() {
    var smsOtpResp;
    before(function() {
      var clientId = "577e5fe42989c31100b26f14";
      var clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";
      var client = new Otp(clientId, clientSecret, "staging");
      return client.sendSmsOtp("+2349098090424")
                   .then(function(resp) {
                     smsOtpResp = resp;
                    });
    });

    it("sendVoiceOtp response status should be success", function() {
      assert.equal("success", smsOtpResp['status'], "Sms otp request is successful");
    });
  });

});
