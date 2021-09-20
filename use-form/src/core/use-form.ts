import { useState } from "react";

import { mapProperties, useAsyncReducer } from "../utils";

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
import { FieldHandle, Form, FormConfig, FormHandle } from "./external-types";
import { InternalFieldConfig, InternalFormConfig } from "./internal-types";

export const useForm = <F>(config: FormConfig<F>): Form<F> => {
  const formConfig = convertFormConfig(config);

  const [currentState, setState] = useState<FormState<F>>(() =>
    initFormState(formConfig)
  );
  const dispatch = useAsyncReducer(setState);

  const formHandle = mapProperties<InternalFormConfig<F>, FormHandle<F>>(
    formConfig,
    <P extends keyof F>(
      fieldConfig: InternalFieldConfig<F, P>,
      key: P
    ): FieldHandle<F[P]> => {
      return {
        value: currentState.value[key],
        getValue: () => dispatch(getFieldValueAction, { key }),
        setValue: (value) => dispatch(setFieldValueAction, { key, value }),

        errors: currentState.error[key],
        getErrors: () => dispatch(getFieldErrorsAction, { key }),
        setErrors: (errors) => dispatch(setFieldErrorsAction, { key, errors }),

        format: () => dispatch(formatFieldAction, { key, formConfig }),
        validate: () => dispatch(validateFieldAction, { key, formConfig }),
        convert: () => dispatch(convertFieldAction, { key, formConfig }),
        reset: () => dispatch(resetFieldAction, { key, formConfig }),
      };
    }
  );

  return {
    fields: formHandle,

    value: currentState.value,
    getValue: () => dispatch(getFormValueAction, {}),
    setValue: (value) => dispatch(setFormValueAction, { value }),

    error: currentState.error,
    getError: () => dispatch(getFormErrorAction, {}),
    setError: (error) => dispatch(setFormErrorAction, { error }),

    format: () => dispatch(formatFormAction, { formConfig }),
    validate: () => dispatch(validateFormAction, { formConfig }),
    convert: () => dispatch(convertFormAction, { formConfig }),
    reset: () => dispatch(resetFormAction, { formConfig }),
  };
};
