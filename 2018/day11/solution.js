const _ = require('lodash');

export const maxPower = (input, startSize, endSize) => {

  let cells = initializeGrid(input)
  // console.log(visualizeFuel(cells))

  // loop through all of them and figure out the biggest grid
  let largestPower = {
    coordinates: '-1,-1',
    power: Number.MIN_VALUE,
    size: 0
  }
  for (let x = 0; x < cells.length ; x++) {
    console.log(`Computing sizes for x: ${x}`)
    for (let y = 0; y < cells[x].length; y++) {
      // everything will be calculated as these coordinates is the top-left
      // cell
      let power = 0
      let size = 0
      for (let candidateSize = startSize; candidateSize <= endSize; candidateSize++) {
        let largestSizedPower = computePower(x, y, candidateSize, cells)
        if (largestSizedPower > power) {
          size = candidateSize
          power = largestSizedPower
        }
      }
      if (power > largestPower.power) {
        largestPower = {
          coordinates: `${x + 1},${y + 1}`,
          power: power,
          size: size
        }
      }
    }
  }

  return largestPower
}

export const computePower = (xStart, yStart, size, cells) => {
  let leftBounds = xStart
  let rightBounds = xStart + (size - 1)
  let topBounds =  yStart
  let bottomBounds = yStart + (size - 1)
  let inBounds = true
  let power = 0
  for (let gridX = leftBounds; gridX <= rightBounds && inBounds; gridX++) {
    for (let gridY = topBounds; gridY <= bottomBounds && inBounds; gridY++) {
      let inBounds = gridX < cells.length && gridY < cells[xStart].length
      if (!inBounds) {
        // stop calculating this grid, it will get picked up in another calc
        // for a different grid
        power = Number.MIN_VALUE
        break
      }
      power += cells[gridX][gridY]
    }
  }
  return power
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
