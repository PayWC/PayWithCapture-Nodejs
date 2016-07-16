var Q = require('q');
var request = require('request');
var logger = require('winston');

/*
* This class is responsible for wrapping the http request
* library
* @constructor
* @param {String} baseUrl.
* e.g RequestBuilder("http://pwcdev.com")
*/
var RequestBuilder = function(baseUrl) {
  var serverBaseUrl = baseUrl;
  var formData = {};
  var headers = {};
  var queryParams = {};

  /*
  * This method adds the header key, value
  * for the request to be made
  * @param {String} name.
  * @param {String} value.
  *
  */
  this.addHeader = function(name, value) {
    headers[name] = value;
    return this;
  }

  /*
  * Post data
  */
  this.addData = function(name, value) {
    formData[name] = value;
    return this;
  }

  this.addQueryParam = function(name, value) {
    queryParams[name] = value;
    return this;
  }

  this.addAccessToken = function(token) {
    return this.addHeader("Authorization", "Bearer "+token);
  }

  this.addCookie = function(cookie) {
    return this.addHeader("Set-Cookie", cookie);
  }

  /*
  * This method is responsible for building post request and sending it to
  * PayWithCapture server
  * @param {String} path.
  */
  this.makePostRequest = function(path) {
    var deferred = Q.defer();
    logger.info("serverBaseUrl is: "+ serverBaseUrl);
    logger.info("Endpoint path is: "+ path);
    request({
      url: serverBaseUrl+path,
      headers: headers,
      method: "POST",
      form: formData
    }, function(error, response, body){
      if(error){
        logger.error(error);
        deferred.reject();
      }else {
        deferred.resolve({response: response, body: body});
      }
    });
    return deferred.promise;
  }

  /*
  * This method is responsible for building get request and sending it to
  * PayWithCapture server
  */
  this.makeGetRequest = function(path) {
    var deferred = Q.defer();
    request({
      url: serverBaseUrl+path,
      headers: headers,
      method: "GET",
      qs: queryParams
    }, function(error, response, body){
      if(error){
        logger.error(error);
        deferred.reject();
      }else {
        deferred.resolve({response: response, body: body});
      }
    });
    return deferred.promise;
  }
}

module.exports = RequestBuilder;
