import { parseLine, fillBoard, countOverlaps, part1, part2 } from './solution.js';

test("Parses #2 @ 3,1: 4x4", () => {
  expect(parseLine("#2 @ 3,1: 4x4")).toEqual({id: '2', x: 3, y: 1, width: 4, height: 4});
});

test("Parses #13 @ 507,629: 23x26", () => {
  expect(parseLine("#13 @ 507,629: 23x26")).toEqual({id: '13', x: 507, y: 629, width: 23, height: 26});
});

test("Solves part1", () => {
  let board = fillBoard(['#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2']);
  console.log(board);
  expect(board[3][3]).toEqual('1,2');
  expect(board[3][4]).toEqual('1,2');
  expect(board[4][3]).toEqual('1,2');
  expect(board[4][4]).toEqual('1,2');
  expect(board[0]).toEqual(undefined);
});

test("Solves part1", () => {
  expect(part1(['#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'])).toEqual(4);
});

test("Solves part2", () => {
  expect(part2(['#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'])).toEqual('3');
});
