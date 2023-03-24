import { Popup } from "./";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { showPopup } from "../../redux/cart/slice";
import { renderWithProviders } from "../../helpers/renderTestApp";
import { setupStore } from "../../redux/Store";
import { Globals } from "@react-spring/web";
import { act } from "react-dom/test-utils";

describe("Popup", () => {
  beforeAll(() => {
    Globals.assign({
      skipAnimation: true,
    });
  });

  test("should display the Popup and the correct text inside", () => {
    const store = setupStore();
    store.dispatch(showPopup("text popup"));

    renderWithProviders(<Popup />, { store });

    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText(/text popup/i)).toBeInTheDocument();
  });

  test("should popup is invisible after 2 minutes", async () => {
    jest.useFakeTimers();
    const store = setupStore();

    renderWithProviders(<Popup />, { store });

    act(() => {
      store.dispatch(showPopup("text popup2"));
    });

    expect(screen.getByTestId("popup")).toHaveStyle("opacity: 0");
    expect(screen.getByText(/text popup2/i)).toBeInTheDocument();
  });
});
