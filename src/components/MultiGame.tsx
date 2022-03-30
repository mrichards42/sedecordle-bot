import classNames from "classnames";
import { useReducer } from "react";
import { addGuess, Game, isValidGuess, randGame } from "../game";
import useKeyboardInput from "../hooks/useKeyboardInput";
import useWordleInput from "../hooks/useWordleInput";
import { randGen } from "../util";
import Keyboard from "./Keyboard";
import Wordle, { Props as WordleProps } from "./Wordle";
import WordleHints from "./WordleHints";

export type GameAction = { type: "restart" } | { type: "input"; value: string };

type NewGames = (args: { count: number; seed?: number }) => Game[];

const newGames: NewGames = ({ count, seed }) => {
  const rand = randGen(seed);
  return Array.from({ length: count }).map(() => randGame({ rand }));
};

const gamesReducer = (games: Game[], action: GameAction) => {
  switch (action.type) {
    case "restart":
      return newGames({ count: games.length });
    case "input":
      return games.map((game) => addGuess(game, action.value));
    default:
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }
};

export interface Props {
  count: number;
  hintLevel?: number;
  seed?: number;
  size?: WordleProps["size"];
}

const MultiGame = ({ count, seed, size = "md", hintLevel = 0 }: Props) => {
  const [games, gamesDispatch] = useReducer(gamesReducer, count, (count) =>
    newGames({ count, seed })
  );

  const [input, inputDispatch] = useWordleInput({
    isValidGuess,
    onSubmit(input) {
      gamesDispatch({ type: "input", value: input });
    },
  });
  useKeyboardInput(inputDispatch);

  const guessedLetters = games
    .flatMap((g) => g.guesses)
    .join("")
    .split("")
    .sort();

  return (
    <>
      <div
        className={classNames(
          "flex flex-wrap justify-center",
          "shrink grow overflow-auto",
          {
            "gap-3": size === "xs",
            "gap-4": size === "sm",
            "gap-6": size === "md",
            "gap-8": size === "lg",
          }
        )}
      >
        {games.map((game, idx) => (
          <div key={idx}>
            {hintLevel > 0 && !game.isWon && (
              <WordleHints game={game} level={hintLevel} />
            )}
            <Wordle game={game} input={input} size={size} />
          </div>
        ))}
      </div>
      <Keyboard dispatch={inputDispatch} guessedLetters={guessedLetters} />
    </>
  );
};

export default MultiGame;
