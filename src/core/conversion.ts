import { mapProperties } from "../utils";

import { InternalFieldConfig, InternalFormConfig } from "./internal-types";
import { FormModel } from "./external-types";

export const convertField = <F extends FormModel, P extends keyof F>(
  fieldValue: string,
  fieldConfig: InternalFieldConfig<F, P>
): F[P] => {
  if (fieldConfig.optional.when(fieldValue)) {
    return fieldConfig.optional.then;
  }
  return fieldConfig.type(fieldValue);
};

export const convertForm = <F extends FormModel>(
  formValue: Record<keyof F, string>,
  formConfig: InternalFormConfig<F>
): F => {
  return mapProperties(
    formValue,
    <P extends keyof F>(value: string, key: P): F[P] => {
      const fieldConfig = formConfig[key];
      return convertField(value, fieldConfig);
    }
  );
};
