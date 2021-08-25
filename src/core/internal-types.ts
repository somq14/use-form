import { FieldRule, FieldType, FormModel } from "./external-types";

export type InternalOptionalFieldConfig<T> = {
  when: (value: string) => boolean;
  then: T;
};

export type InternalFieldConfig<F extends FormModel, P extends keyof F> = {
  type: FieldType<F[P]>;
  optional: InternalOptionalFieldConfig<F[P]>;
  rules: FieldRule<F>[];
  initial: string;
};

export type InternalFormConfig<F extends FormModel> = {
  [P in keyof F]-?: InternalFieldConfig<F, P>;
};