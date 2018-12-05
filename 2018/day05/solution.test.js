import { getReactedPolymer, findMinimumPolymerLength } from './solution.js';
var fs = require('fs');

test("Reacts aA", () => {
  expect(getReactedPolymer('aA')).toEqual('');
});

test("Reacts abBA", () => {
  expect(getReactedPolymer('abBA')).toEqual('');
});

test("Reacts dabAcCaCBAcCcaDA", () => {
  expect(getReactedPolymer('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA');
});

test("Minimum polymer for dabAcCaCBAcCcaDA", () => {
  expect(findMinimumPolymerLength('dabAcCaCBAcCcaDA')).toEqual(4);
});
