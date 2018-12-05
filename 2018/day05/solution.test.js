import { getReactedPolymerLength, findMinimumPolymerLength } from './solution.js';
var fs = require('fs');

test("Reacts aA", () => {
  expect(getReactedPolymerLength('aA')).toEqual(0);
});

test("Reacts abBA", () => {
  expect(getReactedPolymerLength('abBA')).toEqual(0);
});

test("Reacts dabAcCaCBAcCcaDA", () => {
  expect(getReactedPolymerLength('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA'.length);
});

test("Minimum polymer for dabAcCaCBAcCcaDA", () => {
  expect(findMinimumPolymerLength('dabAcCaCBAcCcaDA')).toEqual(4);
});
