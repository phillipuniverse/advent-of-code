import { part1, part2 } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8')
    .split('\n')
    // strip out the empty entry line
    .slice(0, -1);

console.log("Part 1: " + part1(input));
console.log("Part 2: " + part2(input));
