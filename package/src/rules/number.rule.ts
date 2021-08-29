import { FieldRule } from "../core";

import { defineRule } from "./rule";

export const IsNumber = (message?: string): FieldRule<unknown> =>
  defineRule(
    "IsNumber",
    (value) => /^[+-]?([1-9][0-9]*|0)(\.[0-9]+)?$/.test(value),
    (name) => message ?? `${name} must be number`
  );
