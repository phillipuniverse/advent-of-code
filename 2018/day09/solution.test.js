import { part1, playGame, nextPosition, parse } from './solution.js';
var fs = require('fs');

test("Parses", () => {
  expect(parse('13 players; last marble is worth 7999 points')).toEqual({players: 13, lastMarbleWorth: 7999})
})

describe('Positioning', () => {
  test("Edge", () => {
    expect(nextPosition(0, 1)).toEqual(1)
  })
  test("Middle", () => {
    expect(nextPosition(1, 5)).toEqual(3)
  })
})

describe("Part 1 solvers", () => {
  // 13 players; last marble is worth 7999 points
  [{
    in: '10 players; last marble is worth 1618 points',
    out: 8317
  },{
    in: '13 players; last marble is worth 7999 points',
    out: 146373
  },{
    in: '17 players; last marble is worth 1104 points',
    out: 2764
  },{
    in: '21 players; last marble is worth 6111 points',
    out: 54718
  },{
    in: '30 players; last marble is worth 5807 points',
    out: 37305
  }].forEach(el => {
    test(el.in, () =>{
      expect(part1(el.in)).toEqual(el.out)
    })
  })
});

test("Solves part 2", () => {
});
