import { StringType, NumberType } from "../types";

import { convertField, convertForm } from "./conversion";

describe("convertField", () => {
  it("empty case", () => {
    type Form = { field: string };
    const res = convertField<Form, "field">("", {
      initial: "",
      optional: {
        when: (value) => value === "",
        then: "optional",
      },
      type: StringType,
      rules: [],
    });
    expect(res).toBe("optional");
  });

  it("string case", () => {
    type Form = { field: string };
    const res = convertField<Form, "field">("abc", {
      initial: "",
      optional: {
        when: (value) => value === "",
        then: "optional",
      },
      type: StringType,
      rules: [],
    });
    expect(res).toBe("abc");
  });

  it("number case", () => {
    type Form = { field: number };
    const res = convertField<Form, "field">("123", {
      initial: "",
      optional: {
        when: () => false,
        then: NaN,
      },
      type: NumberType,
      rules: [],
    });
    expect(res).toBe(123);
  });
});

describe("convertForm", () => {
  it("number case", () => {
    type Form = { fieldA?: string; fieldB: number };
    const res = convertForm<Form>(
      { fieldA: "", fieldB: "123" },
      {
        fieldA: {
          initial: "",
          optional: {
            when: (value) => value === "",
            then: undefined,
          },
          type: StringType,
          rules: [],
        },
        fieldB: {
          initial: "",
          optional: {
            when: () => false,
            then: NaN,
          },
          type: NumberType,
          rules: [],
        },
      }
    );
    expect(res).toEqual<Form>({
      fieldA: undefined,
      fieldB: 123,
    });
  });
});
