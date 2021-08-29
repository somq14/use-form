import { FieldRule } from "../core";

import { defineRule } from "./rule";

export const IsNumber = (message?: string): FieldRule<unknown> =>
  defineRule(
    "IsNumber",
    (value) => /^[+-]?([1-9][0-9]*|0)(\.[0-9]+)?$/.test(value),
    (name) => message ?? `${name} must be number`
  );

export const IsInteger = (message?: string): FieldRule<unknown> =>
  defineRule(
    "IsInteger",
    (value) => {
      const num = Number(value);
      return num === Math.floor(num);
    },
    (name) => message ?? `${name} must be integer`
  );

export const LessOrEqualThan = (
  max: number,
  message?: string
): FieldRule<unknown> =>
  defineRule(
    "LessOrEqualThan",
    (value) => Number(value) <= max,
    (name) => message ?? `${name} must be less or equal than ${max}`
  );

export const GreaterOrEqualThan = (
  min: number,
  message?: string
): FieldRule<unknown> =>
  defineRule(
    "GreaterOrEqualThan",
    (value) => Number(value) >= min,
    (name) => message ?? `${name} must be greater or equal than ${min}`
  );

export const LessThan = (
  upperLimit: number,
  message?: string
): FieldRule<unknown> =>
  defineRule(
    "LessThan",
    (value) => Number(value) < upperLimit,
    (name) => message ?? `${name} must be less than ${upperLimit}`
  );

export const GreaterThan = (
  lowerLimit: number,
  message?: string
): FieldRule<unknown> =>
  defineRule(
    "GreaterThan",
    (value) => Number(value) > lowerLimit,
    (name) => message ?? `${name} must be greater than ${lowerLimit}`
  );
