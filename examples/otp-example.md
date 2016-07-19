# Card payment example
This is a template for you to use in your own projects for sending and validating otp.

```Javascript
var PayWithCapture = require('PayWithCapture');

var clientId = "eyet636484u4h", //Your clientId is in your PayWithCapture DevCenter account page
    clientSecret = "736484yekhgutit857485", //Your clientSecret is in your PayWithCapture DevCenter account page
    env = "staging"; // env can either be staging or production
var pwcClient = new PayWithCapture(clientId, clientSecret, env);
var otpClient = pwcClient.getOtp();

//this method will send otp to phone number
otpClient.sendSmsOtp(phone)
            .then(function(resp){
              // do whatever you want with the response.
              // do JSON.stringify the response to see all attributes available
            });

//this method will send voice otp to the phone number
otpClient.sendVoiceOtp(phone)
            .then(function(resp){
              // do whatever you want with the response.
              // do JSON.stringify the response to see all attributes available
            });
```
