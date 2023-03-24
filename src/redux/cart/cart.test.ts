import cartReducer, {
  addItem,
  changeCount,
  clearCart,
  removeItem,
  showPopup,
  hidePopup,
  setLangCart,
} from "./slice";
import { t } from "i18next";

describe("cart reducer", () => {
  const initialState = {
    typesName: t("typesName", { returnObjects: true }),
    spicyName: t("spicyName", { returnObjects: true }),
    popup: false,
    popupText: "",
  };
  const item = {
    id: "8",
    title: "Greek giros",
    image: "greek-giros.png",
    price: 5,
    spicy: 0,
    weight: 400,
    count: 2,
    key: "8_1679626772795",
  };

  it("should return the initial state", () => {
    const prevState = { ...initialState, items: [], totalPrice: 0 };
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(prevState);
  });

  it("should handle addItem", () => {
    const prevState = { ...initialState, items: [], totalPrice: 0 };
    const nextState = cartReducer(prevState, addItem(item));

    expect(nextState.items).toEqual([{ ...item, count: 1 }]);
    expect(nextState.totalPrice).toEqual(5);
  });

  it("should handle changeCount", () => {
    const prevState = { ...initialState, items: [item], totalPrice: 10 };
    const nextState = cartReducer(prevState, changeCount({ item, delta: -1 }));

    expect(nextState.items).toEqual([{ ...item, count: 1 }]);
    expect(nextState.totalPrice).toEqual(5);
  });

  it("should handle clearCart", () => {
    const prevState = {
      ...initialState,
      items: [item],
      totalPrice: 5,
    };
    const nextState = cartReducer(prevState, clearCart());

    expect(nextState.items).toEqual([]);
    expect(nextState.totalPrice).toEqual(0);
  });

  it("should handle removeItem", () => {
    const prevState = { ...initialState, items: [item], totalPrice: 5 };
    const nextState = cartReducer(prevState, removeItem(item));

    expect(nextState.items).toEqual([]);
    expect(nextState.totalPrice).toEqual(0);
  });

  it("should handle showPopup", () => {
    const message = "popup message";
    const prevState = { ...initialState, items: [], totalPrice: 0 };
    const nextState = cartReducer(prevState, showPopup(message));

    expect(nextState.popup).toEqual(true);
    expect(nextState.popupText).toEqual(message);
  });

  it("should handle hidePopup", () => {
    const prevState = {
      typesName: t("typesName", { returnObjects: true }),
      spicyName: t("spicyName", { returnObjects: true }),
      items: [],
      totalPrice: 0,
      popup: true,
      popupText: "popup message",
    };
    const nextState = cartReducer(prevState, hidePopup());

    expect(nextState.popup).toEqual(false);
    expect(nextState.popupText).toEqual("");
  });

  it("should handle setLangCart", () => {
    const prevState = {
      items: [],
      totalPrice: 0,
      popup: false,
      popupText: "",
      typesName: t("typesName", { returnObjects: true }),
      spicyName: t("spicyName", { returnObjects: true }),
    };
    const nextState = cartReducer(prevState, setLangCart());

    expect(nextState.typesName).toEqual(
      t("typesName", { returnObjects: true })
    );
    expect(nextState.spicyName).toEqual(
      t("spicyName", { returnObjects: true })
    );
  });
});
