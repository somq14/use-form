import { mapProperties, toEntries } from "./object.util";

describe("mapProperties", () => {
  it("success", () => {
    type Src = { a: number; b: number[] };
    type Dst = { a: string; b: string };
    const x: Src = { a: 1, b: [2, 3] };

    expect(
      mapProperties<Src, Dst>(x, (value) => {
        return JSON.stringify(value);
      })
    ).toEqual({ a: "1", b: "[2,3]" });
  });

  it("check callback property", () => {
    const x = { a: 1 };

    expect(
      mapProperties<{ a: number }, { a: string }>(x, (value, key, obj) => {
        expect(value).toBe(1);
        expect(key).toBe("a");
        expect(obj).toBe(x);
        return "ok";
      })
    ).toEqual({ a: "ok" });
  });
});

describe("toEntries", () => {
  it("success", () => {
    expect(toEntries({ a: 1, b: "2" })).toEqual([
      ["a", 1],
      ["b", "2"],
    ]);
  });
});
