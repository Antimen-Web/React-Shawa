import { Item } from "../redux/cart/types";

export const countItemById = (items: Item[], id: string): number => {
  let countItem = 0;
  items.map((i: { id: string; count: number }) => {
    if (i.id === id) {
      countItem += i.count;
    }
    return countItem;
  });
  return countItem;
};
