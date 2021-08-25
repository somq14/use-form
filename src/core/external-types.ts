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

export type FieldHandle<T> = {
  value: string;
  setValue: (value: string) => void;
  errors: FieldError[];
  setErrors: (errors: FieldError[]) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  validate: () => FieldError[];
  validated: () => T;
};

export type FormHandle<F extends FormModel> = {
  [P in keyof F]-?: FieldHandle<F[P]>;
};

export type FormModel = { [fieldName: string]: unknown };

export type FieldError = {
  name: string;
  value: string;
  ruleName: string;
  message: string;
};

export type FormValue<F extends FormModel> = {
  [_ in keyof F]-?: string;
};

export type FieldRule<F extends FormModel> = (
  fieldValue: string,
  fieldName: string,
  formValue: FormValue<F>
) => FieldError[];

export type FormError<F extends FormModel> = {
  [_ in keyof F]-?: FieldError[];
};

export type FieldType<T> = (value: string) => T;
