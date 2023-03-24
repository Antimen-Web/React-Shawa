import { calcItemsLength } from "./";
import { Item } from "../redux/cart/types";

describe("calcItemsLength", () => {
  it("should return the total count of items", () => {
    const items: Item[] = [
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
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 1,
        key: "1",
      },
      {
        id: "3",
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 3,
        key: "1",
      },
    ];
    const result = calcItemsLength(items);
    expect(result).toBe(6);
  });

  it("should return 0 when given an array of items with count 0", () => {
    const items: Item[] = [
      {
        id: "1",
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 0,
        key: "1",
      },
      {
        id: "2",
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 0,
        key: "1",
      },
    ];
    const result = calcItemsLength(items);
    expect(result).toBe(0);
  });

  it("should return the count of the first item when given an array of length 1", () => {
    const items: Item[] = [
      {
        id: "1",
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: 5,
        key: "1",
      },
    ];
    const result = calcItemsLength(items);
    expect(result).toBe(5);
  });

  it("should handle negative counts", () => {
    const items: Item[] = [
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
        title: "item 1",
        image: "img",
        price: 10,
        weight: 10,
        count: -3,
        key: "1",
      },
    ];
    const result = calcItemsLength(items);
    expect(result).toBe(-1);
  });
});
