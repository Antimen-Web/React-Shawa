import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Categories } from "./";
import { setupStore } from "../redux/Store";
import { renderWithProviders } from "../helpers/renderTestApp";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

describe("Categories component", () => {
  let store: ToolkitStore;
  beforeEach(() => {
    store = setupStore({
      filter: {
        sortByArr: [
          { name: "popular ↓", sort: "rating", line: "desc" },
          { name: "popular ↑", sort: "rating", line: "asc" },
          { name: "price ↓", sort: "price", line: "desc" },
          { name: "price ↑", sort: "price", line: "asc" },
          { name: "title ↓", sort: "title", line: "asc" },
          { name: "title ↑", sort: "title", line: "desc" },
        ],
        categories: ["All", "Shawarma", "Greek", "Hotdog", "Pizza", "Burger"],
        activeCat: 0,
        sortBy: { name: "popular ↓", sort: "rating", line: "desc" },
        searchValue: "",
      },
    });
  });

  test("renders category list correctly", () => {
    renderWithProviders(<Categories />, { store });

    const categoryList = screen.getByRole("list");
    expect(categoryList).toBeInTheDocument();

    const categoryItems = screen.getAllByRole("listitem");
    expect(categoryItems.length).toBe(6);

    expect(categoryItems[0]).toHaveTextContent("All");
    expect(categoryItems[1]).toHaveTextContent("Shawarma");
    expect(categoryItems[2]).toHaveTextContent("Greek");
    expect(categoryItems[3]).toHaveTextContent("Hotdog");
    expect(categoryItems[4]).toHaveTextContent("Pizza");
    expect(categoryItems[5]).toHaveTextContent("Burger");
  });

  test("updates active category when clicked", async () => {
    renderWithProviders(<Categories />, { store });

    const categoryItems = screen.getAllByRole("listitem");

    fireEvent.click(categoryItems[1]);

    await waitFor(() => expect(store.getState().filter.activeCat).toEqual(1));
  });
});
