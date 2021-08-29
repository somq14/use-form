import { FieldError, FormValue } from "./external-types";
import { InternalFieldConfig } from "./internal-types";

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
