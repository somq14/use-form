/* eslint-disable @typescript-eslint/no-empty-function */
import { createElement } from "react";

import { bindField } from "./use-form";

describe("bindField", () => {
  type Form = { field: string };
  it("test", () => {
    const props = bindField<Form>({
      value: "value",
      setValue: () => {},
      errors: [],
      setErrors: () => {},
      onChange: () => {},
      onBlur: () => {},
      validate: () => [],
      validated: () => ({ field: "xxx" }),
    });
    expect(createElement("input", props)).toBeTruthy();
  });
});
