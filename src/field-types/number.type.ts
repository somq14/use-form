import { FieldType } from "../types";

export const NumberType: FieldType<number> = (value: string) => {
  return Number(value);
};
