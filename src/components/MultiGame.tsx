import classNames from "classnames";
import { useReducer, useState } from "react";
import { addGuess, Game, isValidGuess, randGame } from "../game";
import useKeyboardInput from "../hooks/useKeyboardInput";
import useWordleInput from "../hooks/useWordleInput";
import Keyboard from "./Keyboard";
import Wordle, { Props as WordleProps } from "./Wordle";

export interface Props {
  count?: number;
  size?: WordleProps["size"];
}

export type GameAction = { type: "restart" } | { type: "input"; value: string };

const newGames = (count: number): Game[] =>
  Array.from({ length: count }).map(() => randGame());

const gamesReducer = (games: Game[], action: GameAction) => {
  switch (action.type) {
    case "restart":
      return newGames(games.length);
    case "input":
      return games.map((game) => addGuess(game, action.value));
    default:
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }
};

const FlatButton = ({ className, ...props }: any) => (
  <button
    className={classNames("p-2 border border-current", className)}
    type="button"
    {...props}
  />
);

const MultiGame = ({ count = 1, size }: Props) => {
  const [realSize, setSize] = useState(
    size ?? (count === 1 ? "lg" : count < 8 ? "md" : count < 16 ? "sm" : "xs")
  );

  const [games, gamesDispatch] = useReducer(gamesReducer, count, newGames);
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
    <div className="flex flex-col h-full">
      <div>
        <FlatButton onClick={() => gamesDispatch({ type: "restart" })}>
          New
        </FlatButton>
        <FlatButton onClick={() => setSize("xs")}>xs</FlatButton>
        <FlatButton onClick={() => setSize("sm")}>sm</FlatButton>
        <FlatButton onClick={() => setSize("md")}>md</FlatButton>
        <FlatButton onClick={() => setSize("lg")}>lg</FlatButton>
      </div>
      <div
        className={classNames(
          "flex flex-wrap justify-center",
          "shrink grow overflow-auto",
          {
            "gap-3": realSize === "xs",
            "gap-4": realSize === "sm",
            "gap-6": realSize === "md",
            "gap-8": realSize === "lg",
          }
        )}
      >
        {games.map(({ target, guesses, isWon }, idx) => (
          <Wordle
            key={idx}
            target={target}
            guesses={guesses}
            input={isWon ? undefined : input}
            size={realSize}
          />
        ))}
      </div>
      <Keyboard dispatch={inputDispatch} guessedLetters={guessedLetters} />
    </div>
  );
};

export default MultiGame;
