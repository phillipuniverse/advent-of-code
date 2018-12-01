import { parse, summation } from './solution.js';

test('parsesPositive', () => {
  expect(parse('+1')).toEqual(['+', '1'])
});

test('parsesNegative', () => {
  expect(parse('-400')).toEqual(['-', '400'])
});

test('blankLine', () => {
  expect(parse('')).toEqual([])
});

test('solution', () => {
  expect(summation(['+1', '+10', '-5', '-20', '+100'])).toEqual(86)
});
