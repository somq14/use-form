import { useCallback } from "react";

export type SetState<S> = (state: S | ((oldState: S) => S)) => void;
export type SetStateAsync<S> = <T>(
  callback: (state: S) => [S, T]
) => Promise<T>;

export const useSetStateAsync = <S>(
  setState: SetState<S>
): SetStateAsync<S> => {
  const setStateAsync: SetStateAsync<S> = (callback) =>
    new Promise((resolve) => {
      setState((state) => {
        const [nextState, promiseValue] = callback(state);
        setTimeout(() => {
          resolve(promiseValue);
        }, 0);
        return nextState;
      });
    });
  return useCallback(setStateAsync, []);
};
