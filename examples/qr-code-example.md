# Card payment example
This is a template for you to use in your own projects for sending and validating otp.

```Javascript
var PayWithCapture = require('PayWithCapture');

var clientId = "eyet636484u4h", //Your clientId is in your PayWithCapture DevCenter account page
    clientSecret = "736484yekhgutit857485", //Your clientSecret is in your PayWithCapture DevCenter account page
    env = "staging"; // env can either be staging or production
var pwcClient = new PayWithCapture(clientId, clientSecret, env);
var qrClient = pwcClient.getQrCode();

var data = {
  "merchant_id": "577e5fe42989c31100b26f13",
  "amount": "1000",
  "image": "746rhgufhfhftfy",
  "name": "fake",
  "description": "test by Ridwan",
  "amount_locked": false
};
//this method will generate a product qr code from the supplied data
qrClient.generateQrCode(data)
            .then(function(resp){
              // do whatever you want with the response.
              // do JSON.stringify the response to see all attributes available
            });

//this method will fetcht the generateQrCode with the productId
qrClient.fetchProductQrCode(productId)
            .then(function(resp){
              // do whatever you want with the response.
              // do JSON.stringify the response to see all attributes available
            });
```
