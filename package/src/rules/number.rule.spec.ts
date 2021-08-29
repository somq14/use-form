import { FieldError } from "../core";

import {
  IsNumber,
  IsInteger,
  LessOrEqualThan,
  GreaterOrEqualThan,
  LessThan,
  GreaterThan,
} from "./number.rule";

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

describe("IsInteger", () => {
  it("validation", () => {
    const rule = IsInteger();
    expect(rule("+0", "prop", {})).toHaveLength(0);
    expect(rule("-0", "prop", {})).toHaveLength(0);
    expect(rule("+123", "prop", {})).toHaveLength(0);
    expect(rule("-123", "prop", {})).toHaveLength(0);

    expect(rule("123.123", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "IsInteger",
        name: "prop",
        value: "123.123",
        message: "prop must be integer",
      },
    ]);
    expect(rule("-123.123", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "IsInteger",
        name: "prop",
        value: "-123.123",
        message: "prop must be integer",
      },
    ]);
  });

  it("message", () => {
    const rule = IsInteger("msg");
    expect(rule("123.123", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "IsInteger",
        name: "prop",
        value: "123.123",
        message: "msg",
      },
    ]);
  });
});

describe("LessOrEqualThan", () => {
  it("validation", () => {
    const rule = LessOrEqualThan(1);
    expect(rule("0", "prop", {})).toHaveLength(0);
    expect(rule("1", "prop", {})).toHaveLength(0);
    expect(rule("2", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "LessOrEqualThan",
        name: "prop",
        value: "2",
        message: "prop must be less or equal than 1",
      },
    ]);
  });

  it("message", () => {
    const rule = LessOrEqualThan(1, "msg");
    expect(rule("2", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "LessOrEqualThan",
        name: "prop",
        value: "2",
        message: "msg",
      },
    ]);
  });
});

describe("GreaterOrEqualThan", () => {
  it("validation", () => {
    const rule = GreaterOrEqualThan(1);
    expect(rule("2", "prop", {})).toHaveLength(0);
    expect(rule("1", "prop", {})).toHaveLength(0);
    expect(rule("0", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "GreaterOrEqualThan",
        name: "prop",
        value: "0",
        message: "prop must be greater or equal than 1",
      },
    ]);
  });

  it("message", () => {
    const rule = GreaterOrEqualThan(1, "msg");
    expect(rule("0", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "GreaterOrEqualThan",
        name: "prop",
        value: "0",
        message: "msg",
      },
    ]);
  });
});

describe("LessThan", () => {
  it("validation", () => {
    const rule = LessThan(1);
    expect(rule("0", "prop", {})).toHaveLength(0);
    expect(rule("1", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "LessThan",
        name: "prop",
        value: "1",
        message: "prop must be less than 1",
      },
    ]);
  });

  it("message", () => {
    const rule = LessThan(1, "msg");
    expect(rule("1", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "LessThan",
        name: "prop",
        value: "1",
        message: "msg",
      },
    ]);
  });
});

describe("GreaterThan", () => {
  it("validation", () => {
    const rule = GreaterThan(1);
    expect(rule("2", "prop", {})).toHaveLength(0);
    expect(rule("1", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "GreaterThan",
        name: "prop",
        value: "1",
        message: "prop must be greater than 1",
      },
    ]);
  });

  it("message", () => {
    const rule = GreaterThan(1, "msg");
    expect(rule("2", "prop", {})).toHaveLength(0);
    expect(rule("1", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "GreaterThan",
        name: "prop",
        value: "1",
        message: "msg",
      },
    ]);
  });
});
