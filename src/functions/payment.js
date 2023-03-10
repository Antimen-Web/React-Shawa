const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);
    const { items, totalPrice } = data;
    const totalPriceNumber = parseInt(totalPrice);
    if (isNaN(totalPriceNumber)) {
      throw new Error("Invalid total price");
    }

    console.log(
      "Creating payment intent with items:",
      items,
      "and total:",
      totalPriceNumber
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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPriceNumber * 100,
      currency: "usd",
      description: "Payment for items",
      payment_method: paymentMethod.id,
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
      body: JSON.stringify({ error: "Failed to create payment intent" }),
    };
  }
};
