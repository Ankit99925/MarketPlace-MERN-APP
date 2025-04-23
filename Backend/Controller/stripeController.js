const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
exports.webhook = (req, res) => {
  let event = req.body;

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      res.sendStatus(200); // Just acknowledge receipt
      break;
    case "checkout.session.expired":
      res.sendStatus(200);
      break;
    default:
      res.sendStatus(200);
  }
};
