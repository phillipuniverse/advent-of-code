import { part1, playGame, nextPosition, parse } from './solution.js';
var fs = require('fs');

test("Parses", () => {
  expect(parse('13 players; last marble is worth 7999 points')).toEqual({players: 13, lastMarbleWorth: 7999})
})

describe("Part 1 solvers", () => {
  [{
    in: '10 players; last marble is worth 1618 points',
    out: 8317
  },{
    in: '13 players; last marble is worth 7999 points',
    out: 146373
  }].forEach(el => {
    test(el.in, () =>{
      expect(part1(el.in)).toEqual(el.out)
    })
  })
});

test("Solves part 2", () => {
});
