import React from "react";

import { FormModel } from "./model";
import { FieldError } from "./rule";

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
