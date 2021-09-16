import { StringType } from "./string.type";

describe("StringType", () => {
  it("convert", () => {
    expect(StringType("abc")).toEqual("abc");
    expect(StringType(" abc ")).toEqual(" abc ");
  });
});
