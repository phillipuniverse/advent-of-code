const _ = require('lodash');

export const part1 = input => {

  let cells = initializeGrid(input)
  // console.log(visualizeFuel(cells))

  // loop through all of them and figure out the biggest 3x3 grid
  let largestPowerCoordinates = ''
  let largestPower = Number.MIN_VALUE
  for (let x = 0; x < cells.length ; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      // everything will be calculated as these coordinates is the top-left
      // cell
      let leftBounds = x
      let rightBounds = x + 2
      let topBounds =  y
      let bottomBounds = y + 2
      let inBounds = true
      let power = 0
      for (let gridX = leftBounds; gridX <= rightBounds && inBounds; gridX++) {
        for (let gridY = topBounds; gridY <= bottomBounds && inBounds; gridY++) {
          let inBounds = gridX < cells.length && gridY < cells[x].length
          if (!inBounds) {
            // stop calculating this grid, it will get picked up in another calc
            // for a different grid
            break
          }
          power += cells[gridX][gridY]
        }
      }
      if (inBounds && power > largestPower) {
        largestPowerCoordinates = `Coordinates: ${x + 1},${y + 1} with power: ${power}`
        largestPower = power
      }
    }
  }

  return largestPowerCoordinates
}

export const initializeGrid = serial => {
  // DON'T FORGET --- EVERYTHING IS 1-INDEXED IN THE INSTRUCTIONS
  let cells = Array(300).fill()
      .map((e, i) => Array(300).fill(0))
  for (let x = 0; x < cells.length ; x++) {
    for (let y = 0; y < cells[x].length; y++) {
      let rackId = getRackId(x)
      cells[x][y] = getPowerLevel(rackId, y, serial)
    }
  }
  return cells
}

// the x is 0-indexed
export const getRackId = x => {
  return x + 1 + 10
}

export const getPowerLevel = (rackId, y, serial) => {
  let powerLevel = (rackId * (y + 1)) + serial
  powerLevel *= rackId
  // get the 100s spot
  return Math.floor((powerLevel / 100) % 10) - 5
}

export const visualizeFuel = cells => {
  let out = ''
  for (let y = 0; y < cells[0].length ; y++) {
    let row = ''
    for (let x = 0; x < cells.length; x++) {
      row += cells[x][y] + ' '
    }
    out += row.trim() + '\n'
  }
  return out.trim()
}
