import { recountPrice } from "./recountPrice";
import { Item, CartState } from "../redux/cart/types";

describe("recountPrice", () => {
  test("should update total price to 0 if there are no items", () => {
    const state: CartState = {
      items: [],
      typesName: [""],
      spicyName: [""],
      totalPrice: 0,
      popup: false,
      popupText: "",
    };

    recountPrice(state);

    expect(state.totalPrice).toEqual(0);
  });

  test("should update total price correctly if there are items in the cart", () => {
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
        count: 1,
        key: "2",
      },
    ];
    const state: CartState = {
      items,
      totalPrice: 0,
      typesName: [""],
      spicyName: [""],
      popup: false,
      popupText: "",
    };

    recountPrice(state);

    expect(state.totalPrice).toEqual(40);
  });
});
