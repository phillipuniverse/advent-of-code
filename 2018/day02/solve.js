import { containsExactly, part2 } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8')
    .split('\n')
    // strip out the empty entry line
    .slice(0, -1);

let exactly2 = input.filter(word => containsExactly(word, 2)).length;
let exactly3 = input.filter(word => containsExactly(word, 3)).length;
let hash = exactly2 * exactly3;
console.log("Hash of elements: " + hash);

console.log("Common Box ID characters with Fabric: " + part2(input));
