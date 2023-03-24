import reducer, { fetchItems, setItems } from "./slice";
import { ItemsState, Status } from "./types";
import { ItemProps } from "../../components";
import { SortByType } from "../filter/types";

describe("itemsSlice reducer", () => {
  const initialState: ItemsState = {
    elements: [],
    status: Status.PENDING,
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle fetchItems.pending", () => {
    const newState = reducer(initialState, fetchItems.pending);
    expect(newState.status).toEqual(Status.PENDING);
    expect(newState.elements).toEqual([]);
  });

  it("should handle fetchItems.fulfilled", () => {
    const items: ItemProps[] = [
      {
        key: "8-key",
        id: "8",
        image: "greek-giros.png",
        title: "Greek giros",
        price: 5,
        spicy: [0, 1],
        types: [0, 1],
        sizes: [0, 1],
        count: 1,
        weight: 400,
      },
      {
        key: "9-key",
        id: "9",
        image: "greek-souvlaki.png",
        title: "Greek souvlaki",
        price: 5,
        spicy: [0, 1],
        types: [0, 1],
        sizes: [0, 1],
        count: 1,
        weight: 400,
      },
    ];
    const sortBy: SortByType = {
      name: "popular ↑",
      sort: "rating",
      line: "asc",
    };
    const item = { activeCat: 2, sortBy: sortBy, searchValue: "search" };
    const newState = reducer(
      initialState,
      fetchItems.fulfilled(items, "state", item)
    );
    expect(newState.status).toEqual(Status.FULFILLED);
    expect(newState.elements).toEqual(items);
  });

  it("should handle fetchItems.rejected", () => {
    const newState = reducer(initialState, fetchItems.rejected);
    expect(newState.status).toEqual(Status.REJECTED);
    expect(newState.elements).toEqual([]);
  });

  it("should handle setItems", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const newState = reducer(initialState, setItems(items));
    expect(newState.status).toEqual(Status.PENDING);
    expect(newState.elements).toEqual(items);
  });
});
