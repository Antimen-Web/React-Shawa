const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);
    const { token, items, totalPrice } = data;

    console.log(
      "Creating payment intent with items:",
      items,
      "token",
      token,
      "and total:",
      totalPrice
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(totalPrice) * 100,
      currency: "usd",
      description: "Payment for items",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: token,
      },
      confirm: true,
      return_url: "https://bespoke-scone-ed21f0.netlify.app/",
      metadata: {
        items: JSON.stringify(items),
      },
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
