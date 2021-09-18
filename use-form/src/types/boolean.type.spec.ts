import { BooleanType } from "./boolean.type";

describe("BooleanType", () => {
  it("convert", () => {
    expect(BooleanType("true")).toEqual(true);
    expect(BooleanType("false")).toEqual(false);
    expect(BooleanType("abc")).toEqual(false);
    expect(BooleanType("")).toEqual(false);
  });
});
