import filterReducer, {
  setActiveCategory,
  setSortBy,
  setSearchValue,
  setFilters,
  setLangFilters,
  initialState,
} from "./slice";
import { SortByType } from "./types";

describe("filter reducer", () => {
  it("should return the initial state", () => {
    expect(filterReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle setActiveCategory", () => {
    const newState = filterReducer(initialState, setActiveCategory(1));
    expect(newState.activeCat).toEqual(1);
  });

  it("should handle setSortBy", () => {
    const newSortBy: SortByType = {
      name: "Price ↓",
      sort: "price",
      line: "desc",
    };
    const newState = filterReducer(initialState, setSortBy(newSortBy));
    expect(newState.sortBy).toEqual(newSortBy);
  });

  it("should handle setSearchValue", () => {
    const newState = filterReducer(initialState, setSearchValue("search"));
    expect(newState.searchValue).toEqual("search");
  });

  it("should handle setFilters", () => {
    const sortBy: SortByType = {
      name: "popular ↑",
      sort: "rating",
      line: "asc",
    };
    const newFilters = {
      activeCat: 2,
      sortBy: sortBy,
    };
    const newState = filterReducer(initialState, setFilters(newFilters));
    expect(newState.activeCat).toEqual(2);
    expect(newState.sortBy).toEqual(newFilters.sortBy);
  });

  it("should handle setLangFilters", () => {
    const newState = filterReducer(initialState, setLangFilters());
    expect(newState.sortByArr.length).toEqual(6);
    expect(newState.categories.length).toBeGreaterThan(0);
    expect(newState.sortBy.name.length).toBeGreaterThan(0);
  });
});
