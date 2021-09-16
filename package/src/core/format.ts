import { mapProperties } from "../utils";

import { InternalFieldConfig, InternalFormConfig } from "./internal-types";
import { FormValue } from "./external-types";

export const formatField = <F, P extends keyof F>(
  fieldValue: string,
  fieldConfig: InternalFieldConfig<F, P>
): string => {
  let res = fieldValue;
  for (const f of fieldConfig.formatters) {
    res = f(res);
  }
  return res;
};

export const formatForm = <F>(
  formValue: FormValue<F>,
  formConfig: InternalFormConfig<F>
): FormValue<F> => {
  return mapProperties(formValue, (value, key) => {
    const fieldConfig = formConfig[key];
    return formatField(value, fieldConfig);
  });
};
