import { useCallback, useEffect } from "react";

export type KeyboardAction =
  | { type: "letter"; letter: string }
  | { type: "delete" }
  | { type: "enter" };

export type KeyboardDispatch = (action: KeyboardAction) => void;

const useKeyboardInput = (dispatch: KeyboardDispatch) => {
  const listener = useCallback(
    (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) {
        return;
      }
      if (e.key === "Enter") {
        dispatch({ type: "enter" });
      } else if (e.key === "Delete" || e.key === "Backspace") {
        dispatch({ type: "delete" });
      } else {
        const letter = e.key.toLowerCase();
        if (letter.length === 1 && letter >= "a" && letter <= "z") {
          dispatch({ type: "letter", letter });
        }
      }
    },
    [dispatch]
  );
  useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [listener]);
};

export default useKeyboardInput;
