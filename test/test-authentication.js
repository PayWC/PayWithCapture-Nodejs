var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;
var winston = require('winston');
var Authentication  = require('../src/authentication')

describe("Authentication", function() {
  describe("#authenticate", function() {
    var authenticationResponse;

    before(function() {
      var clientId = "577e5fe42989c31100b26f14";
      var clientSecret = "diHopa8yFNDWofRNJIeREDmAV3HhL7bwr4umhlhPS0CgqIiOylA6Y9obfsV9VsbWBDuMUKE7MvVpIrtip4oX8zmG21I4QI1rhwjx";

      var auth = new Authentication(clientId, clientSecret, "staging");
      var authPromise = auth.authenticate();
      return authPromise.then(function(authResp){
              winston.info("In here and here is response: "+authResp.access_token);
              authenticationResponse = authResp;
            });
    });

    it("Should return access_token, expires_in, refresh_token", function() {
      authenticationResponse.should.have.property('access_token')
      authenticationResponse.should.have.property('expires_in')
      authenticationResponse.should.have.property('refresh_token')
    });

    it("Should return valid access token", function() {
      assert.isNotNull(authenticationResponse.access_token, "Access token has value");
    });

    it("Should return valid expires in", function() {
      assert.isNotNull(authenticationResponse.refresh_token, "Refresh token has value");
    });

    it("Should return valid refresh token", function() {
      assert.isNotNull(authenticationResponse.expires_in, "Expires In has value");
    });
  });
});
