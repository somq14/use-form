import { FormModel } from "./model";

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
