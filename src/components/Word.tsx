import Letter, { Props as LetterProps } from "./Letter";
export interface Props {
  word: string;
  size?: LetterProps["size"];
}

const Word = ({ word, size }: Props) => (
  <div>
    {word.split("").map((letter, idx) => (
      <Letter key={idx} letter={letter} size={size} />
    ))}
  </div>
);

export default Word;
