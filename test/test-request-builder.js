var assert = require("chai").assert;
var logger = require("winston");
var RequestBuilder = require("../src/request-builder");

describe("RequestBuilder", function() {
  describe("#makePostRequest()", function() {
    it("It should return response from server", function() {
      logger.info("Its running makePostRequest");
      var builderPromise = new RequestBuilder("https://pwcstaging.herokuapp.com")
                      .addData("name", "Ridwan")
                      .addData("email", "darilldrems@gmail")
                      .makePostRequest("/auth/token");

      return builderPromise.then(function(resp){
              logger.info("Response crom server is:: "+JSON.stringify(resp));
              assert(resp.response.statusCode == 404)
            });
    });
  });

  describe("#makeGetRequest()", function() {
    it("It should return response from server", function() {
      logger.info("Its running makePostRequest");
      var builderPromise = new RequestBuilder("https://pwcstaging.herokuapp.com")
                      .addData("name", "Ridwan")
                      .addData("email", "darilldrems@gmail")
                      .makeGetRequest("/auth/token");

      return builderPromise.then(function(resp){
              logger.info("Response crom server is:: "+JSON.stringify(resp));
              assert(resp.response.statusCode == 500);
            });
    });
  });
})
