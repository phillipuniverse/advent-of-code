import { part1 } from './solution.js';
var fs = require('fs');

test("Reacts aA", () => {
  expect(part1('aA')).toEqual('');
});

test("Reacts abBA", () => {
  expect(part1('abBA')).toEqual('');
});

test("Reacts dabAcCaCBAcCcaDA", () => {
  expect(part1('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA');
});
