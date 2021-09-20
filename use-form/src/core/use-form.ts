import { useMemo, useState } from "react";

import { Dispatch, mapProperties, useAsyncReducer } from "../utils";

import {
  convertFieldAction,
  convertFormAction,
  formatFieldAction,
  formatFormAction,
  FormState,
  getFieldErrorsAction,
  getFieldValueAction,
  getFormErrorAction,
  getFormValueAction,
  initFormState,
  resetFieldAction,
  resetFormAction,
  setFieldErrorsAction,
  setFieldValueAction,
  setFormErrorAction,
  setFormValueAction,
  validateFieldAction,
  validateFormAction,
} from "./actions";
import { convertFormConfig } from "./configuration";
import { FieldError, FieldHandle, Form, FormConfig } from "./external-types";
import { InternalFieldConfig, InternalFormConfig } from "./internal-types";

type FieldMethods<F> = {
  [P in keyof F]-?: Omit<FieldHandle<F[P]>, "value" | "errors">;
};
type FormMethods<F> = Omit<Form<F>, "value" | "error" | "fields">;

export const buildMethods = <F>(
  config: FormConfig<F>,
  dispatch: Dispatch<FormState<F>>
): { fieldMethods: FieldMethods<F>; formMethods: FormMethods<F> } => {
  const formConfig = convertFormConfig(config);

  const fieldMethods: FieldMethods<F> = mapProperties<
    InternalFormConfig<F>,
    FieldMethods<F>
  >(
    formConfig,
    <P extends keyof F>(fieldConfig: InternalFieldConfig<F, P>, key: P) => {
      return {
        getValue: () => dispatch(getFieldValueAction, { key }),
        setValue: (value: string) =>
          dispatch(setFieldValueAction, { key, value }),

        getErrors: () => dispatch(getFieldErrorsAction, { key }),
        setErrors: (errors: FieldError[]) =>
          dispatch(setFieldErrorsAction, { key, errors }),

        format: () => dispatch(formatFieldAction, { key, formConfig }),
        validate: () => dispatch(validateFieldAction, { key, formConfig }),
        convert: () => dispatch(convertFieldAction, { key, formConfig }),
        reset: () => dispatch(resetFieldAction, { key, formConfig }),
      };
    }
  );

  const formMethods: FormMethods<F> = {
    getValue: () => dispatch(getFormValueAction, {}),
    setValue: (value) => dispatch(setFormValueAction, { value }),

    getError: () => dispatch(getFormErrorAction, {}),
    setError: (error) => dispatch(setFormErrorAction, { error }),

    format: () => dispatch(formatFormAction, { formConfig }),
    validate: () => dispatch(validateFormAction, { formConfig }),
    convert: () => dispatch(convertFormAction, { formConfig }),
    reset: () => dispatch(resetFormAction, { formConfig }),
  };

  return { formMethods, fieldMethods };
};

export const useForm = <F>(config: FormConfig<F>): Form<F> => {
  const [state, setState] = useState<FormState<F>>(() =>
    initFormState(convertFormConfig(config))
  );
  const dispatch = useAsyncReducer(setState);

  const methods = useMemo(() => buildMethods(config, dispatch), []);

  return useMemo(() => {
    return {
      fields: mapProperties(methods.fieldMethods, (methods, key) => {
        return {
          ...methods,
          value: state.value[key],
          errors: state.error[key],
        };
      }),
      ...methods.formMethods,
      value: state.value,
      error: state.error,
    };
  }, [methods, state]);
};
