import React from "react";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { setupStore } from "../redux/Store";
import { renderWithProviders } from "../helpers/renderTestApp";
import { MemoryRouter } from "react-router-dom";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

describe("Home", () => {
  let store: ToolkitStore;

  it("renders with categories, sort, sceleton elements", () => {
    store = setupStore();
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      { store }
    );
    const home = screen.getByTestId("homepage");
    const categories = screen.getByTestId("categories");
    const sort = screen.getByTestId("sort");
    const sceleton = screen.getAllByTestId("sceleton");

    expect(home).toBeInTheDocument();
    expect(categories).toBeInTheDocument();
    expect(sort).toBeInTheDocument();
    expect(sceleton[0]).toBeInTheDocument();
    expect(sceleton.length).toEqual(8);
  });

  it("updates the URL when the category or sort order changes", () => {
    store = setupStore();
    renderWithProviders(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      { store }
    );

    const categoryBtn = screen.getAllByText(/greek/i);
    const sortBtn = screen.getByText(/price ↓/i);

    userEvent.click(categoryBtn[0]);
    userEvent.click(sortBtn);

    setTimeout(() => {
      expect(window.location.search).toBe(
        "?sortBy=price&order=desc&activeCat=3"
      );
    }, 100);
  });
});
