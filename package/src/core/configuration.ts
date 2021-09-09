import { mapProperties, exhaustiveSwitchCase } from "../utils";
import { StringType } from "../types/string.type";

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
  when?: boolean | string | RegExp | ((value: string) => boolean)
): ((value: string) => boolean) => {
  switch (typeof when) {
    case "boolean":
      return when ? (value) => value === "" : () => false;
    case "undefined":
      return () => false;
    case "string":
      return (value: string) => value === when;
    case "object":
      return (value: string) => when.test(value);
    case "function":
      return when;
    /* istanbul ignore next */
    default:
      throw exhaustiveSwitchCase(when);
  }
};

export const convertOptionalConfig = <T>(
  config?: boolean | OptionalFieldConfig<T>
): InternalOptionalFieldConfig<T> => {
  // FIXME: dangerous
  const defaultOptionalValue = undefined as unknown as T;

  return {
    when: convertOptionalWhenConfig(
      typeof config === "object" ? config.when : config
    ),
    then:
      typeof config === "object" && config.then !== undefined
        ? config.then
        : defaultOptionalValue,
  };
};

export const convertTypeConfig = <T>(type?: FieldType<T>): FieldType<T> => {
  // FIXME: dangerous
  const defaultType = StringType as unknown as FieldType<T>;
  return type ?? defaultType;
};

export const convertFieldConfig = <F, P extends keyof F>(
  config: FieldConfig<F, P>
): InternalFieldConfig<F, P> => {
  const type = convertTypeConfig(config.type);
  const optional = convertOptionalConfig(config.optional);
  const rules = config.rules ?? [];
  const initial = config.initial || "";
  const formatters = config.formatters ?? [];
  return { type, optional, rules, initial, formatters };
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
