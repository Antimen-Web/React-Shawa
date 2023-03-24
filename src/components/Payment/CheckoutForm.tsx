import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import styles from "./CheckoutForm.module.scss";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

export const CheckoutForm: React.FC = () => {
  const [paymentError, setPaymentError] = useState<string | undefined>(
    undefined
  );
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

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
      setTimeout(() => navigate("/"), 1000);

      // Отправить токен на сервер для создания платежа
      const token = result.token;
      console.log("token" + token);
      // Отправить информацию об оплаченных товарах и их общей стоимости на сервер вместе с токеном
      const response = await axios.post("/.netlify/functions/payment", {
        token,
        items,
        totalPrice: Number(totalPrice * 100),
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
    <div className="container">
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        data-testid="pay_form"
      >
        <CardElement />
        <button className="button pay-btn" type="submit">
          {t("pay")}
        </button>
        {paymentError && <div className={styles.center}>{paymentError}</div>}
        {paymentSuccess && (
          <div className={styles.center}>{t("pay_success")}</div>
        )}
      </form>
    </div>
  );
};
