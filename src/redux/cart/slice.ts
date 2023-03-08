import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartState, Item } from "./types";
import { t } from "i18next";
import "../../i18n";

const { items, totalPrice } = getCartFromLS();

const initialState: CartState = {
  typesName: t("typesName", { returnObjects: true }),
  spicyName: t("spicyName", { returnObjects: true }),
  items: items,
  totalPrice: totalPrice,
  popup: false,
  popupText: "",
};

const recountPrice = (state: CartState) => {
  let x = 0;
  state.totalPrice = state.items
    .map((i) => (x += i.price * i.count))
    .reverse()[0];
  if (!state.totalPrice) {
    state.totalPrice = 0;
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      let haveId = state.items.some(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size &&
          item.spicy === action.payload.spicy
      );
      if (!haveId) {
        state.items.push(action.payload);
      } else {
        let double = state.items.find(
          (item) =>
            item.id === action.payload.id &&
            item.type === action.payload.type &&
            item.size === action.payload.size &&
            item.spicy === action.payload.spicy
        );
        if (double?.count) {
          double.count++;
        }
      }
      recountPrice(state);
    },
    addCount(state, action: PayloadAction<Item>) {
      let double = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size &&
          item.spicy === action.payload.spicy
      );
      if (double?.count) {
        double.count++;
      }

      recountPrice(state);
    },
    removeCount(state, action: PayloadAction<Item>) {
      let double = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size &&
          item.spicy === action.payload.spicy
      );
      if (double?.count) {
        if (double.count < 2) {
          state.items = state.items.filter((item) => item !== double);
        } else {
          double.count--;
        }
      }

      recountPrice(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    removeItem(state, action: PayloadAction<Item>) {
      state.items = state.items.filter(
        (item) => item.key !== action.payload.key
      );
      recountPrice(state);
    },
    showPopup(state, action: PayloadAction<string>) {
      state.popup = true;
      state.popupText = action.payload;
    },
    hidePopup(state) {
      state.popup = false;
      state.popupText = "";
    },
    setLangCart(state) {
      state.typesName = t("typesName", { returnObjects: true });
      state.spicyName = t("spicyName", { returnObjects: true });
    },
  },
});

export const {
  addItem,
  addCount,
  removeCount,
  clearCart,
  removeItem,
  showPopup,
  hidePopup,
  setLangCart,
} = cartSlice.actions;

export default cartSlice.reducer;
