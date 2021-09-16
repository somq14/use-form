export type FieldHandle<T> = {
  value: string;
  setValue: (value: string) => void;
  errors: FieldError[];
  setErrors: (errors: FieldError[]) => void;
  validate: () => FieldError[];
  validated: () => T;
};

export type FormHandle<F> = {
  [P in keyof F]-?: FieldHandle<F[P]>;
};

export type FieldError = {
  name: string;
  value: string;
  ruleName: string;
  message: string;
};

export type FormError<F> = {
  [_ in keyof F]-?: FieldError[];
};

export type FormValue<F> = {
  [_ in keyof F]-?: string;
};

export type FieldRule<F> = (
  fieldValue: string,
  fieldName: string,
  formValue: FormValue<F>
) => FieldError[];

export type FieldType<T> = (value: string) => T;

export type OptionalFieldConfig<T> = {
  when?: string | RegExp | ((value: string) => boolean);
  then?: T;
};

export type FieldConfig<F, P extends keyof F> = {
  type?: FieldType<F[P]>;
  optional?: boolean | OptionalFieldConfig<F[P]>;
  rules?: FieldRule<F>[];
  initial?: string;
  formatters?: FieldFormatter[];
};

export type FormConfig<F> = {
  [P in keyof F]-?: FieldConfig<F, P>;
};

export type FieldFormatter = (value: string) => string;
