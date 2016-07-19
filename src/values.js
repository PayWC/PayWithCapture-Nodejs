/*
* This file contains static string values
* used in varius path of the application
*
*/
var values = {
  server_base_url: {
    staging: "https://pwcstaging.herokuapp.com",
    production: "https://pwcstaging.herokuapp.com"
  },
  authentication_path: "/oauth/token",
  payment_path: "/orders/oneOffPayment",
  pos_printing_path: "/orders/transactions",
  qr_code_path: "/products/getQrCode",
  voice_otp_path: "/otp/voice/",
  sms_otp_path: "/otp/sms/"
}

module.exports = values;
