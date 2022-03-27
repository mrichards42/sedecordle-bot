export type LetterScore = "missing" | "present" | "correct";

export const scoreWord = (word: string, target: string): LetterScore[] => {
  const wordLetters = word.split("");
  const targetLetters = target.split("");
  // first pass = correct letters
  const isCorrect = wordLetters.map(
    (letter, idx) => targetLetters[idx] === letter
  );
  // second pass = present letters
  const remainingLetters = targetLetters.filter((_, idx) => !isCorrect[idx]);
  return wordLetters.map((letter, idx) => {
    if (isCorrect[idx]) {
      return "correct";
    }
    const remainingIdx = remainingLetters.indexOf(letter);
    if (remainingIdx !== -1) {
      remainingLetters.splice(remainingIdx, 1);
      return "present";
    }
    return "missing";
  });
};
