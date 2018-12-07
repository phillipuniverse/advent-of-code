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

test("Area above infinite", () => {
  let point = {x: 1, y: 1};
  expect(areaAbove(point, otherPoints(point, coords.map(parse)), computeBounds(coords))).toEqual(Number.POSITIVE_INFINITY);
});

test("Area above value", () => {
  let point = {x: 3, y: 4};
  expect(areaAbove(point, otherPoints(point, coords.map(parse)), computeBounds(coords))).toEqual(2);
});

test("Area below infinite", () => {
  let point = {x: 1, y: 6};
  expect(areaBelow(point, otherPoints(point, coords.map(parse)), computeBounds(coords))).toEqual(Infinity);
});
//
test("Area below value", () => {
  let point = {x: 5, y: 5};
  expect(areaBelow(point, otherPoints(point, coords.map(parse)), computeBounds(coords))).toEqual(3);
});

// test("Solves demo", () => {
//   fs.readFileSync('input', 'utf8').trim()
// });
