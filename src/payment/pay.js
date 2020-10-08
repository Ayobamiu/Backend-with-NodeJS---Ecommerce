const Ravepay = require("flutterwave-node");

const rave = new Ravepay(
  "FLWPUBK_TEST-5120f20f66db336ffc0f6131bcc49936-X",
  "FLWSECK_TEST-8eae7738dfec94f3f5ea42dfa65da661-X",
  true
);

rave.Card.charge({
  cardno: "5438898014560229",
  cvv: "564",
  expirymonth: "10",
  expiryyear: "20",
  currency: "NGN",
  country: "NG",
  amount: "10",
  email: "user@gmail.com",
  phonenumber: "0902620185",
  firstname: "temi",
  lastname: "desola",
  IP: "355426087298442",
  txRef: "MC-" + Date.now(), // your unique merchant reference
  meta: [{ metaname: "flightID", metavalue: "123949494DC" }],
  redirect_url: "https://rave-webhook.herokuapp.com/receivepayment",
  device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c",
})
  .then((resp) => {
    // console.log(resp.body);

    rave.Card.validate({
      transaction_reference: resp.body.data.flwRef,
      otp: 12345,
    }).then((response) => {
      console.log(response.body.data.tx);
    });
  })
  .catch((err) => {
    console.log(err);
  });
