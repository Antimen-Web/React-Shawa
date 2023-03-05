import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export type SortByType = {
  name:
    | "popular ↓"
    | "popular ↑"
    | "price ↓"
    | "price ↑"
    | "alphabet ↓"
    | "alphabet ↑";
  sort: "rating" | "price" | "title";
  line: "desc" | "asc";
};

interface FilterState {
  sortByArr: SortByType[];
  categories: string[];
  activeCat: number;
  sortBy: SortByType;
  searchValue: string;
}

const initialState: FilterState = {
  sortByArr: [
    { name: "popular ↓", sort: "rating", line: "desc" },
    { name: "popular ↑", sort: "rating", line: "asc" },
    { name: "price ↓", sort: "price", line: "desc" },
    { name: "price ↑", sort: "price", line: "asc" },
    { name: "alphabet ↓", sort: "title", line: "asc" },
    { name: "alphabet ↑", sort: "title", line: "desc" },
  ],
  categories: ["All", "Shawarma", "Greek", "Hotdog", "Pizza", "Burger"],
  activeCat: 0,
  sortBy: { name: "popular ↓", sort: "rating", line: "desc" },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<number>) {
      state.activeCat = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortByType>) {
      state.sortBy = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(
      state,
      action: PayloadAction<{ activeCat: string; sortBy: SortByType }>
    ) {
      state.activeCat = Number(action.payload.activeCat);
      state.sortBy = action.payload.sortBy;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setActiveCategory, setSortBy, setSearchValue, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
