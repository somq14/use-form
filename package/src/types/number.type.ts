import { FieldType } from "../core";

export const NumberType: FieldType<number> = (value: string) => {
  return Number(value);
};
