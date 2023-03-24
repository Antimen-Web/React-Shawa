import { calcTotalPrice } from "./";
import { Item } from "../redux/cart/types";

describe("calcTotalPrice", () => {
  it("should return the total price of all items", () => {
    const items: Item[] = [
      {
        id: "1",
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 2,
        key: "1",
      },
      {
        id: "2",
        title: "item 2",
        image: "img",
        price: 20,
        weight: 20,
        count: 3,
        key: "2",
      },
      {
        id: "3",
        title: "item 3",
        image: "img",
        price: 5,
        weight: 5,
        count: 1,
        key: "3",
      },
    ];

    const result = calcTotalPrice(items);

    expect(result).toEqual(85);
  });

  it("should handle items with negative counts", () => {
    const items: Item[] = [
      {
        id: "1",
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 2,
        key: "1",
      },
      {
        id: "2",
        title: "item 2",
        image: "img",
        price: 20,
        weight: 20,
        count: -3,
        key: "2",
      },
    ];

    const result = calcTotalPrice(items);

    expect(result).toEqual(-40);
  });

  it("should handle items with zero counts", () => {
    const items: Item[] = [
      {
        id: "1",
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 0,
        key: "1",
      },
      {
        id: "2",
        title: "item 2",
        image: "img",
        price: 20,
        weight: 20,
        count: 0,
        key: "2",
      },
    ];

    const result = calcTotalPrice(items);

    expect(result).toEqual(0);
  });
});
