import { useCallback } from "react";

export type SetState<S> = (state: S | ((oldState: S) => S)) => void;
export type Action<S, A, R> = (state: S, args: A) => [S, R];
export type Dispatch<S> = <A, R>(
  action: Action<S, A, R>,
  args: A
) => Promise<R>;

export const useAsyncReducer = <S>(setState: SetState<S>): Dispatch<S> => {
  return useCallback(
    <A, R>(action: Action<S, A, R>, args: A) =>
      new Promise<R>((resolve) => {
        setState((state) => {
          const [nextState, result] = action(state, args);
          setTimeout(() => {
            resolve(result);
          }, 0);
          return nextState;
        });
      }),
    [setState]
  );
};
