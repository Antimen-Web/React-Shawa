import styles from "./Popup.module.scss";
import { selectCart } from "../redux/slices/cartSlice";
import { useSpring, animated } from "@react-spring/web";
import React from "react";
import { useAppSelector } from "../redux/hooks";

const Popup: React.FC = () => {
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
      className={popup ? styles.popup + " " + styles.active : styles.popup}
    >
      <span>Added:</span>
      <br />
      <span>{popupText}</span>
    </animated.div>
  );
};

export default Popup;
