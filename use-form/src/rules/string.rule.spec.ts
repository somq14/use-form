import { FieldError } from "../core";

import {
  Length,
  MaxLength,
  MinLength,
  OneOf,
  Pattern,
  EmailAddress,
} from "./string.rule";

describe("Length", () => {
  it("validation", () => {
    const rule = Length(2, 3);
    expect(rule("x", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "Length",
        name: "prop",
        value: "x",
        message: "the length of prop must be between 2 and 3",
      },
    ]);
    expect(rule("xx", "prop", {})).toHaveLength(0);
    expect(rule("xxx", "prop", {})).toHaveLength(0);
    expect(rule("xxxx", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "Length",
        name: "prop",
        value: "xxxx",
        message: "the length of prop must be between 2 and 3",
      },
    ]);
  });

  it("message", () => {
    const rule = Length(2, 3, "msg");
    expect(rule("x", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "Length",
        name: "prop",
        value: "x",
        message: "msg",
      },
    ]);
  });
});

describe("MinLength", () => {
  it("validation", () => {
    const rule = MinLength(2);
    expect(rule("x", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "MinLength",
        name: "prop",
        value: "x",
        message: "prop must be longer than or equal to 2 characters",
      },
    ]);
    expect(rule("xx", "prop", {})).toHaveLength(0);
  });

  it("message", () => {
    const rule = MinLength(2, "msg");
    expect(rule("x", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "MinLength",
        name: "prop",
        value: "x",
        message: "msg",
      },
    ]);
  });
});

describe("MaxLength", () => {
  it("validation", () => {
    const rule = MaxLength(2);
    expect(rule("xxx", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "MaxLength",
        name: "prop",
        value: "xxx",
        message: "prop must be shorter than or equal to 2 characters",
      },
    ]);
    expect(rule("xx", "prop", {})).toHaveLength(0);
  });

  it("message", () => {
    const rule = MaxLength(2, "msg");
    expect(rule("xxx", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "MaxLength",
        name: "prop",
        value: "xxx",
        message: "msg",
      },
    ]);
  });
});

describe("Pattern", () => {
  it("validation", () => {
    const rule = Pattern(/^[a-z]+$/);
    expect(rule("abc", "prop", {})).toHaveLength(0);
    expect(rule("abcABC", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "Pattern",
        name: "prop",
        value: "abcABC",
        message: "prop must match /^[a-z]+$/ regular expression",
      },
    ]);
  });

  it("message", () => {
    const rule = Pattern(/^[a-z]+$/, "msg");
    expect(rule("abcABC", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "Pattern",
        name: "prop",
        value: "abcABC",
        message: "msg",
      },
    ]);
  });
});

describe("EmailAddress", () => {
  it("validation", () => {
    const rule = EmailAddress();
    expect(rule("a@b", "prop", {})).toHaveLength(0);
    expect(rule("hoge@example.com", "prop", {})).toHaveLength(0);
    expect(rule("ab", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "EmailAddress",
        name: "prop",
        value: "ab",
        message: "prop must be valid email address",
      },
    ]);
  });

  it("message", () => {
    const rule = EmailAddress("msg");
    expect(rule("ab", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "EmailAddress",
        name: "prop",
        value: "ab",
        message: "msg",
      },
    ]);
  });
});

describe("OneOf", () => {
  it("validation", () => {
    const rule = OneOf(["a", "b"]);
    expect(rule("a", "prop", {})).toHaveLength(0);
    expect(rule("b", "prop", {})).toHaveLength(0);
    expect(rule("c", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "OneOf",
        name: "prop",
        value: "c",
        message: 'prop must be on of the following values: ["a","b"]',
      },
    ]);
  });

  it("message", () => {
    const rule = OneOf(["a", "b"], "msg");
    expect(rule("c", "prop", {})).toEqual<FieldError[]>([
      {
        ruleName: "OneOf",
        name: "prop",
        value: "c",
        message: "msg",
      },
    ]);
  });
});
