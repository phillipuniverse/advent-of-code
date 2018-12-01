import { summation } from './solution.js'

var fs = require('fs');

let input = fs.readFileSync('input', 'utf8')
    .split('\n');
console.log("Total: " + summation(input));
