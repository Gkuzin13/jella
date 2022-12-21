import { calcPercentage } from "../math";

describe("calcPercentage", () => {
  it("should return the correct percentage", () => {
    expect(calcPercentage(10, 10)).toEqual(100);
    expect(calcPercentage(5, 10)).toEqual(50);
    expect(calcPercentage(1, 10)).toEqual(10);
  });

  it("should return correct percentage if value is negative", () => {
    expect(calcPercentage(-1, 10)).toEqual(0);
  });

  it("should return correct percentage if value is over the maximum", () => {
    expect(calcPercentage(15, 10)).toEqual(100);
  });

  it("should return correct percentage if value is float", () => {
    expect(calcPercentage(5.5, 10)).toEqual(55);
  });
});
