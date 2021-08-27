import { toEntries } from "../utils";

import { FieldError, FormValue } from "./external-types";
import { InternalFieldConfig, InternalFormConfig } from "./internal-types";

export const validateField = <F, P extends keyof F>(
  fieldValue: string,
  fieldName: string,
  formValue: FormValue<F>,
  fieldConfig: InternalFieldConfig<F, P>
): FieldError[] => {
  if (fieldConfig.optional.when(fieldValue)) {
    return [];
  }
  const errors = fieldConfig.rules.flatMap((rule) =>
    rule(fieldValue, fieldName, formValue)
  );
  return errors;
};

export const validateForm = <F>(
  formValue: FormValue<F>,
  formConfig: InternalFormConfig<F>
): FieldError[] => {
  return toEntries(formValue).flatMap(([key, value]) => {
    const fieldConfig = formConfig[key];
    return validateField(value, key.toString(), formValue, fieldConfig);
  });
};
