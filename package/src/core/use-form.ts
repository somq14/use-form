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
import { validateField } from "./validation";
import { convertField, convertForm } from "./conversion";
import { convertFormConfig } from "./configuration";

export type UseFormReturnType<F> = {
  form: FormHandle<F>;
  validated: () => F;
  validateAll: () => boolean;
};

export const useForm = <F>(config: FormConfig<F>): UseFormReturnType<F> => {
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
    let hasError = false;
    mapProperties(formHandle, (value) => {
      if (value.validate().length > 0) {
        hasError = true;
      }
    });
    return !hasError;
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
