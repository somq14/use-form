import { StringType } from "../types";

import { formatField, formatForm } from "./format";
import { InternalFieldConfig, InternalFormConfig } from "./internal-types";

describe("formatField", () => {
  type Form = { field: string };
  const config: Omit<InternalFieldConfig<Form, "field">, "formatters"> = {
    initial: "",
    optional: {
      when: (value: string) => value === "",
      then: "",
    },
    rules: [],
    type: StringType,
  };

  it("none", () => {
    expect(
      formatField<Form, "field">("a", { ...config, formatters: [] })
    ).toEqual("a");
  });

  it("one", () => {
    expect(
      formatField<Form, "field">("a", {
        ...config,
        formatters: [(x) => x + "b"],
      })
    ).toEqual("ab");
  });

  it("two", () => {
    expect(
      formatField<Form, "field">("a", {
        ...config,
        formatters: [(x) => x + "b", (x) => x + "c"],
      })
    ).toEqual("abc");
  });
});

describe("formatForm", () => {
  type Form = { fieldA: string; fieldB: string };
  const config: InternalFormConfig<Form> = {
    fieldA: {
      initial: "",
      optional: {
        when: (value: string) => value === "",
        then: "",
      },
      rules: [],
      type: StringType,
      formatters: [(x) => x + "a"],
    },
    fieldB: {
      initial: "",
      optional: {
        when: (value: string) => value === "",
        then: "",
      },
      rules: [],
      type: StringType,
      formatters: [(x) => x + "b"],
    },
  };

  it("format", () => {
    expect(formatForm<Form>({ fieldA: "a", fieldB: "b" }, config)).toEqual({
      fieldA: "aa",
      fieldB: "bb",
    });
  });
});
