import { CartState, Item } from "../redux/cart/types";

export const findItemIndex = (state: CartState, item: Item) =>
  state.items.findIndex(
    (i) =>
      i.id === item.id &&
      i.type === item.type &&
      i.size === item.size &&
      i.spicy === item.spicy
  );
