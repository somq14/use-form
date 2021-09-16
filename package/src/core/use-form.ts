import { useCallback, useState } from "react";

import { mapProperties } from "../utils";

import {
  FieldError,
  FieldHandle,
  FormConfig,
  FormError,
  FormHandle,
  FormValue,
} from "./external-types";
import { validateField, validateForm } from "./validation";
import { convertField, convertForm } from "./conversion";
import { convertFormConfig } from "./configuration";
import { formatField, formatForm } from "./format";

export type UseFormReturnType<F> = {
  form: FormHandle<F>;
  validated: () => F;
  validateAll: () => boolean;
};

export const useForm = <F>(config: FormConfig<F>): UseFormReturnType<F> => {
  const formConfig = convertFormConfig(config);

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
    mapProperties(formConfig, () => [])
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
      const fieldConfig = formConfig[key];

      const onChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
      > = (e) => updateFieldValue(key, e.target.value);

      const validate = () => {
        const formattedFormValue = formatForm(formValue, formConfig);
        const errors = validateField(
          formattedFormValue[key],
          key.toString(),
          formattedFormValue,
          fieldConfig
        );
        updateFieldValue(key, formattedFormValue[key]);
        updateFieldError(key, errors);
        return errors;
      };

      const onBlur: React.FocusEventHandler<
        HTMLInputElement | HTMLTextAreaElement
      > = () => {
        validate();
      };

      const validated = () => {
        const formattedFiledValue = formatField(value, fieldConfig);
        updateFieldValue(key, formattedFiledValue);
        return convertField(formattedFiledValue, fieldConfig);
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
    const formattedFormValue = formatForm(formValue, formConfig);
    setFormValue(formattedFormValue);
    return convertForm(formattedFormValue, formConfig);
  };

  const validateAll = () => {
    const formattedFormValue = formatForm(formValue, formConfig);
    const formError = validateForm(formattedFormValue, formConfig);
    setFormValue(formattedFormValue);
    setFormError(formError);
    return Object.values<FieldError[]>(formError).every(
      (errors) => errors.length === 0
    );
  };

  return { form: formHandle, validated, validateAll };
};

export const bindField = <T>(
  fieldHandle: FieldHandle<T>
): Pick<FieldHandle<T>, "value" | "onChange" | "onBlur"> => {
  const { value, onChange, onBlur } = fieldHandle;
  return {
    value,
    onChange,
    onBlur,
  };
};
