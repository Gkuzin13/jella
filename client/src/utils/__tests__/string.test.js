import { createUserHomeUrl } from "../string";

describe("createUserHomeUrl", () => {
  test("should create url correctly", () => {
    const testUser = "Tester";
    expect(createUserHomeUrl(testUser)).toBe(`/u/${testUser}`);
  });
});
