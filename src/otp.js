var winston = require('winston');
var RequestBuilder = require('./request-builder');
var Authentication = require('./authentication');
var Values = require('./values');
var Q = require('q');

/*
* This class is responsible for communicating with the Otp
* server
*/
var Otp = function(clientId, clientSecret, env) {
  var _clientId = clientId,
      _clientSecret = clientSecret,
      _env = env;

  var sendOtp = function(phone, path) {
    var deferred = Q.defer();
    new Authentication(_clientId, _clientSecret, _env)
      .authenticate()
      .then(function(authResp) {
        new RequestBuilder(Values.server_base_url[_env])
          .addAccessToken(authResp['access_token'])
          .addQueryParam("phonenumber", phone)
          .makeGetRequest(path)
          .then(function(resp) {
            winston.info(JSON.stringify(resp));
            if(resp.error) {
              deferred.reject(resp);
            } else {
              deferred.resolve(JSON.parse(resp.body));
            }
          });
      });
      return deferred.promise;
  }

  this.sendVoiceOtp = function(phone){
    var deferred = Q.defer();
    sendOtp(phone, Values.voice_otp_path+phone)
      .then(function(resp) {
        if (resp.error) {
          deferred.reject(resp.error);
        } else {
          deferred.resolve(resp);
        }
      })
    return deferred.promise;
  };

  this.sendSmsOtp = function(phone){
    var deferred = Q.defer();
    sendOtp(phone, Values.sms_otp_path+phone)
      .then(function(resp) {
        if (resp.error) {
          deferred.reject(resp.error);
        } else {
          deferred.resolve(resp);
        }
      })
    return deferred.promise;
  };


};

module.exports = Otp;
