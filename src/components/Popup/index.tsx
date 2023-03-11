import styles from "./Popup.module.scss";
import { useSpring, animated } from "@react-spring/web";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCart } from "../../redux/cart/selectors";
import { t } from "i18next";

export const Popup: React.FC = () => {
  const { popup, popupText } = useAppSelector(selectCart);

  const fadeOut = useSpring({
    reset: popup,
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: { duration: 2000 },
  });

  return (
    <animated.div
      style={{
        ...fadeOut,
      }}
      className={`${styles.popup} ${popup && styles.active}`}
    >
      <span>{t(`added`)}</span>
      <br />
      <span>{popupText}</span>
    </animated.div>
  );
};
