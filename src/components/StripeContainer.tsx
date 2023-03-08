import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MjE7dAsSeWfElezFjZ55ZZ2OLFuiZvqYSYMEb6ZdR9QgCarIhOPKiB1kopADBausmVC2Te4nVNFPpOnSa0jhox000zSrYoRBc"
);

interface StripeContainerProps {
  children: React.ReactNode;
}

export const StripeContainer: React.FC<StripeContainerProps> = ({
  children,
}) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
