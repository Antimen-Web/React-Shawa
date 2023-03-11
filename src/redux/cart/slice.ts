import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS, findItemIndex, recountPrice } from "../../utils/";
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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const index = findItemIndex(state, action.payload);
      if (index === -1) {
        state.items.push({ ...action.payload, count: 1 });
      } else {
        state.items[index].count++;
      }
      recountPrice(state);
    },
    changeCount(state, action: PayloadAction<{ item: Item; delta: number }>) {
      const index = findItemIndex(state, action.payload.item);
      const count = state.items[index].count + action.payload.delta;
      if (count > 0) {
        state.items[index].count = count;
      } else {
        state.items.splice(index, 1);
      }
      recountPrice(state);
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    removeItem(state, action: PayloadAction<Item>) {
      const index = findItemIndex(state, action.payload);
      state.items.splice(index, 1);
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
  changeCount,
  clearCart,
  removeItem,
  showPopup,
  hidePopup,
  setLangCart,
} = cartSlice.actions;

export default cartSlice.reducer;
