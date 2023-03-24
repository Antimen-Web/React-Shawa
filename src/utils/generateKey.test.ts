import { generateKey } from "./";

describe("generateKey function", () => {
  it("should return a string in the correct format", () => {
    const pre = "key";
    const generatedKey = generateKey(pre);

    expect(generatedKey).toMatch(/^key_\d+$/);
  });
});
