const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);
    const { items } = data;
    let totalPrice = 0;

    for (let i = 0; i < items.length; i++) {
      totalPrice += items[i].price * items[i].count;
    }

    console.log(
      "Creating payment intent with items:",
      items,
      "and total:",
      totalPrice
    );

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: "4242424242424242",
        exp_month: 12,
        exp_year: 2025,
        cvc: "123",
      },
    });

    if (!paymentMethod || !paymentMethod.id) {
      throw new Error("Failed to create payment method");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "usd",
      description: "Payment for items",
      payment_method: paymentMethod.id,
      confirm: true,
      return_url: "https://bespoke-scone-ed21f0.netlify.app/",
      metadata: {
        items: JSON.stringify(items),
      },
    });

    if (!paymentIntent || !paymentIntent.id) {
      throw new Error("Failed to create payment intent");
    }

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
      body: JSON.stringify({
        error: error.message || "Failed to create payment intent",
      }),
    };
  }
};
