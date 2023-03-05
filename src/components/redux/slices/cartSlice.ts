import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type Item = {
  id: string;
  title: string;
  image: string;
  price: number;
  type?: number;
  size?: number;
  spicy?: number;
  weight: number;
  count: number;
  key: string;
};

interface CartState {
  typesName: string[];
  spicyName: string[];
  items: Item[];
  totalPrice: number;
  popup: boolean;
  popupText: string;
}

const initialState: CartState = {
  typesName: ["thin", "traditional"],
  spicyName: ["spicy", "non-spicy"],
  items: [],
  totalPrice: 0,
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
  },
});

export const selectCart = (state: RootState) => state.cart;

export const {
  addItem,
  addCount,
  removeCount,
  clearCart,
  removeItem,
  showPopup,
  hidePopup,
} = cartSlice.actions;

export default cartSlice.reducer;
