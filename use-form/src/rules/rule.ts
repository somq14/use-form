import { FieldRule } from "../core";

export const defineRule = (
  ruleName: string,
  validate: (value: string) => boolean,
  message: (name: string) => string
): FieldRule<unknown> => {
  return (value: string, name: string) => {
    return validate(value)
      ? []
      : [
          {
            ruleName,
            name,
            value,
            message: message(name),
          },
        ];
  };
};
