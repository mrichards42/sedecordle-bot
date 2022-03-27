import { scoreWord } from ".";
import testData from "./test-data.json";

test("scoreWord handles exact matches", () => {
  expect(scoreWord("abcde", "abcde")).toEqual([
    "correct",
    "correct",
    "correct",
    "correct",
    "correct",
  ]);

  expect(scoreWord("aaaaa", "aaaaa")).toEqual([
    "correct",
    "correct",
    "correct",
    "correct",
    "correct",
  ]);
});

test("scoreWord handles present letters", () => {
  expect(scoreWord("bcdea", "abcde")).toEqual([
    "present",
    "present",
    "present",
    "present",
    "present",
  ]);

  expect(scoreWord("abbba", "xaaax")).toEqual([
    "present",
    "missing",
    "missing",
    "missing",
    "present",
  ]);

  expect(scoreWord("baaab", "abbba")).toEqual([
    "present",
    "present",
    "present",
    "missing",
    "present",
  ]);
});

// Data from https://github.com/yukosgiti/wordle-tests
test("scoreWord passes wordle test suite", () => {
  const resultMap: { [key: string]: string } = {
    c: "correct",
    w: "missing",
    m: "present",
  };
  testData.forEach(([target, word, result]: string[]) => {
    const expected = result.split("").map((ch) => resultMap[ch]);
    expect(scoreWord(word, target)).toEqual(expected);
  });
});
