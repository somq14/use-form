import { FormModel } from "./model";
import { FieldRule } from "./rule";
import { FieldType } from "./type";

export type OptionalFieldConfig<T> = {
  when?: string | RegExp | ((value: string) => boolean);
  then?: T;
};

export type FieldConfig<F extends FormModel, P extends keyof F> = {
  type?: FieldType<F[P]>;
  optional?: boolean | OptionalFieldConfig<F[P]>;
  rules?: FieldRule<F>[];
  initial?: string;
};

export type FormConfig<F extends FormModel> = {
  [P in keyof F]-?: FieldConfig<F, P>;
};
