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
    const destination = {
      index: 0,
    };

    expect(getNewItemPos(mockItems, destination)).toBe(8192);
  });

  test("Should insert item in the middle correctly", () => {
    const destination = {
      index: 1,
    };

    expect(getNewItemPos(mockItems, destination)).toBe(32768);
  });

  test("Should append item correctly", () => {
    const destination = {
      index: 2,
    };

    expect(getNewItemPos(mockItems, destination)).toBe(65536);
  });

  test("Should return default item position when items array is empty", () => {
    const destination = {
      index: 0,
    };

    expect(getNewItemPos([], destination)).toBe(16384);
  });

  test("Should return default item position when items is not an array", () => {
    const destination = {
      index: 0,
    };

    expect(getNewItemPos(undefined, destination)).toBe(16384);
  });
});
