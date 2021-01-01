export const isNumber = (age: unknown): age is number =>
  typeof age === 'number';

export const isZeroOrOne = (candidate: unknown): boolean =>
  candidate === 0 || candidate === 1;
