import React from "react";
import { Game, isValidGuess } from "../game";
import { Size } from "./WordleLetter";
import WordleWord from "./WordleWord";

export interface Props {
  size?: Size;
  game: Game;
  input?: string;
}

type GuessListProps = Omit<Props, "input">;

const GuessList = React.memo(({ game, size }: GuessListProps) => (
  <>
    {game.guesses.map((word, idx) => (
      <WordleWord key={idx} word={word} score={game.scores[idx]} size={size} />
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

const Wordle = ({ input, game, size = "md" }: Props) => {
  return (
    <div>
      <GuessList game={game} size={size} />
      {!game.isWon && input != null && <InputWord input={input} size={size} />}
    </div>
  );
};

export default Wordle;
