// -- Random ------------------------------------------------------------------

export interface Rand {
  seed: number;
  next: () => number;
}

// Snagged from the first array value of random-js's createEntropy;
export const randSeed = (): number => new Date().getTime() >>> 0;

export const randGen = (seed_?: number): Rand => {
  let a = seed_ ?? randSeed();
  // From https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32
  function mulberry32() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  return { seed: a, next: mulberry32 };
};

// based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const randInt = (rand: Rand, a: number, b?: number): number => {
  if (b == null) {
    return randInt(rand, 0, a);
  }
  const min = Math.ceil(a);
  const max = Math.floor(b);
  return Math.floor(rand.next() * (max - min) + min);
};

export const randElement = <T>(rand: Rand, xs: T[]): T =>
  xs[randInt(rand, xs.length)];

// -- Game Id -----------------------------------------------------------------

type EncodeGameId = (args: { seed: number; count: number }) => string;

export const encodeGameId: EncodeGameId = ({ seed, count }) =>
  `${(seed >>> 0).toString(36)}~${(count >>> 0).toString(36)}`;

export const decodeGameId = (gameId: string) => {
  const [seed, count] = gameId.split("~").map((x) => parseInt(x, 36));
  return { seed, count };
};
