import React from "react";
import { StripeContainer } from "../components";
import { CheckoutForm } from "../components";

const PaymentPage: React.FC = () => {
  return (
    <StripeContainer>
      <CheckoutForm />
    </StripeContainer>
  );
};

export default PaymentPage;
