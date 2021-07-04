import { useCallback, useState } from "react";

import {
  convertField,
  convertForm,
  convertFormConfig,
  validateField,
  validateForm,
} from "./core";
import {
  FieldError,
  FieldHandle,
  FormConfig,
  FormError,
  FormHandle,
  FormModel,
  FormValue,
} from "./types";
import { mapProperties } from "./utils";

export const useForm = <F extends FormModel>(
  config: FormConfig<F>
): {
  form: FormHandle<F>;
  validated: () => F;
  validateAll: () => FieldError[];
} => {
  const internalConfig = convertFormConfig(config);

  const [formValue, setFormValue] = useState<FormValue<F>>(() =>
    mapProperties(config, (value) => value.initial || "")
  );
  const updateFieldValue = useCallback((key: keyof F, value: string): void => {
    setFormValue((oldState) => ({
      ...oldState,
      [key]: value,
    }));
  }, []);

  const [formError, setFormError] = useState<FormError<F>>(() =>
    mapProperties(internalConfig, () => [])
  );
  const updateFieldError = useCallback((key: keyof F, errors: FieldError[]) => {
    setFormError((oldState) => ({
      ...oldState,
      [key]: errors,
    }));
  }, []);

  const formHandle = mapProperties<FormValue<F>, FormHandle<F>>(
    formValue,
    <P extends keyof F>(value: string, key: P): FieldHandle<F[P]> => {
      const fieldConfig = internalConfig[key];

      const onChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
      > = (e) => updateFieldValue(key, e.target.value);

      const onBlur: React.FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement
      > = () => {
        const errors = validateField(
          value,
          key.toString(),
          formValue,
          fieldConfig
        );
        updateFieldError(key, errors);
      };

      const validate = () => {
        const errors = validateField(
          value,
          key.toString(),
          formValue,
          fieldConfig
        );
        updateFieldError(key, errors);
        return errors;
      };

      const validated = () => {
        return convertField(value, fieldConfig);
      };

      return {
        value,
        errors: formError[key],
        setValue: (value: string) => updateFieldValue(key, value),
        setErrors: (errors: FieldError[]) => updateFieldError(key, errors),
        onChange,
        onBlur,
        validate,
        validated,
      };
    }
  );

  const validated = () => {
    return convertForm(formValue, internalConfig);
  };

  const validateAll = () => {
    return validateForm(formValue, internalConfig);
  };

  return { form: formHandle, validated, validateAll };
};
