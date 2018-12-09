import { part1, part2 } from './solution.js';
var fs = require('fs');

let input = fs.readFileSync('testinput', 'utf8')
  .trim()
  .split(' ');

test("Tokenized", () => {
  expect(input.length).toEqual(16)
  expect(input[15]).toEqual('2')
  expect(input[0]).toEqual('2')
});

test("Finds metadata sum", () => {
  expect(part1(input)).toEqual(138)
});
