export type SetAction<T> = T | ((prev: T) => T);

export type Form<F> = {
  fields: FormHandle<F>;

  value: FormValue<F>;
  getValue: () => Promise<FormValue<F>>;
  setValue: (value: SetAction<FormValue<F>>) => void;

  error: FormError<F>;
  getError: () => Promise<FormError<F>>;
  setError: (errors: SetAction<FormError<F>>) => void;

  format: () => void;
  validate: () => Promise<boolean>;
  convert: () => Promise<F>;
  reset: () => void;
};

export type FieldHandle<T> = {
  value: string;
  getValue: () => Promise<string>;
  setValue: (value: string) => void;

  errors: FieldError[];
  getErrors: () => Promise<FieldError[]>;
  setErrors: (errors: FieldError[]) => void;

  format: () => void;
  validate: () => Promise<FieldError[]>;
  convert: () => Promise<T>;
  reset: () => void;
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
  type: FieldType<F[P]>;
  optional?: boolean | OptionalFieldConfig<F[P]>;
  rules?: FieldRule<F>[];
  initial?: string;
  formatters?: FieldFormatter[];
};

export type FormConfig<F> = {
  [P in keyof F]-?: FieldConfig<F, P>;
};

export type FieldFormatter = (value: string) => string;
