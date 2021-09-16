import { FieldRule, FieldType, FieldFormatter } from "./external-types";

export type InternalOptionalFieldConfig<T> = {
  when: (value: string) => boolean;
  then: T;
};

export type InternalFieldConfig<F, P extends keyof F> = {
  type: FieldType<F[P]>;
  optional: InternalOptionalFieldConfig<F[P]>;
  rules: FieldRule<F>[];
  initial: string;
  formatters: FieldFormatter[];
};

export type InternalFormConfig<F> = {
  [P in keyof F]-?: InternalFieldConfig<F, P>;
};
