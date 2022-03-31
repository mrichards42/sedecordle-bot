import { randGen, randElement, Rand } from "../util";
import words from "../words.json"; // from Norvig
import realWordsArray from "../realWords.json"; // from sedecordle
export { default as realWordsArray } from "../realWords.json";

export const allWords = new Set([...words, ...realWordsArray]);
export const realWords = new Set(realWordsArray);
export const allWordsArray = [...allWords];

export type LetterScore = "missing" | "present" | "correct";
export type WordScore = LetterScore[];

export const scoreWord = (word: string, target: string): WordScore => {
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

const matchesPattern = (word: string, guess: string, score: WordScore) =>
  scoreWord(guess, word).every((x, i) => x === score[i]);

export const possibleWords = (
  game: Game,
  wordList = allWordsArray
): string[] => {
  return wordList.filter((word) =>
    game.scores.every((score, idx) =>
      matchesPattern(word, game.guesses[idx], score)
    )
  );
};

export const possibleRealWords = (game: Game): string[] =>
  possibleWords(game, realWordsArray);

export const isValidGuess = (guess: string) => allWords.has(guess);

export const randWord = (rand: Rand): string =>
  randElement(rand, realWordsArray);

export interface Game {
  target: string;
  guesses: string[];
  scores: WordScore[];
  isWon: boolean;
}

type RandGame = (args?: { seed?: number; rand?: Rand }) => Game;

export const randGame: RandGame = ({ seed, rand: rand_ } = {}) => {
  const rand = rand_ ?? randGen(seed);
  return {
    target: randWord(rand),
    guesses: [],
    scores: [],
    isWon: false,
  };
};

export const addGuess = (game: Game, word: string): Game => {
  if (game.isWon) {
    return game;
  } else {
    return {
      ...game,
      guesses: [...game.guesses, word],
      scores: [...game.scores, scoreWord(word, game.target)],
      isWon: game.target === word,
    };
  }
};
