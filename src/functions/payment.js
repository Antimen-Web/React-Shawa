const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);
    const { token, items, total } = data;

    const paymentIntent = await stripe.paymentIntents.create({
      items: items,
      amount: total,
      currency: "usd",
      description: "Payment for items",
      payment_method: token,
      confirm: true,
    });

    // сохранение информации об оплате в базу данных

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
