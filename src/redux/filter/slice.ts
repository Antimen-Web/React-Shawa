import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, SortByType } from "./types";
import { t } from "i18next";
import "../../i18n";

const initialState: FilterState = {
  sortByArr: [
    { name: t("popular") + " ↓", sort: "rating", line: "desc" },
    { name: t("popular") + " ↑", sort: "rating", line: "asc" },
    { name: t("price") + " ↓", sort: "price", line: "desc" },
    { name: t("price") + " ↑", sort: "price", line: "asc" },
    { name: t("alphabet") + " ↓", sort: "title", line: "asc" },
    { name: t("alphabet") + " ↑", sort: "title", line: "desc" },
  ],
  categories: t("categories", { returnObjects: true }),
  activeCat: 0,
  sortBy: { name: t("popular") + " ↓", sort: "rating", line: "desc" },
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
    setLangFilters(state) {
      state.sortByArr = [
        { name: t("popular") + " ↓", sort: "rating", line: "desc" },
        { name: t("popular") + " ↑", sort: "rating", line: "asc" },
        { name: t("price") + " ↓", sort: "price", line: "desc" },
        { name: t("price") + " ↑", sort: "price", line: "asc" },
        { name: t("alphabet") + " ↓", sort: "title", line: "asc" },
        { name: t("alphabet") + " ↑", sort: "title", line: "desc" },
      ];
      state.categories = t("categories", { returnObjects: true });
      state.sortBy = {
        name: t("popular") + " ↓",
        sort: "rating",
        line: "desc",
      };
    },
  },
});

export const {
  setActiveCategory,
  setSortBy,
  setSearchValue,
  setFilters,
  setLangFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
