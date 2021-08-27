import { FieldType } from "../core";

export const NumberType: FieldType<unknown> = (value: string) => {
  return Number(value);
};
