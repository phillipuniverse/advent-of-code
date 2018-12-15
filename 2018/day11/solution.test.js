import { maxPower, getRackId, getPowerLevel, initializeGrid, part2 } from './solution.js';

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
    let grid = initializeGrid(18)
    expect(grid[32][44]).toEqual(4)
    expect(grid[33][44]).toEqual(4)
    expect(grid[34][44]).toEqual(4)
    expect(grid[32][45]).toEqual(3)
    expect(grid[33][45]).toEqual(3)
    expect(grid[34][45]).toEqual(4)
    expect(grid[32][46]).toEqual(1)
    expect(grid[33][46]).toEqual(2)
    expect(grid[34][46]).toEqual(4)
  })
})

describe('Solves samples part 1', () => {
  test('Serial 18 300x300', () => {
    expect(maxPower(18, 3, 3)).toEqual({
      coordinates: '33,45',
      power: 29,
      size: 3
    })
  })

  test('Serial 42 300x300', () => {
    expect(maxPower(42, 3, 3)).toEqual({
      coordinates: '21,61',
      power: 30,
      size: 3
    })
  })

})

describe('Solves samples part 2', () => {
  // test('Serial 18', () => {
  //   expect(maxPower(18)).toEqual({
  //     coordinates: '90,296',
  //     power: 113,
  //     size: 16
  //   })
  // })

  // test('Serial 42', () => {
  //   expect(maxPower(42)).toEqual({
  //     coordinates: '232,251',
  //     power: 119,
  //     size: 12
  //   })
  // })
})
