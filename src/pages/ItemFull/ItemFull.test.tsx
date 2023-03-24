import React from "react";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ItemFull from "./";
import { renderWithProviders } from "../../helpers/renderTestApp";
import { setupStore } from "../../redux/Store";
import userEvent from "@testing-library/user-event";
import Home from "../Home";

jest.mock("axios");

describe("ItemFull", () => {
  const mockItem = {
    id: "1",
    title: "Test Item",
    weight: 300,
    image: "test.jpg",
    price: 3,
    spicy: [0, 1],
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockItem });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders skeleton item when data is loading", async () => {
    const store = setupStore();
    renderWithProviders(
      <MemoryRouter>
        <ItemFull />
      </MemoryRouter>,
      { store }
    );
    const sceleton = await screen.getByTestId("skeletonItem");
    expect(sceleton).toBeInTheDocument();
  });

  test("renders item with details and selectors when data is loaded", async () => {
    const store = setupStore();
    renderWithProviders(
      <MemoryRouter>
        <ItemFull />
      </MemoryRouter>,
      { store }
    );

    const itemTitle = await screen.findByText(mockItem.title);
    const itemImage = await screen.findByAltText(mockItem.title);
    const itemPrice = await screen.findByText(/3/);
    const itemSpicySelector = await screen.findByText("spicy");

    expect(itemTitle).toBeInTheDocument();
    expect(itemImage).toBeInTheDocument();
    expect(itemPrice).toBeInTheDocument();
    expect(itemSpicySelector).toBeInTheDocument();
  });

  test("adds item to cart, shows popup and redirect to homepage when 'Add to cart' button is clicked", async () => {
    jest.useFakeTimers();
    const store = setupStore();

    renderWithProviders(
      <MemoryRouter initialEntries={[`/item/${mockItem.id}`]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<ItemFull />} />
        </Routes>
      </MemoryRouter>,
      { store }
    );

    const addButton = await screen.findByText("Add to cart for 3$");
    userEvent.click(addButton);

    await waitFor(() =>
      expect(store.getState().cart.items[0].image).toEqual(mockItem.image)
    );
    await waitFor(() =>
      expect(store.getState().cart.popupText).toContain("Test Item, spicy,")
    );

    jest.advanceTimersByTime(2000);

    expect(store.getState().cart.popup).toEqual(false);

    expect(screen.getByTestId("homepage")).toBeInTheDocument();
  });
});
