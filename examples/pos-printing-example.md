# Card payment example
This is a template for you to use in your own projects for sending and validating otp.

```Javascript
var PayWithCapture = require('PayWithCapture');

var clientId = "eyet636484u4h", //Your clientId is in your PayWithCapture DevCenter account page
    clientSecret = "736484yekhgutit857485", //Your clientSecret is in your PayWithCapture DevCenter account page
    env = "staging"; // env can either be staging or production
var pwcClient = new PayWithCapture(clientId, clientSecret, env);
var posClient = pwcClient.getPosPrinting();

var merchantCode = "474649"; //You merchant code is in your account page on PayWithCapture DevCenter
//this method will return transactions done by a merchant
posClient.printFromMerchantCode(merchantCode)
            .then(function(resp){
              // do whatever you want with the response.
              // do JSON.stringify the response to see all attributes available
            });

var ref = "";
//this method will return details of a transaction with the supplied reference no
posClient.printFromReferenceNo(ref)
            .then(function(resp){
              // do whatever you want with the response.
              // do JSON.stringify the response to see all attributes available
            });
```
