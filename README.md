# PayWithCapture-Nodejs
The PayWithCapture Nodejs lets you write Javascript code to consume PayWithCapture APIs

You can signup for a PayWithCapture developer account at [PayWithCapture DevCenter](https://pwcdevcenter.herokuapp.com)

### PayWithCapture API Services
+ __Account Payment__
+ __Card Payment__
+ __Transactions__
+ __POS Printing__
+ __QR CODES__
+ __BVN Bank Account verification__

## Requirements
Nodejs

## Composer
You can install PayWithCapture-Nodejs with [npm](https://www.npmjs.com/)
```
 npm install git+https://github.com/PayWC/PayWithCapture-Nodejs.git --save
```

## Getting Started
To use, first create an instance of the PayWithCaptureClient class. This class is responsible for
providing clients to other services provided by PayWithCapture API. For more comprehensive tutorials
open the [example folder](https://github.com/PayWC/PayWithCapture-Nodejs/tree/master/examples)

```Javascript
//recommended approach
var client = new PayWithCaptureClient(clientId, clientSecret, env);

//for more information open the examples folder
```
When you register as a developer on PayWithCapture DevCenter, you will get a clientId and clientSecret
for Authentication. When in development stage the $env variable should be set to `staging`.
