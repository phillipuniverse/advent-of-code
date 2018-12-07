import { part1 } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8').trim().split('\n');
console.time("Part 1 timer");
let maxSize = part1(input);
console.timeEnd("Part 1 timer")
console.log(`Part 1 answer: ${maxSize}`);

// console.time("Part 2 timer");
// let minimumPolymerLength = findMinimumPolymerLength(input);
// console.timeEnd("Part 2 timer");
// console.log(`Part 2 answer: ${minimumPolymerLength}`);
