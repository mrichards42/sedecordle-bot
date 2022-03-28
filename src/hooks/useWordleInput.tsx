import { useReducer } from "react";
import { KeyboardAction } from "./useKeyboardInput";

export interface InputState {
  input: string;
  guesses: string[];
  lastGuess?: string;
}

export type InputAction = KeyboardAction | { type: "reset" };

export interface Props {
  onSubmit: (input: string) => void;
  isValidGuess: (input: string) => boolean;
}

const transformInput = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z]+/, "")
    .slice(0, 5);

const useWordleInput = ({ onSubmit, isValidGuess }: Props) => {
  const inputReducer = (input: string, action: InputAction) => {
    switch (action.type) {
      case "letter":
        return transformInput(input + action.letter);
      case "delete":
        return input.slice(0, -1);
      case "enter":
        if (isValidGuess(input)) {
          onSubmit(input);
          return "";
        } else {
          return input;
        }
      case "reset":
        return "";
      default:
        const _exhaustiveCheck: never = action;
        return _exhaustiveCheck;
    }
  };

  return useReducer(inputReducer, "");
};

export default useWordleInput;
