import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sort } from "./";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { setupStore } from "../redux/Store";
import { renderWithProviders } from "../helpers/renderTestApp";
import { MemoryRouter } from "react-router-dom";
import React from "react";

describe("Sort", () => {
  let store: ToolkitStore;

  beforeEach(() => {
    store = setupStore();
  });

  test("renders correctly", () => {
    renderWithProviders(
      <MemoryRouter>
        <Sort />
      </MemoryRouter>,
      { store }
    );
    const sortLabel = screen.getByText("Sort by:");
    const sortPopup = screen.getByRole("list");
    expect(sortLabel).toBeInTheDocument();
    expect(sortPopup).toBeInTheDocument();
  });

  test("clicking on sort label shows/hides the sort options", () => {
    renderWithProviders(
      <MemoryRouter>
        <Sort />
      </MemoryRouter>,
      { store }
    );
    const sortLabel = screen.getByTestId("active_sort");
    const sortPopup = screen.getByTestId("list_sort");
    fireEvent.click(sortLabel);
    expect(sortPopup).toHaveClass("sort__popup");
    fireEvent.click(sortLabel);
    expect(sortPopup).toHaveClass("sort__popup collapsed");

    fireEvent.click(sortLabel);
    expect(sortPopup).toHaveClass("sort__popup");
    fireEvent.click(document.body);
    expect(sortPopup).toHaveClass("sort__popup collapsed");
  });

  test("should set active sort", () => {
    renderWithProviders(
      <MemoryRouter>
        <Sort />
      </MemoryRouter>,
      { store }
    );

    const sortLabel = screen.getByTestId("active_sort");
    const sortPrice = screen.getByText("price ↓");

    fireEvent.click(sortPrice);

    expect(sortLabel).toHaveTextContent("price ↓");
    expect(store.getState().filter.sortBy.name).toBe("price ↓");
  });
});
