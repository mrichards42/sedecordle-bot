import React from "react";
import { Game, possibleWords, possibleRealWords } from "../game";

export interface Props {
  game: Game;
  level: number;
}

const WordleHints = React.memo(({ game, level }: Props) => {
  const wordList = level === 1 ? possibleWords(game) : possibleRealWords(game);
  return (
    <div>
      <div>
        {level === 1
          ? `${wordList.length} possible`
          : `${wordList.length} real`}
      </div>
      <div>{wordList.length < 5 && wordList.join(", ")}</div>
    </div>
  );
});

export default WordleHints;
