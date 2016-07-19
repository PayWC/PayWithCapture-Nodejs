# Card payment example
This is a template for you to use in your own projects for processing card payment with PayWithCapture.

```Javascript
var PayWithCapture = require('PayWithCapture');

var clientId = "eyet636484u4h", //Your clientId is in your PayWithCapture DevCenter account page
    clientSecret = "736484yekhgutit857485", //Your clientSecret is in your PayWithCapture DevCenter account page
    env = "staging"; // env can either be staging or production
var pwcClient = new PayWithCapture(clientId, clientSecret, env);
var cardPayment = pwcClient.getCardPayment();

var data = {
  "card_no": "5061020000000000094",
  "exp_month": "01",
  "exp_year": "2018",
  "cvv": "350",
  "pin": "1111",
  "amount": 1000,
  "description": "from nodejs",
  "transaction_id": "746748494940", // your reference for this transaction
  "merchant_id": "577e5fe42989c31100b26f13", // your merchant id is in your devcenter account page.
}

//this method will charge the card for you and return a response
cardPayment.createPayment(data)
            .then(function(resp){
              // do whatever you want with the response.
              // do JSON.stringify the response to see all attributes available
            });
```
