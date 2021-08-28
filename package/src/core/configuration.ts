import { mapProperties, exhaustiveSwitchCase } from "../utils";

import {
  InternalFieldConfig,
  InternalFormConfig,
  InternalOptionalFieldConfig,
} from "./internal-types";
import {
  FieldConfig,
  FieldType,
  FormConfig,
  OptionalFieldConfig,
} from "./external-types";

export const convertOptionalWhenConfig = (
  when?: string | RegExp | ((value: string) => boolean)
): ((value: string) => boolean) => {
  switch (typeof when) {
    case "undefined":
      return () => false;
    case "string":
      return (value: string) => value === when;
    case "object":
      return (value: string) => when.test(value);
    case "function":
      return when;
    default:
      throw exhaustiveSwitchCase(when);
  }
};

export const convertOptionalConfig = <T>(
  config?: boolean | OptionalFieldConfig<T>
): InternalOptionalFieldConfig<T> => {
  // FIXME: dangerous
  const defaultOptionalValue = undefined as unknown as T;

  if (config === undefined || config === false) {
    return {
      when: () => false,
      then: defaultOptionalValue,
    };
  }

  if (config === true) {
    return {
      when: (value) => value.trim() === "",
      then: defaultOptionalValue,
    };
  }

  return {
    when: convertOptionalWhenConfig(config.when),
    then: config.then ?? defaultOptionalValue,
  };
};

const convertTypeConfig = <T>(type?: FieldType<T>): FieldType<T> => {
  if (type === undefined) {
    // FIXME: dangerous
    return ((value: string) => value) as unknown as FieldType<T>;
  }
  return type;
};

export const convertFieldConfig = <F, P extends keyof F>(
  config: FieldConfig<F, P>
): InternalFieldConfig<F, P> => {
  const type = convertTypeConfig(config.type);
  const optional = convertOptionalConfig(config.optional);
  const rules = config.rules ?? [];
  const initial = config.initial || "";
  return { type, optional, rules, initial };
};

export const convertFormConfig = <F>(
  config: FormConfig<F>
): InternalFormConfig<F> => {
  return mapProperties<FormConfig<F>, InternalFormConfig<F>>(
    config,
    <P extends keyof F>(value: FieldConfig<F, P>): InternalFieldConfig<F, P> =>
      convertFieldConfig(value)
  );
};
