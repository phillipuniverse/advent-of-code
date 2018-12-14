const _ = require('lodash');

export const part1 = input => {
  let points = input.map(parse)

  let tick = 0
  while (true) {
    let bounds = computeBounds(points)
    let newPoints = points.map(move)
    let newBounds = computeBounds(newPoints)
    if (newBounds.area >= bounds.area) {
      console.log(`Found at tick ${tick}`)
      let message = visualize(points, bounds)
      console.log(`\n\n${message}\n\n`)
      return message
    }
    points = newPoints
    tick++
  }
}

export const computeBounds = points => {
  let bounds = {
    left: _.minBy(points, p => p.position.x).position.x,
    right: _.maxBy(points, p => p.position.x).position.x,
    top: _.minBy(points, p => p.position.y).position.y,
    bottom: _.maxBy(points, p => p.position.y).position.y
  }
  let width = Math.abs(bounds.left) + bounds.right
  let height = Math.abs(bounds.top) + bounds.bottom
  bounds.area = width * height
  return bounds
}

export const move = point => {
  return {
    position: {
      x: point.position.x + point.velocity.x,
      y: point.position.y + point.velocity.y
    },
    velocity: {
      x: point.velocity.x,
      y: point.velocity.y
    }
  }
}

export const visualize = (points, bounds) => {
  let out = ''
  for (let y = bounds.top; y <= bounds.bottom; y++) {
    for (let x = bounds.left; x <= bounds.right; x++) {
      if (points.find(p => p.position.x == x && p.position.y == y)) {
        // found me a point
        out += '#'
      } else {
        // empty space
        out += ' '
      }
    }
    out += '\n'
  }
  return out.trim()
}

export const parse = line => {
  let positionMatch = line.match(/position=<(.+?), (.+?)>/)
  let velocityMatch = line.match(/velocity=<(.+?), (.+?)>/)
  return {
    position: {
      x: parseInt(positionMatch[1]),
      y: parseInt(positionMatch[2]),
    },
    velocity: {
      x: parseInt(velocityMatch[1]),
      y: parseInt(velocityMatch[2])
    },
    tick: 0
  }
}
