import { WordScore } from "../game";
import WordleLetter, { Props as WordleLetterProps } from "./WordleLetter";

export interface Props {
  word: string;
  score?: WordScore;
  size?: WordleLetterProps["size"];
  status?: WordleLetterProps["status"];
}

const WordleWord = ({ word, score, size, status }: Props) => (
  <div>
    {word.split("").map((letter, idx) => (
      <WordleLetter
        key={idx}
        letter={letter}
        status={status ?? (score ? score[idx] : "unknown")}
        size={size}
      />
    ))}
  </div>
);

export default WordleWord;
