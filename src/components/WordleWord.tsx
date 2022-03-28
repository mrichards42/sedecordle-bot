import { scoreWord } from "../game";
import WordleLetter, { Props as WordleLetterProps } from "./WordleLetter";

export interface Props {
  word: string;
  target?: string;
  size?: WordleLetterProps["size"];
  status?: WordleLetterProps["status"];
}

const WordleWord = ({ word, target, size, status }: Props) => {
  const score = target ? scoreWord(word, target) : null;
  return (
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
};

export default WordleWord;
