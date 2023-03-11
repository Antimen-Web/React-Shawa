import { CartState } from "../redux/cart/types";

export const recountPrice = (state: CartState) => {
  state.totalPrice = state.items.reduce((acc, i) => acc + i.price * i.count, 0);
};
