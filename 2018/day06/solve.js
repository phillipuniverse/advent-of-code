import { getReactedPolymerLength, findMinimumPolymerLength } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8').trim();
console.time("Part 1 timer");
let polymerLength = getReactedPolymerLength(input);
console.timeEnd("Part 1 timer")
console.log(`Part 1 answer: ${polymerLength}`);

console.time("Part 2 timer");
let minimumPolymerLength = findMinimumPolymerLength(input);
console.timeEnd("Part 2 timer");
console.log(`Part 2 answer: ${minimumPolymerLength}`);
