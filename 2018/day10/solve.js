import { part1 } from './solution.js'

var fs = require('fs');
let input = fs.readFileSync('testinput', 'utf8')
  .trim()
  .split('\n');

part1(input)

// console.time("Part 2 timer");
// let part2Score = part1('429 players; last marble is worth 7090100 points')
// console.timeEnd("Part 2 timer")
// console.log(`Part 2 value ${part2Score}`)
