import { part1 } from './solution.js'

const fs = require('fs')

let input = fs.readFileSync('testinput', 'utf8')
  .trim()
  .split('\n');

console.time("Part 1 timer");
let part1Answer = part1(input)
console.timeEnd("Part 1 timer")
console.log(`Part 1 output ${JSON.stringify(part1Answer)}`)

// console.time("Part 2 timer");
// let part2Answer = maxPower(9445, 1, 300)
// console.timeEnd("Part 2 timer")
// console.log(`Part 2 output ${JSON.stringify(part2Answer)}`)
