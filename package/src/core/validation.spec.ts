import { StringType, NumberType } from "../types";
import {
  MaxLength,
  MinLength,
  Pattern,
  LessOrEqualThan,
  GreaterOrEqualThan,
} from "../rules";
import { FieldError } from "../core";

import { validateField, validateForm } from "./validation";
import { InternalFieldConfig, InternalFormConfig } from "./internal-types";

describe("validateField", () => {
  type Form = { field?: string };
  const config: InternalFieldConfig<Form, "field"> = {
    initial: "",
    optional: {
      when: (value: string) => value === "",
      then: undefined,
    },
    rules: [MinLength(4), MaxLength(8), Pattern(/^[a-zA-Z]*$/)],
    type: StringType,
    formatters: [],
  };

  it("no error", () => {
    const form = { field: "abcdef" };
    const errors = validateField<Form, "field">(
      form["field"],
      "field",
      form,
      config
    );
    expect(errors).toHaveLength(0);
  });

  it("error", () => {
    const form = { field: "TooLongValue" };
    const errors = validateField<Form, "field">(
      form["field"],
      "field",
      form,
      config
    );
    expect(errors).toEqual<FieldError[]>([
      {
        ruleName: "MaxLength",
        name: "field",
        value: "TooLongValue",
        message: "field must be shorter than or equal to 8 characters",
      },
    ]);
  });

  it("optional", () => {
    const form = { field: "" };
    const errors = validateField<Form, "field">(
      form["field"],
      "field",
      form,
      config
    );
    expect(errors).toEqual<FieldError[]>([]);
  });
});

describe("validateForm", () => {
  type Form = { fieldA?: string; fieldB: number };
  const config: InternalFormConfig<Form> = {
    fieldA: {
      initial: "",
      optional: {
        when: (value: string) => value === "",
        then: undefined,
      },
      rules: [MinLength(4), MaxLength(8), Pattern(/^[a-zA-Z]*$/)],
      type: StringType,
      formatters: [],
    },
    fieldB: {
      initial: "",
      optional: {
        when: () => false,
        then: NaN,
      },
      rules: [GreaterOrEqualThan(4), LessOrEqualThan(8)],
      type: NumberType,
      formatters: [],
    },
  };

  it("no error", () => {
    const errors = validateForm<Form>({ fieldA: "", fieldB: "6" }, config);
    expect(errors).toEqual({
      fieldA: [],
      fieldB: [],
    });
  });

  it("error", () => {
    const errors = validateForm<Form>({ fieldA: "abc", fieldB: "0" }, config);
    expect(errors).toEqual({
      fieldA: [
        {
          message: "fieldA must be longer than or equal to 4 characters",
          name: "fieldA",
          ruleName: "MinLength",
          value: "abc",
        },
      ],
      fieldB: [
        {
          message: "fieldB must be greater or equal than 4",
          name: "fieldB",
          ruleName: "GreaterOrEqualThan",
          value: "0",
        },
      ],
    });
  });
});
