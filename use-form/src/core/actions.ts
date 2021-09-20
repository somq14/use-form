import { mapProperties } from "../utils";

import { convertField, convertForm } from "./conversion";
import { FieldError, FormError, FormValue, SetAction } from "./external-types";
import { formatField, formatForm } from "./format";
import { InternalFormConfig } from "./internal-types";
import { validateField, validateForm } from "./validation";

export type FormState<F> = {
  value: FormValue<F>;
  error: FormError<F>;
};

export const initFormState = <F>(
  formConfig: InternalFormConfig<F>
): FormState<F> => {
  return {
    value: mapProperties(formConfig, (value) => value.initial || ""),
    error: mapProperties(formConfig, () => []),
  };
};

export const getFieldValueAction = <F>(
  state: FormState<F>,
  args: { key: keyof F }
): [FormState<F>, string] => {
  return [state, state.value[args.key]];
};

export const getFormValueAction = <F>(
  state: FormState<F>
): [FormState<F>, FormValue<F>] => {
  return [state, state.value];
};

export const setFieldValueAction = <F>(
  state: FormState<F>,
  args: { key: keyof F; value: string }
): [FormState<F>, void] => {
  return [
    { value: { ...state.value, [args.key]: args.value }, error: state.error },
    undefined,
  ];
};

export const setFormValueAction = <F>(
  state: FormState<F>,
  args: { value: SetAction<FormValue<F>> }
): [FormState<F>, void] => {
  return [
    {
      value:
        typeof args.value === "function" ? args.value(state.value) : args.value,
      error: state.error,
    },
    undefined,
  ];
};

export const getFieldErrorsAction = <F>(
  state: FormState<F>,
  args: { key: keyof F }
): [FormState<F>, FieldError[]] => {
  return [state, state.error[args.key]];
};

export const getFormErrorAction = <F>(
  state: FormState<F>
): [FormState<F>, FormError<F>] => {
  return [state, state.error];
};

export const setFieldErrorsAction = <F>(
  state: FormState<F>,
  args: { key: keyof F; errors: FieldError[] }
): [FormState<F>, void] => {
  return [
    { value: state.value, error: { ...state.error, [args.key]: args.errors } },
    undefined,
  ];
};

export const setFormErrorAction = <F>(
  state: FormState<F>,
  args: { error: SetAction<FormError<F>> }
): [FormState<F>, void] => {
  return [
    {
      value: state.value,
      error:
        typeof args.error === "function" ? args.error(state.error) : args.error,
    },
    undefined,
  ];
};

export const formatFieldAction = <F>(
  state: FormState<F>,
  args: { key: keyof F; formConfig: InternalFormConfig<F> }
): [FormState<F>, void] => {
  return [
    {
      value: {
        ...state.value,
        [args.key]: formatField(
          state.value[args.key],
          args.formConfig[args.key]
        ),
      },
      error: state.error,
    },
    undefined,
  ];
};

export const formatFormAction = <F>(
  state: FormState<F>,
  args: { formConfig: InternalFormConfig<F> }
): [FormState<F>, void] => {
  return [
    { value: formatForm(state.value, args.formConfig), error: state.error },
    undefined,
  ];
};

export const validateFieldAction = <F>(
  state: FormState<F>,
  args: { key: keyof F; formConfig: InternalFormConfig<F> }
): [FormState<F>, FieldError[]] => {
  const formatted = formatForm(state.value, args.formConfig);
  const errors = validateField(
    formatted[args.key],
    args.key.toString(),
    formatted,
    args.formConfig[args.key]
  );
  return [
    {
      value: { ...state.value, [args.key]: formatted[args.key] },
      error: { ...state.error, [args.key]: errors },
    },
    errors,
  ];
};

export const validateFormAction = <F>(
  state: FormState<F>,
  args: { formConfig: InternalFormConfig<F> }
): [FormState<F>, boolean] => {
  const formatted = formatForm(state.value, args.formConfig);
  const error = validateForm(formatted, args.formConfig);
  return [
    { value: formatted, error: error },
    Object.values<FieldError[]>(error).every((errors) => errors.length === 0),
  ];
};

export const convertFieldAction = <F, P extends keyof F>(
  state: FormState<F>,
  args: { key: P; formConfig: InternalFormConfig<F> }
): [FormState<F>, F[P]] => {
  const formatted = formatForm(state.value, args.formConfig);
  return [
    {
      value: { ...state.value, [args.key]: formatted[args.key] },
      error: state.error,
    },
    convertField(formatted[args.key], args.formConfig[args.key]),
  ];
};

export const convertFormAction = <F>(
  state: FormState<F>,
  args: { formConfig: InternalFormConfig<F> }
): [FormState<F>, F] => {
  const formatted = formatForm(state.value, args.formConfig);
  const convertedForm = convertForm(formatted, args.formConfig);
  return [
    {
      value: formatted,
      error: state.error,
    },
    convertedForm,
  ];
};

export const resetFieldAction = <F>(
  state: FormState<F>,
  args: { key: keyof F; formConfig: InternalFormConfig<F> }
): [FormState<F>, void] => {
  return [
    {
      value: { ...state.value, [args.key]: args.formConfig[args.key].initial },
      error: { ...state.error, [args.key]: [] },
    },
    undefined,
  ];
};

export const resetFormAction = <F>(
  state: FormState<F>,
  args: { formConfig: InternalFormConfig<F> }
): [FormState<F>, void] => {
  return [initFormState(args.formConfig), undefined];
};
