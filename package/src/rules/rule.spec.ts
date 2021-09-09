import { FieldError } from "../../dist/types";

import { defineRule } from "./rule";

describe("defineRule", () => {
  it("callback argument", () => {
    expect.assertions(2);
    const rule = defineRule(
      "rule",
      (value) => {
        expect(value).toBe("xxx");
        return false;
      },
      (name) => {
        expect(name).toBe("prop");
        return "msg";
      }
    );
    rule("xxx", "prop", {});
  });

  it("validation", () => {
    expect.assertions(2);
    const successRule = defineRule(
      "rule",
      () => true,
      () => "msg"
    );
    const failureRule = defineRule(
      "rule",
      () => false,
      () => "msg"
    );
    expect(successRule("xxx", "prop", {})).toEqual<FieldError[]>([]);
    expect(failureRule("xxx", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "rule",
        name: "prop",
        value: "xxx",
        message: "msg",
      },
    ]);
  });
});
