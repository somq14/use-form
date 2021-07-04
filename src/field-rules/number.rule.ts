import { FieldRule } from "../types";

export const Max =
  (max: number, message: string): FieldRule<never> =>
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
