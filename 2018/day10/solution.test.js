import { parse } from './solution.js';
var fs = require('fs');
let input = fs.readFileSync('testinput', 'utf8')
  .trim()
  .split('\n');

describe('Parses', () => {
  test('position=< 3, -2> velocity=<-1,  1>', () => {
    expect(parse('position=< 3, -2> velocity=<-1,  1>')).toEqual({
      position: {
        x: 3,
        y: -2
      },
      velocity: {
        x: -1,
        y: 1
      },
      tick: 0
    })
  })
  test('position=< 6, 10> velocity=<-2, -1>', () => {
    expect(parse('position=< 6, 10> velocity=<-2, -1>')).toEqual({
      position: {
        x: 6,
        y: 10
      },
      velocity: {
        x: -2,
        y: -1
      },
      tick: 0
    })
  })
  test('position=<-4,  3> velocity=< 2,  0>', () => {
    expect(parse('position=<-4,  3> velocity=< 2,  0>')).toEqual({
      position: {
        x: -4,
        y: 3
      },
      velocity: {
        x: 2,
        y: 0
      },
      tick: 0
    })
  })
})
