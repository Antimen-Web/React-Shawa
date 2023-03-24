import { Link } from "react-router-dom";
import React from "react";
import { t } from "i18next";

export const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty" data-testid="cart-empty">
      <h2>{t(`empty_cart_title`)}</h2>
      <p>
        {t(`empty_cart_text1`)}
        <br />
        {t(`empty_cart_text2`)}
      </p>
      <img src="/img/empty-cart.png" alt="{t(`empty_cart_alt`)}" />
      <Link to="/" className="button button--black">
        <span>{t(`empty_cart_btn`)}</span>
      </Link>
    </div>
  );
};
