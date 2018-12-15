import { part1, getRackId, getPowerLevel, initializeGrid } from './solution.js';

describe('Power Levels', () => {
  /**
   * All test inputs are 0-indexed while the description
   * is 1-indexed
   */
  test('3,5 with serial 8', () => {
    expect(getPowerLevel(getRackId(2), 4, 8)).toEqual(4)
  })

  test('122,79 with serial 57', () => {
    expect(getPowerLevel(getRackId(121), 78, 57)).toEqual(-5)
  })

  test('217,196 with serial 39', () => {
    expect(getPowerLevel(getRackId(216), 195, 39)).toEqual(0)
  })

  test('101,153 with serial 71', () => {
    expect(getPowerLevel(getRackId(100), 152, 71)).toEqual(4)
  })
})

describe('Fills grid correctly', () => {
  test('Bounding box with serial 18 exists', () => {
    expect(initializeGrid(18)[32][44]).toEqual(4)
    expect(initializeGrid(18)[33][44]).toEqual(4)
    expect(initializeGrid(18)[34][44]).toEqual(4)
    expect(initializeGrid(18)[32][45]).toEqual(3)
    expect(initializeGrid(18)[33][45]).toEqual(3)
    expect(initializeGrid(18)[34][45]).toEqual(4)
    expect(initializeGrid(18)[32][46]).toEqual(1)
    expect(initializeGrid(18)[33][46]).toEqual(2)
    expect(initializeGrid(18)[34][46]).toEqual(4)
  })
})

test('Solves sample serial 18', () => {
  expect(part1(18)).toEqual('Coordinates: 33,45 with power: 29')
})

test('Solves sample serial 42', () => {
  expect(part1(42)).toEqual('Coordinates: 21,61 with power: 30')
})
