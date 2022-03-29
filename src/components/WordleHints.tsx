import React from "react";
import { Game, possibleWords, realWords } from "../game";

export interface Props {
  game: Game;
  level: number;
}

const WordleHints = React.memo(({ game, level }: Props) => {
  const words1 = possibleWords(game);
  const words2 = words1.filter((w) => realWords.has(w));
  const wordList = level === 1 ? words1 : words2;
  return (
    <div>
      <div>
        {words1.length} possible
        {level > 1 && ` / ${words2.length} real`}
      </div>
      <div>{wordList.length < 5 && wordList.join(", ")}</div>
    </div>
  );
});

export default WordleHints;
