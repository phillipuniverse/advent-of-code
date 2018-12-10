import { part1And2 } from './solution.js';
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
  expect(part1And2(input).metadataSum).toEqual(138)
});

test("Solves part 2", () => {
  expect(part1And2(input).value).toEqual(66)
});
