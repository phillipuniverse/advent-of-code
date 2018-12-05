import { part1, part2 } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8').trim();
console.log("Initial size: " + input.length);
console.log("Part 1: " + part1(input) + " with size " + part1(input).length);
// console.log("Part 2: " + part2(input));
