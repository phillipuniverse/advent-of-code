import { parse, part1, part2 } from './solution.js';

test('parsesPositive', () => {
  expect(parse('+1')).toEqual(['+', '1'])
});

test('parsesNegative', () => {
  expect(parse('-400')).toEqual(['-', '400'])
});

test('blankLine', () => {
  expect(parse('')).toEqual([])
});

test('solvesPart1', () => {
  expect(part1(['+1', '+10', '-5', '-20', '+100'])).toEqual(86)
});

test('solvesPart2 to 0', () => {
  expect(part2(['+1', '-1'])).toEqual(0)
});

test('solvesPart2 to 10', () => {
  expect(part2(['+3', '+3', '+4', '-2', '-4'])).toEqual(10)
});

test('solvesPart2 to 5', () => {
  expect(part2(['-6', '+3', '+8', '+5', '-6'])).toEqual(5)
});
