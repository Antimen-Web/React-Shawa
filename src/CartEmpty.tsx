import { Link } from "react-router-dom";
import React from "react";

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is empty 😕</h2>
      <p>
        Probably, you haven't ordered yet
        <br />
        To order, return to homepage
      </p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Return to homepage</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
