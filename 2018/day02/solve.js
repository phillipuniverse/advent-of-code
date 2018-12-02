import { containsExactly } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8')
    .split('\n');

let exactly2 = input.filter(word => containsExactly(word, 2)).length;
let exactly3 = input.filter(word => containsExactly(word, 3)).length;
let hash = exactly2 * exactly3;
console.log("Hash of elements: " + hash);
