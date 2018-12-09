import { part1, part2 } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8').trim().split(' ');
console.time("Part 1 timer");
let sum = part1(input);
console.timeEnd("Part 1 timer")
console.log(`Part 1 answer: ${sum}`);

// console.time("Part 2 timer");
// let part2 = part2(input, 5, 60);
// console.timeEnd("Part 2 timer");
// console.log(`Part 2 order ${part2Answer.order} in ${part2Answer.time}s`);
