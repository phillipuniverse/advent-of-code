import { part1, part2, parse } from './solution.js';
var fs = require('fs');

let input = fs.readFileSync('testinput', 'utf8')
  .trim()
  .split('\n');

test("Processed input", () => {
  let dependencies = parse(input)
  expect(dependencies['F'].parents).toContain('C');
  expect(dependencies['E'].parents).toContain('B');
  expect(dependencies['E'].parents).toContain('D');
  expect(dependencies['E'].parents).toContain('F');
  expect(dependencies['E'].children.length).toEqual(0);
  expect(dependencies['D'].children).toContain('E');
  // test sorted
  expect(dependencies['A'].children[0]).toEqual('B');
});

test("Solves part1", () => {
  expect(part1(input)).toEqual('CABDFE')
});
