const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);
    const { token, items, totalPrice } = data;

    // получаем payment_method из токена
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: "токен_карты",
      },
    });

    console.log(
      "Creating payment intent with items:",
      items,
      "payment_method ",
      paymentMethod,
      "and total:",
      totalPrice
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(totalPrice) * 100,
      currency: "usd",
      description: "Payment for items",
      payment_method: paymentMethod,
      confirm: true,
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
