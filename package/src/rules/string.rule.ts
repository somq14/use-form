import { FieldRule } from "../core";

import { defineRule } from "./rule";

export const Length = (
  min: number,
  max: number,
  message?: string
): FieldRule<unknown> =>
  defineRule(
    "Length",
    (value) => value.length >= min && value.length <= max,
    (name) =>
      message ?? `the length of ${name} must be between ${min} and ${max}`
  );

export const MinLength = (min: number, message?: string): FieldRule<unknown> =>
  defineRule(
    "MinLength",
    (value) => value.length >= min,
    (name) =>
      message ?? `${name} must be longer than or equal to ${min} characters`
  );

export const MaxLength = (max: number, message?: string): FieldRule<unknown> =>
  defineRule(
    "MaxLength",
    (value) => value.length <= max,
    (name) =>
      message ?? `${name} must be shorter than or equal to ${max} characters`
  );

export const Pattern = (
  pattern: RegExp,
  message?: string
): FieldRule<unknown> =>
  defineRule(
    "Pattern",
    (value) => pattern.test(value),
    (name) =>
      message ?? `${name} must match ${pattern.toString()} regular expression`
  );

export const EmailAddress = (message?: string): FieldRule<unknown> =>
  defineRule(
    "EmailAddress",
    (value) =>
      // https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        value
      ),
    (name) => message ?? `${name} must be valid email address`
  );

export const OneOf = (
  allowedValues: string[],
  message?: string
): FieldRule<unknown> =>
  defineRule(
    "OneOf",
    (value) => allowedValues.some((v) => v === value),
    (name) =>
      message ??
      `${name} must be on of the following values: ${JSON.stringify(
        allowedValues
      )}`
  );
