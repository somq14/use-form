import { FieldError } from "../core";

import { IsNumber } from "./number.rule";

describe("IsNumber", () => {
  it("validation", () => {
    const rule = IsNumber();
    // sign
    expect(rule("+0", "prop", {})).toHaveLength(0);
    expect(rule("-0", "prop", {})).toHaveLength(0);
    expect(rule("+9", "prop", {})).toHaveLength(0);
    expect(rule("-9", "prop", {})).toHaveLength(0);
    expect(rule("+", "prop", {})).toHaveLength(1);
    expect(rule("-", "prop", {})).toHaveLength(1);

    // decimal part
    expect(rule("0", "prop", {})).toHaveLength(0);
    expect(rule("9", "prop", {})).toHaveLength(0);
    expect(rule("19", "prop", {})).toHaveLength(0);
    expect(rule("01", "prop", {})).toHaveLength(1);

    // fraction part
    expect(rule(".1", "prop", {})).toHaveLength(1);
    expect(rule("0.1", "prop", {})).toHaveLength(0);
    expect(rule("1.09", "prop", {})).toHaveLength(0);
    expect(rule("19.09", "prop", {})).toHaveLength(0);

    expect(rule("abc", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "IsNumber",
        name: "prop",
        value: "abc",
        message: "prop must be number",
      },
    ]);
  });

  it("message", () => {
    const rule = IsNumber("msg");
    expect(rule("abc", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "IsNumber",
        name: "prop",
        value: "abc",
        message: "msg",
      },
    ]);
  });
});
