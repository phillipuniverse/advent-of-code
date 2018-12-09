import { part1, part2 } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8').trim().split('\n');
console.time("Part 1 timer");
let part1Order = part1(input);
console.timeEnd("Part 1 timer")
console.log(`Part 1 answer: ${part1Order}`);

console.time("Part 2 timer");
let part2Answer = part2(input, 5, 60);
console.timeEnd("Part 2 timer");
console.log(`Part 2 order ${part2Answer.order} in ${part2Answer.time}s`);
