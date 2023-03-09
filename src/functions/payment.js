const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);
    const { token, items, totalPrice } = data;

    console.log(
      "Creating payment intent with items:",
      items,
      "and total:",
      total
    );

    const paymentIntent = await stripe.paymentIntents.create({
      items: items,
      amount: totalPrice,
      currency: "usd",
      description: "Payment for items",
      payment_method: token,
      confirm: true,
    });

    console.log("Payment intent created:", paymentIntent);

    // сохранение информации об оплате в базу данных

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.log("Error creating payment intent:", error);

    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
