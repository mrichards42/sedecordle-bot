import React from "react";
import { isValidGuess } from "../game";
import WordleWord, { Props as WordleWordProps } from "./WordleWord";

export interface Props {
  size?: WordleWordProps["size"];
  target: string;
  input?: string;
  guesses: string[];
}

type GuessListProps = Omit<Props, "input">;

const GuessList = React.memo(({ guesses, target, size }: GuessListProps) => (
  <>
    {guesses.map((word, idx) => (
      <WordleWord key={idx} word={word} target={target} size={size} />
    ))}
  </>
));

const isInvalid = (input: string) => input.length === 5 && !isValidGuess(input);

type InputWordProps = {
  input: string;
  size?: Props["size"];
};

const InputWord = ({ input, size }: InputWordProps) => (
  <WordleWord
    word={input.padEnd(5, " ")}
    size={size}
    status={isInvalid(input) ? "invalid" : "unknown"}
  />
);

const Wordle = ({ input, guesses, target, size = "md" }: Props) => {
  return (
    <div>
      <GuessList guesses={guesses} target={target} size={size} />
      {input != null && <InputWord input={input} size={size} />}
    </div>
  );
};

export default Wordle;
