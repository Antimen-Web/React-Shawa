import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cart from "./Cart";
import { setupStore } from "../redux/Store";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { t } from "i18next";
import { renderWithProviders } from "../helpers/renderTestApp";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import PaymentPage from "./PaymentPage";

describe("Cart", () => {
  let store: ToolkitStore;
  const storeState = {
    cart: {
      typesName: t("typesName", { returnObjects: true }),
      spicyName: t("spicyName", { returnObjects: true }),
      items: [
        {
          id: "7",
          title: "Shawarma react",
          image: "shawa-react.png",
          price: 3,
          spicy: 0,
          weight: 400,
          count: 5,
          key: "7_1679034849170",
        },
        {
          id: "7",
          title: "Shawarma react",
          image: "shawa-react.png",
          price: 3,
          spicy: 1,
          weight: 400,
          count: 2,
          key: "7_1679034850239",
        },
      ],
      totalPrice: 21,
      popup: false,
      popupText: "",
    },
  };

  test("renders CartEmpty component if total price is 0", () => {
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
    renderWithProviders(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      { store }
    );

    expect(screen.getByTestId("cart-empty")).toBeInTheDocument();
  });

  test("renders cart items if total price is greater than 0", () => {
    store = setupStore(storeState);
    renderWithProviders(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      { store }
    );

    expect(screen.getByTestId("cart")).toBeInTheDocument();
  });

  test("should change count when click plus/minus/remove", () => {
    store = setupStore(storeState);
    renderWithProviders(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      { store }
    );

    const count = store.getState().cart.items[0].count;
    const totalPrice = store.getState().cart.totalPrice;
    const increment = screen.getAllByTestId("increment")[0];
    const decrement = screen.getAllByTestId("decrement")[0];
    const decrement2 = screen.getAllByTestId("decrement")[1];
    const remove = screen.getAllByTestId("remove_item")[0];

    fireEvent.click(increment);
    fireEvent.click(increment);
    fireEvent.click(increment);
    fireEvent.click(decrement);
    fireEvent.click(decrement);

    expect(store.getState().cart.items[0].count).toEqual(count + 1);
    expect(screen.getByTestId("total_price")).toHaveTextContent(totalPrice + 3);

    fireEvent.click(decrement2);
    fireEvent.click(decrement2);

    expect(store.getState().cart.items.length).toEqual(1);

    fireEvent.click(remove);

    expect(store.getState().cart.items.length).toEqual(0);
  });

  test("should set hollow cart and 0 total price when click clear cart", () => {
    store = setupStore(storeState);
    renderWithProviders(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
      { store }
    );

    const clear = screen.getByTestId("clear_all");

    fireEvent.click(clear);

    expect(store.getState().cart.items.length).toEqual(0);
    expect(store.getState().cart.totalPrice).toEqual(0);
  });

  test("should go to payment page when click pay now", async () => {
    store = setupStore(storeState);
    renderWithProviders(
      <MemoryRouter initialEntries={["/cart/"]}>
        <Routes>
          <Route path="/cart/" element={<Cart />} />
          <Route path="/payment/" element={<PaymentPage />} />
        </Routes>
      </MemoryRouter>,
      { store }
    );

    const payment = screen.getByTestId("payment");

    userEvent.click(payment);

    await waitFor(() =>
      expect(screen.getByTestId("pay_form")).toBeInTheDocument()
    );
  });

  test("should go to homepage when click pay now", async () => {
    store = setupStore(storeState);
    renderWithProviders(
      <MemoryRouter initialEntries={["/cart/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart/" element={<Cart />} />
        </Routes>
      </MemoryRouter>,
      { store }
    );

    const home = screen.getByTestId("return_back");

    userEvent.click(home);

    await waitFor(() =>
      expect(screen.getByTestId("homepage")).toBeInTheDocument()
    );
  });
});
