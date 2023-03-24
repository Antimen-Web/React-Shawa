import { countItemById } from "./";
import { Item } from "../redux/cart/types";

describe("countItemById", () => {
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
      title: "item 2",
      image: "img",
      price: 5,
      weight: 5,
      count: 1,
      key: "2",
    },
    {
      id: "1",
      title: "item 1",
      image: "img",
      price: 10,
      weight: 10,
      count: 3,
      key: "3",
    },
  ];

  it("should return 0 when given an empty array", () => {
    const count = countItemById([], "1");
    expect(count).toEqual(0);
  });

  it("should return the correct count for the given id", () => {
    const count = countItemById(items, "1");
    expect(count).toEqual(5);
  });

  it("should return 0 when no items match the given id", () => {
    const count = countItemById(items, "3");
    expect(count).toEqual(0);
  });
});
