import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Item, ItemProps } from "./";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { setupStore } from "../redux/Store";
import { t } from "i18next";
import { renderWithProviders } from "../helpers/renderTestApp";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import ItemFull from "../pages/ItemFull";

describe("Item", () => {
  let store: ToolkitStore;
  let props: ItemProps;

  beforeEach(() => {
    store = setupStore({
      cart: {
        typesName: t("typesName", { returnObjects: true }),
        spicyName: t("spicyName", { returnObjects: true }),
        items: [],
        totalPrice: 0,
        popup: false,
        popupText: "",
      },
    });

    props = {
      key: "test-key",
      id: "1",
      title: "Test Item",
      image: "test.jpg",
      price: 9.99,
      types: [0],
      sizes: [8, 10, 12],
      spicy: [0, 1],
      count: 1,
      weight: 0.5,
    };
  });

  it("renders the component with correctly props", () => {
    renderWithProviders(
      <MemoryRouter>
        <Item {...props} />
      </MemoryRouter>,
      { store }
    );

    expect(screen.getByAltText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText(/9.99/)).toBeInTheDocument();
  });

  it("should render the correct spicy selector if it exists", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Item {...props} />
      </MemoryRouter>,
      { store }
    );

    const spicyBtn = screen.getByText("non-spicy");

    fireEvent.click(spicyBtn);

    await waitFor(() => expect(spicyBtn.classList[0]).toBe("active"));
  });

  it("should render the correct sizes selector if it exists", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Item {...props} />
      </MemoryRouter>,
      { store }
    );

    const sizeBtn = screen.getByText(/12/);

    fireEvent.click(sizeBtn);

    await waitFor(() => expect(sizeBtn.classList[0]).toBe("active"));
  });

  it("should add item to cart", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Item {...props} />
      </MemoryRouter>,
      { store }
    );

    const addBtn = screen.getByText(/add/i);

    fireEvent.click(addBtn);

    await waitFor(() =>
      expect(store.getState().cart.items[0].price).toEqual(9.99)
    );
  });

  it("should go to item page when click on image", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Item {...props} />} />
          <Route path="/item/:id" element={<ItemFull />} />
        </Routes>
      </MemoryRouter>,
      { store }
    );

    const imgBtn = screen.getByAltText("Test Item");

    fireEvent.click(imgBtn);

    expect(screen.getByTestId("skeletonItem")).toBeInTheDocument();
  });
});
