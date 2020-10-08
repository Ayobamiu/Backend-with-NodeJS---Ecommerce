const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "ayobamiu@gmail.com",
  from: "usman.ayobami.g20@gmail.com", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

// sgMail.send(msg);

const sendWelcomeMessage = (email, name) => {
  const msg = {
    to: email,
    from: "usman.ayobami.g20@gmail.com", // Use the email address or domain you verified above
    subject: "Welcome to our online Shop",
    text:
      "Take a tour and shop at your convenience. " +
      name +
      ", Tell us how you enjoy it ",
  };

  sgMail.send(msg);
};

const sendCancellationMessage = (email, name) => {
  const msg = {
    to: email,
    from: "usman.ayobami.g20@gmail.com", // Use the email address or domain you verified above
    subject: "We will miss you",
    text: name + ", Tell us how we could be better",
  };

  sgMail.send(msg);
};

const sendOrderConfirmMessage = (email, name) => {
  const msg = {
    to: email,
    from: "usman.ayobami.g20@gmail.com", // Use the email address or domain you verified above
    subject: "Order Confirmed",
    text: "Track your order on your profile",
  };

  sgMail.send(msg);
};

module.exports = {
  sendWelcomeMessage,
  sendCancellationMessage,
  sendOrderConfirmMessage,
};
