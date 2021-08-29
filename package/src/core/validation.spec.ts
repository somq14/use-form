import { StringType } from "../types";
import { MaxLength, MinLength, Pattern } from "../rules";
import { FieldError } from "../core";

import { validateField } from "./validation";

describe("validateField", () => {
  type Form = { field?: string };
  const config = {
    initial: "",
    optional: {
      when: (value: string) => value === "",
      then: undefined,
    },
    rules: [MinLength(4), MaxLength(8), Pattern(/^[a-zA-Z]*$/)],
    type: StringType,
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
