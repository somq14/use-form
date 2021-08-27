import { FieldRule } from "../core";

export const Max =
  (max: number, message: string): FieldRule<unknown> =>
  (value, name) => {
    if (Number(value) <= max) {
      return [];
    }
    return [
      {
        name,
        value,
        message,
        ruleName: "Max",
      },
    ];
  };
