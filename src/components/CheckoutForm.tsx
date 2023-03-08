import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";

export const CheckoutForm: React.FC = () => {
  const [paymentError, setPaymentError] = useState<string | undefined>(
    undefined
  );
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const result = await stripe.createToken(cardElement);

    if (result.error) {
      setPaymentError(result.error.message);
      setPaymentSuccess(false);
    } else {
      setPaymentError(undefined);
      setPaymentSuccess(true);

      // Отправить токен на сервер для создания платежа
      const token = result.token.id;
      // Отправить информацию об оплаченных товарах и их общей стоимости на сервер вместе с токеном
      const response = await axios.post("/.netlify/functions/payment", {
        token,
        items,
        totalPrice,
      });

      if (response.data.success) {
        // Оплата прошла успешно
        console.log("Payment succeeded");
      } else {
        // Ошибка при обработке платежа на сервере
        console.log("Payment failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Оплатить</button>
      {paymentError && <div>{paymentError}</div>}
      {paymentSuccess && <div>Оплата прошла успешно</div>}
    </form>
  );
};
