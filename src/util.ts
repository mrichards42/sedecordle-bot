// based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const randInt = (a: number, b?: number): number => {
  if (b == null) {
    return randInt(0, a);
  }
  const min = Math.ceil(a);
  const max = Math.floor(b);
  return Math.floor(Math.random() * (max - min) + min);
};
