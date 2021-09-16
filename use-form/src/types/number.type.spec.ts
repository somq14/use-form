import { NumberType } from "./number.type";

describe("NumberType", () => {
  it("convert", () => {
    expect(NumberType("+123")).toEqual(123);
    expect(NumberType("-123")).toBe(-123);
    expect(NumberType("+0")).toBe(0);
    expect(NumberType("-0")).toBe(-0);
    expect(NumberType("0.123")).toBe(0.123);
    expect(NumberType("abc")).toBe(NaN);
  });
});
