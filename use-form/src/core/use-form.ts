import { useState } from "react";

import { mapProperties, useSetStateAsync } from "../utils";

import { convertFormConfig } from "./configuration";
import { convertField, convertForm } from "./conversion";
import {
  FieldError,
  FieldHandle,
  FormConfig,
  FormError,
  FormHandle,
  FormValue,
} from "./external-types";
import { formatForm } from "./format";
import { InternalFieldConfig, InternalFormConfig } from "./internal-types";
import { validateField, validateForm } from "./validation";

export type UseFormReturnType<F> = {
  form: FormHandle<F>;
  validated: () => Promise<F>;
  validateAll: () => Promise<boolean>;
};

export type UseFormState<F> = {
  value: FormValue<F>;
  error: FormError<F>;
};

export const useForm = <F>(config: FormConfig<F>): UseFormReturnType<F> => {
  const formConfig = convertFormConfig(config);

  const [currentState, setState] = useState<UseFormState<F>>(() => ({
    error: mapProperties(formConfig, () => []),
    value: mapProperties(formConfig, (value) => value.initial || ""),
  }));
  const setStateAsync = useSetStateAsync(setState);

  const formHandle = mapProperties<InternalFormConfig<F>, FormHandle<F>>(
    formConfig,
    <P extends keyof F>(
      fieldConfig: InternalFieldConfig<F, P>,
      key: P
    ): FieldHandle<F[P]> => {
      return {
        value: currentState.value[key],
        errors: currentState.error[key],
        setValue: (value: string) => {
          setState((state) => {
            return {
              value: { ...state.value, [key]: value },
              error: state.error,
            };
          });
        },
        setErrors: (errors: FieldError[]) => {
          setState((state) => {
            return {
              value: state.value,
              error: { ...state.error, [key]: errors },
            };
          });
        },
        validate: () =>
          setStateAsync((state) => {
            const formatted = formatForm(state.value, formConfig);
            const errors = validateField(
              formatted[key],
              key.toString(),
              formatted,
              fieldConfig
            );
            return [
              {
                value: { ...state.value, [key]: formatted[key] },
                error: { ...state.error, [key]: errors },
              },
              errors,
            ];
          }),
        validated: () =>
          setStateAsync((state) => {
            const formatted = formatForm(state.value, formConfig);
            return [
              {
                value: { ...state.value, [key]: formatted[key] },
                error: state.error,
              },
              convertField(formatted[key], fieldConfig),
            ];
          }),
      };
    }
  );

  return {
    form: formHandle,
    validateAll: () =>
      setStateAsync((state) => {
        const formatted = formatForm(state.value, formConfig);
        const error = validateForm(formatted, formConfig);
        return [
          {
            value: formatted,
            error: error,
          },
          Object.values<FieldError[]>(error).every(
            (errors) => errors.length === 0
          ),
        ];
      }),
    validated: () =>
      setStateAsync((state) => {
        const formatted = formatForm(state.value, formConfig);
        const convertedForm = convertForm(formatted, formConfig);
        return [
          {
            value: formatted,
            error: state.error,
          },
          convertedForm,
        ];
      }),
  };
};
