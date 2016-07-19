# Card payment example
This is a template for you to use in your own projects for processing access bank account payment with PayWithCapture.

```Javascript
var PayWithCapture = require('PayWithCapture');

var clientId = "eyet636484u4h", //Your clientId is in your PayWithCapture DevCenter account page
    clientSecret = "736484yekhgutit857485", //Your clientSecret is in your PayWithCapture DevCenter account page
    env = "staging"; // env can either be staging or production
var pwcClient = new PayWithCapture(clientId, clientSecret, env);
var accountPayment = pwcClient.getAccountPayment();

var data = {
  "amount":1000, //amount to charge
  "description": "test from nodejs library",
  "transaction_id": "7335564747", //your reference for this transaction
  "merchant_id": "577e5fe42989c31100b26f13",
  "account_number": "0690000032" //account number you wish to charge
};

//this method will charge the card for you and return a response
// you will need to validate this payment with the otp sent to the account holder's phone
accountPayment.createPayment(data)
            .then(function(resp){
              // do whatever you want with the response.
              // do JSON.stringify the response to see all attributes available
            });
```
