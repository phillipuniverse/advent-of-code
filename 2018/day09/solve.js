import { part1 } from './solution.js'

var fs = require('fs');

console.time("Part 1 timer");
let part1Score = part1('429 players; last marble is worth 70901 points')
console.timeEnd("Part 1 timer")
console.log(`Part 1 answer: ${part1Score}`)

console.time("Part 2 timer");
let part2Score = part1('429 players; last marble is worth 7090100 points')
console.timeEnd("Part 2 timer")
console.log(`Part 2 value ${part2Score}`)
