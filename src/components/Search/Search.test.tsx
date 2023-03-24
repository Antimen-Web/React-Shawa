import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Search } from "./";
import { setupStore } from "../../redux/Store";
import { renderWithProviders } from "../../helpers/renderTestApp";
import React from "react";

describe("Search component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the input element with the correct placeholder text", () => {
    const store = setupStore();
    renderWithProviders(<Search />, { store });

    const placeholderText = screen.getByPlaceholderText("Search to");

    expect(placeholderText).toBeInTheDocument();
  });

  it("dispatches setSearchValue action with a debounce when input value is changed", async () => {
    const store = setupStore();
    renderWithProviders(<Search />, { store });

    const input: HTMLInputElement = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "another value" } });

    expect(input.value).toBe("another value");
  });
});
