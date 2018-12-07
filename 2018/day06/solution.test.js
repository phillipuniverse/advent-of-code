import { part1, parse, computeBounds, areaAbove, areaBelow, otherPoints, computeArea } from './solution.js';
var fs = require('fs');

let coords = fs.readFileSync('testinput', 'utf8')
  .trim()
  .split('\n');

test("Parses 1, 6", () => {
  expect(parse("1, 6")).toEqual({x: 1, y: 6});
});

test("Bounds", () => {
  expect(computeBounds(coords)).toEqual({maxX: 8, maxY: 9, minX: 1, minY: 1});
});

test("Solves demo", () => {
  expect(part1(coords)).toEqual(17);
});
