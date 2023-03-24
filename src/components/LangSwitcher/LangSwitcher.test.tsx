import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { setLangFilters } from "../../redux/filter/slice";
import { setLangCart } from "../../redux/cart/slice";
import { useAppDispatch } from "../../redux/hooks";
import { LangSwitcher } from "./index";
import userEvent from "@testing-library/user-event";
import { useTranslation } from "react-i18next";

jest.mock("../../redux/filter/slice");
jest.mock("../../redux/cart/slice");
jest.mock("../../redux/hooks");
jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: jest.fn(),
}));

const tSpy = jest.fn((str) => str);
const changeLanguageSpy = jest.fn((lng: string) => new Promise(() => {}));
const useTranslationSpy = useTranslation as jest.Mock;

describe("LangSwitcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useTranslationSpy.mockReturnValue({
      t: tSpy,
      i18n: {
        changeLanguage: changeLanguageSpy,
        language: "en",
      },
    });
  });

  test("should display the language switcher button", () => {
    render(<LangSwitcher />);
    const langButton = screen.getByTestId("langSwitcher");
    expect(langButton).toBeInTheDocument();
  });

  it("should display the language dropdown when the button is clicked", () => {
    render(<LangSwitcher />);

    fireEvent.click(screen.getByTestId("langSwitcher"));

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should display the current language button with the correct flag", () => {
    render(<LangSwitcher />);

    expect(screen.getByTitle("en")).toBeInTheDocument();
    expect(screen.getByAltText("en")).toBeInTheDocument();
  });

  test("should change the language when a language is selected", () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

    render(<LangSwitcher />);

    userEvent.click(screen.getByTestId("langSwitcher"));
    userEvent.click(screen.getByTitle("uk"));

    setTimeout(() => {
      expect(screen.getByTitle("uk")).toBeInTheDocument();
      expect(screen.getByAltText("uk")).toBeInTheDocument();
    }, 100);
  });

  it("should dispatch setLangFilters and setLangCart when a language is selected", () => {
    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    render(<LangSwitcher />);

    fireEvent.click(screen.getByTestId("langSwitcher"));
    fireEvent.click(screen.getByTitle("uk"));

    expect(dispatch).toHaveBeenCalledWith(setLangFilters());
    expect(dispatch).toHaveBeenCalledWith(setLangCart());
  });
});
