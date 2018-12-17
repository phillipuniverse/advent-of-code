import { parse } from './solution.js';
const fs = require('fs')

let input = fs.readFileSync('testinput', 'utf8')
  .trim()
  .split('\n');

describe('Parses test input', () => {
  let parsed = parse(input)
  test('Initial state', () => {
    expect(parsed.initialState).toEqual('#..#.#..##......###...###')
  })

  test('Patterns correct size', () => {
    expect(Object.keys(parsed.patterns).length).toEqual(14)
  })

  test('Contains .####', () => {
    expect(parsed.patterns['.####']).toEqual('#')
  })
})

describe('Solves samples part 2', () => {
})
