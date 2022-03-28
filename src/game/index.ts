import { randInt } from "../util";
import words from "../words.json"; // from Norvig
import realWords from "../realWords.json"; // from sedecordle

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

export const allWords = new Set([...words, ...realWords]);

export const isValidGuess = (guess: string) => allWords.has(guess);

export const randWord = (): string => realWords[randInt(realWords.length)];

export interface Game {
  target: string;
  guesses: string[];
  isWon: boolean;
}

export const randGame = (): Game => ({
  target: randWord(),
  guesses: [],
  isWon: false,
});

export const addGuess = (game: Game, word: string): Game => {
  if (game.isWon) {
    return game;
  } else {
    return {
      ...game,
      guesses: [...game.guesses, word],
      isWon: game.target === word,
    };
  }
};
