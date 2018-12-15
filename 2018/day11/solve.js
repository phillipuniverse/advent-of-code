import { maxPower } from './solution.js'

console.time("Part 1 timer");
let part1Answer = maxPower(9445, 3, 3)
console.timeEnd("Part 1 timer")
console.log(`Part 1 output ${JSON.stringify(part1Answer)}`)

console.time("Part 2 timer");
let part2Answer = maxPower(9445, 1, 300)
console.timeEnd("Part 2 timer")
console.log(`Part 2 output ${JSON.stringify(part2Answer)}`)
