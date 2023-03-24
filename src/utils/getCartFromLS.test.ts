import { calcTotalPrice } from "./";
import { getCartFromLS } from "./";

describe("getCartFromLS", () => {
  beforeAll(() => {
    const localStorageMock: {
      getItem: jest.Mock<string | null, [string]>;
      setItem: jest.Mock<void, [string, string]>;
      clear: jest.Mock<void, []>;
    } = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  test("should return empty cart, if localStorage is empty", () => {
    // @ts-ignore
    window.localStorage.getItem.mockReturnValue(null);

    const result = getCartFromLS();

    expect(result).toEqual({
      items: [],
      totalPrice: 0,
    });
  });

  test("return cart with items from localStorage", () => {
    const items = [
      {
        id: "1",
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 2,
        key: "1",
      },
      {
        id: "2",
        title: "item 2",
        image: "img",
        price: 20,
        weight: 20,
        count: 1,
        key: "2",
      },
    ];
    const totalPrice = calcTotalPrice(items);
    // @ts-ignore
    window.localStorage.getItem.mockReturnValue(JSON.stringify(items));

    const result = getCartFromLS();

    expect(result).toEqual({
      items,
      totalPrice,
    });
  });
});
