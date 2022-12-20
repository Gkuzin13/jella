import { getNewItemPos } from "../itemPos";

const mockItems = [
  {
    position: 16384,
  },
  {
    position: 32768,
  },
  {
    position: 49152,
  },
];

describe("Should set new position correctly", () => {
  test("Should prepend item correctly", () => {
    expect(getNewItemPos(mockItems, 0)).toBe(8192);
  });

  test("Should insert item in the middle correctly", () => {
    expect(getNewItemPos(mockItems, 1)).toBe(32768);
  });

  test("Should append item correctly", () => {
    expect(getNewItemPos(mockItems, 2)).toBe(65536);
  });

  test("Should return default item position when items array is empty", () => {
    expect(getNewItemPos([], 0)).toBe(16384);
  });

  test("Should return default item position when items is not an array", () => {
    expect(getNewItemPos(undefined, 0)).toBe(16384);
  });
});
