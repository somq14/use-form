export type Entry<T extends Record<string, unknown>> = [keyof T, T[keyof T]];

export const mapProperties = <
  T extends Record<string, unknown>,
  U extends { [_ in keyof T]: unknown }
>(
  obj: T,
  callback: <P extends keyof T>(value: T[P], key: P, obj: T) => U[P]
): U => {
  // NOTE: 過剰プロパティがあるときに危険
  const keys = Object.keys(obj) as (keyof T)[];

  const res: Partial<U> = {};
  for (const key of keys) {
    res[key] = callback(obj[key], key, obj);
  }

  return res as U;
};

export const toEntries = <T extends Record<string, unknown>>(
  obj: T
): Entry<T>[] => {
  const entries = Object.entries(obj);
  return entries as Entry<T>[];
};
