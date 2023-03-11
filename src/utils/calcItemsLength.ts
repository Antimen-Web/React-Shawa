import { Item } from "../redux/cart/types";

export const calcItemsLength = (items: Item[]): number => {
  let x: number = 0;
  return items.map((i: { count: number }) => (x += i.count)).reverse()[0];
};
