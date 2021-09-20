import { MinLength, NumberType, StringType } from "..";

import {
  convertFieldAction,
  convertFormAction,
  formatFieldAction,
  formatFormAction,
  getFieldErrorsAction,
  getFieldValueAction,
  getFormErrorAction,
  getFormValueAction,
  initFormState,
  resetFieldAction,
  resetFormAction,
  setFieldErrorsAction,
  setFieldValueAction,
  setFormErrorAction,
  setFormValueAction,
  validateFieldAction,
  validateFormAction,
} from "./actions";
import { InternalFormConfig } from "./internal-types";

type Form = {
  fieldA: string;
  fieldB: number;
};

const formConfig: InternalFormConfig<Form> = {
  fieldA: {
    type: StringType,
    initial: "init",
    optional: {
      when: () => false,
      then: "",
    },
    formatters: [(x) => x.trim()],
    rules: [MinLength(3)],
  },
  fieldB: {
    type: NumberType,
    initial: "",
    optional: {
      when: () => false,
      then: NaN,
    },
    formatters: [(x) => x.trim()],
    rules: [],
  },
};

describe("initFormState", () => {
  it("test", () => {
    expect(initFormState(formConfig)).toEqual({
      value: {
        fieldA: "init",
        fieldB: "",
      },
      error: {
        fieldA: [],
        fieldB: [],
      },
    });
  });
});

describe("getFieldValueAction ", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: { fieldA: [], fieldB: [] },
    };
    expect(getFieldValueAction(state, { key: "fieldA" })).toEqual([state, "a"]);
  });
});

describe("getFormValueAction ", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: { fieldA: [], fieldB: [] },
    };
    expect(getFormValueAction(state)).toEqual([
      state,
      { fieldA: "a", fieldB: "b" },
    ]);
  });
});

describe("setFieldValueAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: { fieldA: [], fieldB: [] },
    };
    expect(setFieldValueAction(state, { key: "fieldA", value: "x" })).toEqual([
      { value: { fieldA: "x", fieldB: "b" }, error: state.error },
      undefined,
    ]);
  });
});

describe("setFormValueAction", () => {
  it("value", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: { fieldA: [], fieldB: [] },
    };
    expect(
      setFormValueAction(state, { value: { fieldA: "x", fieldB: "y" } })
    ).toEqual([
      { value: { fieldA: "x", fieldB: "y" }, error: state.error },
      undefined,
    ]);
  });

  it("function", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: { fieldA: [], fieldB: [] },
    };
    expect(
      setFormValueAction(state, {
        value: (value) => ({
          fieldA: value.fieldA + "x",
          fieldB: value.fieldB + "y",
        }),
      })
    ).toEqual([
      { value: { fieldA: "ax", fieldB: "by" }, error: state.error },
      undefined,
    ]);
  });
});

describe("getFieldErrorsAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: {
        fieldA: [
          {
            ruleName: "ruleName",
            message: "message",
            name: "fieldA",
            value: "a",
          },
        ],
        fieldB: [],
      },
    };
    expect(getFieldErrorsAction(state, { key: "fieldA" })).toEqual([
      state,
      state.error.fieldA,
    ]);
    expect(getFieldErrorsAction(state, { key: "fieldB" })).toEqual([
      state,
      state.error.fieldB,
    ]);
  });
});

describe("getFormErrorAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: {
        fieldA: [
          {
            ruleName: "ruleName",
            message: "message",
            name: "fieldA",
            value: "a",
          },
        ],
        fieldB: [],
      },
    };
    expect(getFormErrorAction(state)).toEqual([state, state.error]);
  });
});

describe("setFieldErrorsAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: {
        fieldA: [
          {
            ruleName: "ruleName",
            message: "message",
            name: "fieldA",
            value: "a",
          },
        ],
        fieldB: [],
      },
    };
    expect(setFieldErrorsAction(state, { key: "fieldA", errors: [] })).toEqual([
      { value: state.value, error: { fieldA: [], fieldB: [] } },
      undefined,
    ]);
  });
});

describe("setFormErrorAction", () => {
  it("value", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: {
        fieldA: [
          {
            ruleName: "ruleName",
            message: "message",
            name: "fieldA",
            value: "a",
          },
        ],
        fieldB: [],
      },
    };
    expect(
      setFormErrorAction(state, { error: { fieldA: [], fieldB: [] } })
    ).toEqual([
      { value: state.value, error: { fieldA: [], fieldB: [] } },
      undefined,
    ]);
  });

  it("function", () => {
    const state = {
      value: { fieldA: "a", fieldB: "b" },
      error: {
        fieldA: [
          {
            ruleName: "ruleName",
            message: "message",
            name: "fieldA",
            value: "a",
          },
        ],
        fieldB: [],
      },
    };
    expect(
      setFormErrorAction(state, {
        error: (error) => ({
          fieldA: [
            ...error.fieldA,
            {
              ruleName: "ruleName2",
              message: "message2",
              name: "fieldA",
              value: "a",
            },
          ],
          fieldB: error.fieldB,
        }),
      })
    ).toEqual([
      {
        value: state.value,
        error: {
          fieldA: [
            {
              ruleName: "ruleName",
              message: "message",
              name: "fieldA",
              value: "a",
            },
            {
              ruleName: "ruleName2",
              message: "message2",
              name: "fieldA",
              value: "a",
            },
          ],
          fieldB: [],
        },
      },
      undefined,
    ]);
  });
});

describe("formatFieldAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: " a ", fieldB: "b" },
      error: {
        fieldA: [],
        fieldB: [],
      },
    };
    expect(
      formatFieldAction(state, {
        key: "fieldA",
        formConfig,
      })
    ).toEqual([
      { value: { fieldA: "a", fieldB: "b" }, error: state.error },
      undefined,
    ]);
  });
});

describe("formatFormAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: " a ", fieldB: "b" },
      error: {
        fieldA: [],
        fieldB: [],
      },
    };
    expect(
      formatFormAction(state, {
        formConfig,
      })
    ).toEqual([
      { value: { fieldA: "a", fieldB: "b" }, error: state.error },
      undefined,
    ]);
  });
});

describe("validateFieldAction", () => {
  it("error", () => {
    const state = {
      value: { fieldA: " a ", fieldB: "b" },
      error: {
        fieldA: [],
        fieldB: [],
      },
    };
    expect(validateFieldAction(state, { key: "fieldA", formConfig })).toEqual([
      {
        value: { fieldA: "a", fieldB: "b" },
        error: {
          fieldA: [
            {
              message: "fieldA must be longer than or equal to 3 characters",
              name: "fieldA",
              ruleName: "MinLength",
              value: "a",
            },
          ],
          fieldB: [],
        },
      },
      [
        {
          message: "fieldA must be longer than or equal to 3 characters",
          name: "fieldA",
          ruleName: "MinLength",
          value: "a",
        },
      ],
    ]);
  });

  it("success", () => {
    const state = {
      value: { fieldA: "aaa", fieldB: "b" },
      error: {
        fieldA: [],
        fieldB: [],
      },
    };
    expect(validateFieldAction(state, { key: "fieldA", formConfig })).toEqual([
      {
        value: { fieldA: "aaa", fieldB: "b" },
        error: { fieldA: [], fieldB: [] },
      },
      [],
    ]);
  });
});

describe("validateFormAction", () => {
  it("error", () => {
    const state = {
      value: { fieldA: " a ", fieldB: "b" },
      error: {
        fieldA: [],
        fieldB: [],
      },
    };
    expect(validateFormAction(state, { formConfig })).toEqual([
      {
        value: { fieldA: "a", fieldB: "b" },
        error: {
          fieldA: [
            {
              message: "fieldA must be longer than or equal to 3 characters",
              name: "fieldA",
              ruleName: "MinLength",
              value: "a",
            },
          ],
          fieldB: [],
        },
      },
      false,
    ]);
  });

  it("success", () => {
    const state = {
      value: { fieldA: "aaa", fieldB: "b" },
      error: {
        fieldA: [],
        fieldB: [],
      },
    };
    expect(validateFormAction(state, { formConfig })).toEqual([
      {
        value: { fieldA: "aaa", fieldB: "b" },
        error: { fieldA: [], fieldB: [] },
      },
      true,
    ]);
  });
});

describe("convertFieldAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "aaa", fieldB: " 123 " },
      error: {
        fieldA: [],
        fieldB: [],
      },
    };
    expect(convertFieldAction(state, { key: "fieldB", formConfig })).toEqual([
      {
        value: { fieldA: "aaa", fieldB: "123" },
        error: state.error,
      },
      123,
    ]);
  });
});

describe("convertFormAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "aaa", fieldB: " 123 " },
      error: {
        fieldA: [],
        fieldB: [],
      },
    };
    expect(convertFormAction(state, { formConfig })).toEqual([
      {
        value: { fieldA: "aaa", fieldB: "123" },
        error: state.error,
      },
      {
        fieldA: "aaa",
        fieldB: 123,
      },
    ]);
  });
});

describe("resetFieldAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "aaa", fieldB: "123" },
      error: {
        fieldA: [
          {
            message: "fieldA must be longer than or equal to 3 characters",
            name: "fieldA",
            ruleName: "MinLength",
            value: "a",
          },
        ],
        fieldB: [],
      },
    };
    expect(resetFieldAction(state, { key: "fieldA", formConfig })).toEqual([
      {
        value: { fieldA: "init", fieldB: "123" },
        error: { fieldA: [], fieldB: [] },
      },
      undefined,
    ]);
  });
});

describe("resetFormAction", () => {
  it("test", () => {
    const state = {
      value: { fieldA: "aaa", fieldB: "123" },
      error: {
        fieldA: [
          {
            message: "fieldA must be longer than or equal to 3 characters",
            name: "fieldA",
            ruleName: "MinLength",
            value: "a",
          },
        ],
        fieldB: [],
      },
    };
    expect(resetFormAction(state, { formConfig })).toEqual([
      {
        value: { fieldA: "init", fieldB: "" },
        error: { fieldA: [], fieldB: [] },
      },
      undefined,
    ]);
  });
});
