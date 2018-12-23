import { part1And2 } from './solution.js'

const fs = require('fs')

let input = fs.readFileSync('input', 'utf8')
  .trim()
  .split('\n');

console.time("Part 1 timer");
let part1Answer = part1And2(input, 20)
console.timeEnd("Part 1 timer")
console.log(`Part 1 output ${JSON.stringify(part1Answer)}`)

// console.time("Part 2 timer");
// let part2Answer = part1And2(input, 50000000000)
// console.timeEnd("Part 2 timer")
// console.log(`Part 2 output ${JSON.stringify(part2Answer)}`)
