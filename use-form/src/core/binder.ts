import { ChangeEventHandler, FocusEventHandler } from "react";

import { FieldHandle } from "./external-types";

export const bindTextField = <T>(
  fieldHandle: FieldHandle<T>
): {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
} => {
  return {
    value: fieldHandle.value,
    onChange: (e) => fieldHandle.setValue(e.target.value),
    onBlur: () => fieldHandle.validate(),
  };
};

export const bindTextArea = <T>(
  fieldHandle: FieldHandle<T>
): {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
} => {
  return {
    value: fieldHandle.value,
    onChange: (e) => fieldHandle.setValue(e.target.value),
    onBlur: () => fieldHandle.validate(),
  };
};

export const bindCheckbox = <T>(
  fieldHandle: FieldHandle<T>
): {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
} => {
  return {
    checked: fieldHandle.value === "true",
    onChange: (e) => fieldHandle.setValue(e.target.checked ? "true" : "false"),
    onBlur: () => fieldHandle.validate(),
  };
};

export const bindRadio = <T>(
  fieldHandle: FieldHandle<T>,
  value: string
): {
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
} => {
  return {
    value,
    checked: value === fieldHandle.value,
    onChange: (e) => fieldHandle.setValue(e.target.value),
    onBlur: () => fieldHandle.validate(),
  };
};

export const bindSelect = <T>(
  fieldHandle: FieldHandle<T>
): {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  onBlur: FocusEventHandler<HTMLSelectElement>;
} => {
  return {
    value: fieldHandle.value,
    onChange: (e) => fieldHandle.setValue(e.target.value),
    onBlur: () => fieldHandle.validate(),
  };
};
