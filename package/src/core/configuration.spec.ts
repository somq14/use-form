import { GreaterOrEqualThan, LessOrEqualThan } from "../rules";
import { NumberType } from "../types";
import { StringType } from "../types/string.type";

import {
  convertFormConfig,
  convertFieldConfig,
  convertOptionalConfig,
  convertOptionalWhenConfig,
  convertTypeConfig,
} from "./configuration";

describe("convertOptionalWhenConfig", () => {
  it("undefined", () => {
    const isOptional = convertOptionalWhenConfig(undefined);
    expect(isOptional("")).toBe(false);
    expect(isOptional("abc")).toBe(false);
  });

  it("false", () => {
    const isOptional = convertOptionalWhenConfig(false);
    expect(isOptional("")).toBe(false);
    expect(isOptional("abc")).toBe(false);
  });

  it("true", () => {
    const isOptional = convertOptionalWhenConfig(true);
    expect(isOptional("")).toBe(true);
    expect(isOptional(" abc ")).toBe(false);
  });

  it("string", () => {
    const isOptional = convertOptionalWhenConfig("empty");
    expect(isOptional("empty")).toBe(true);
    expect(isOptional("")).toBe(false);
  });

  it("regexp", () => {
    const isOptional = convertOptionalWhenConfig(/^\s+$/);
    expect(isOptional(" \t\n")).toBe(true);
    expect(isOptional(" \t\na")).toBe(false);
  });

  it("function", () => {
    const isOptional = convertOptionalWhenConfig(
      (value) => value.trim() === ""
    );
    expect(isOptional("")).toBe(true);
    expect(isOptional(" \t\n")).toBe(true);
    expect(isOptional(" abc ")).toBe(false);
  });
});

describe("convertOptionalConfig", () => {
  it("false", () => {
    const config = convertOptionalConfig(false);
    expect(config.then).toBe(undefined);
  });

  it("true", () => {
    const config = convertOptionalConfig(true);
    expect(config.then).toBe(undefined);
  });

  it("object", () => {
    const config = convertOptionalConfig({
      then: "empty",
    });
    expect(config.then).toBe("empty");
  });
});

describe("convertTypeConfig", () => {
  it("undefined", () => {
    const type = convertTypeConfig(undefined);
    expect(type("")).toBe("");
    expect(type(" abc ")).toBe(" abc ");
  });

  it("type", () => {
    const type = convertTypeConfig(NumberType);
    expect(type("123")).toBe(123);
  });
});

describe("convertFieldConfig", () => {
  it("full", () => {
    const config = convertFieldConfig<{ field?: number }, "field">({
      initial: "initial",
      optional: true,
      rules: [GreaterOrEqualThan(0), LessOrEqualThan(10)],
      type: NumberType,
      formatters: [(x) => x.trim()],
    });
    expect(config.initial).toEqual("initial");
    expect(config.optional.when).toBeTruthy();
    expect(config.optional.then).toBe(undefined);
    expect(config.rules).toHaveLength(2);
    expect(config.type).toBe(NumberType);
    expect(config.formatters).toBeTruthy();
  });

  it("omit", () => {
    const config = convertFieldConfig<{ field: string }, "field">({});
    expect(config.initial).toEqual("");
    expect(config.optional.when).toBeTruthy();
    expect(config.optional.then).toBe(undefined);
    expect(config.rules).toHaveLength(0);
    expect(config.type).toBe(StringType);
    expect(config.formatters).toBeTruthy();
  });
});

describe("convertFormConfig", () => {
  it("test", () => {
    type Form = { fieldA: string; fieldB?: number };
    const config = convertFormConfig<Form>({
      fieldA: {},
      fieldB: {
        type: NumberType,
        optional: true,
      },
    });
    expect(config.fieldA).toBeTruthy();
    expect(config.fieldB).toBeTruthy();
  });
});
