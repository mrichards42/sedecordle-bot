import { scoreWord } from "../game";
import Letter, { Props as LetterProps } from "./Letter";

export interface Props {
  word: string;
  target?: string;
  size?: LetterProps["size"];
}

const Word = ({ word, target, size }: Props) => {
  const score = target ? scoreWord(word, target) : null;
  return (
    <div>
      {word.split("").map((letter, idx) => (
        <Letter
          key={idx}
          letter={letter}
          status={score ? score[idx] : "unknown"}
          size={size}
        />
      ))}
    </div>
  );
};

export default Word;
