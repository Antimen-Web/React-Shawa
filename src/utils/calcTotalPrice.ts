import { Item } from "../redux/cart/types";

export const calcTotalPrice = (items: Item[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
