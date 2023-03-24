import { CartState, Item } from "../redux/cart/types";
import { findItemIndex } from "./";

describe("findItemIndex function", () => {
  const state: CartState = {
    items: [
      {
        id: "1",
        title: "item 1",
        image: "img",
        price: 10,
        type: 1,
        size: 1,
        spicy: 1,
        count: 2,
        weight: 10,
        key: "1",
      },
      {
        id: "2",
        title: "item 2",
        image: "img",
        price: 20,
        type: 2,
        size: 2,
        spicy: 2,
        count: 3,
        weight: 10,
        key: "2",
      },
      {
        id: "3",
        title: "item 3",
        image: "img",
        price: 30,
        type: 1,
        size: 1,
        spicy: 1,
        count: 4,
        weight: 10,
        key: "3",
      },
    ],
    typesName: [""],
    spicyName: [""],
    totalPrice: 10,
    popup: false,
    popupText: "",
  };

  const item: Item = {
    id: "2",
    title: "item 2",
    image: "img",
    price: 20,
    type: 2,
    size: 2,
    spicy: 2,
    count: 3,
    weight: 10,
    key: "2",
  };

  it("should return -1 if item is not in the state items array", () => {
    const newItem: Item = {
      id: "4",
      title: "item 4",
      image: "img",
      price: 40,
      type: 4,
      size: 4,
      spicy: 4,
      count: 1,
      weight: 10,
      key: "4",
    };
    expect(findItemIndex(state, newItem)).toEqual(-1);
  });

  it("should return the index of the item in the state items array", () => {
    expect(findItemIndex(state, item)).toEqual(1);
  });
});
