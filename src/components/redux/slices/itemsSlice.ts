import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { SortByType } from "./filterSlice";
import { ItemProps } from "../../Item";
import { RootState } from "../Store";

type FetchItem = {
  activeCat: number;
  sortBy: SortByType;
  searchValue: string;
};

export const fetchItems = createAsyncThunk<ItemProps[], FetchItem>(
  "users/fetchItemsStatus",
  async ({ activeCat, sortBy, searchValue }) => {
    const { data } = await axios.get<ItemProps[]>(
      `https://63c9588d904f040a965c1451.mockapi.io/items${
        activeCat > 0 ? `?category=${activeCat}&` : `?`
      }sortby=${sortBy.sort}&order=${sortBy.line}${
        searchValue !== "" ? `&search=${searchValue}` : ``
      }`
    );
    return data;
  }
);

enum Status {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

interface ItemsState {
  elements: ItemProps[];
  status: Status;
}

const initialState: ItemsState = {
  elements: [],
  status: Status.PENDING,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.elements = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = Status.PENDING;
      state.elements = [];
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<ItemProps[]>) => {
        state.status = Status.FULFILLED;
        state.elements = action.payload;
      }
    );
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = Status.REJECTED;
      state.elements = [];
    });
  },
});

export const selectItems = (state: RootState) => state.items;

export default itemsSlice.reducer;
