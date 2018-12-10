import { part1 } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8').trim();
console.time("Part 1 timer");
let maxScore = part1(input);
console.timeEnd("Part 1 timer")
console.log(`Part 1 answer: ${maxScore}`);

// console.time("Part 2 timer");
// let part2 = part1And2(input);
// console.timeEnd("Part 2 timer");
// console.log(`Part 2 value ${part2.value}`);
