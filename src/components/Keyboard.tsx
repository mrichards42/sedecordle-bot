import classNames from "classnames";
import React from "react";
import { KeyboardDispatch } from "../hooks/useKeyboardInput";
import Letter from "./Letter";

type KeyProps = {
  letter: string;
  seen?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
};

const Key = ({ letter, seen = false, className, onClick }: KeyProps) => {
  const classes = classNames("m-1 rounded", "shrink", "h-10", className, {
    "w-8": !className?.match(/\bw-/),
    "bg-gray-500": seen,
    border: !seen,
  });
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        <Letter letter={letter} />
      </button>
    );
  } else {
    return <Letter letter={letter} className={classes} />;
  }
};

export interface Props {
  guessedLetters?: string[];
  dispatch: KeyboardDispatch;
}

const Keyboard = ({ guessedLetters, dispatch }: Props) => {
  const guessed = new Set(guessedLetters || []);
  return (
    <div>
      <div className="flex justify-center max-w-full">
        {"qwertyuiop".split("").map((letter, idx) => (
          <Key
            key={idx}
            letter={letter}
            seen={guessed.has(letter)}
            onClick={() => dispatch({ type: "letter", letter })}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {"asdfghjkl".split("").map((letter, idx) => (
          <Key
            key={idx}
            letter={letter}
            seen={guessed.has(letter)}
            onClick={() => dispatch({ type: "letter", letter })}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key
          letter="⌫"
          onClick={() => dispatch({ type: "delete" })}
          className="w-12"
        />
        {"zxcvbnm".split("").map((letter, idx) => (
          <Key
            key={idx}
            letter={letter}
            seen={guessed.has(letter)}
            onClick={dispatch && (() => dispatch({ type: "letter", letter }))}
          />
        ))}
        <Key
          letter="⏎"
          onClick={() => dispatch({ type: "enter" })}
          className="w-12 text-lg"
        />
      </div>
    </div>
  );
};

export default Keyboard;
