import { FieldType } from "../core";

export const BooleanType: FieldType<boolean> = (value: string) => {
  return value === "true";
};
