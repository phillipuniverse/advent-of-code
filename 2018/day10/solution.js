const _ = require('lodash');

export const part1 = input => {
  let sky = initializeSky(input)
  console.log(`Sky at tick 0`)
  console.log(visualizeSky(sky))
  let tick = 1
  console.log(`Type any key to see the sky at second ${1}, ctrl+c to exit`)

  const cli = process.stdin
  cli.setEncoding('utf-8')
  // wait for input
  // cli.on('data', (data) => {
  //   console.log(`Received some data ${data}`)
  //   move(sky, tick)
  //   console.log('\n')
  //   console.log(`Sky at tick ${tick}`)
  //   console.log(visualizeSky(sky))
  //   tick++
  // })
  while (tick <= 5) {
    move(sky, tick)
    console.log('\n')
    console.log(`Sky at tick ${tick}`)
    console.log(visualizeSky(sky))
    tick++
  }
  // stick around for the user
  // while(true) { }
}

export const initializeSky = input => {
  let points = input.map(parse)
  let leftBounds = _.minBy(points, p => p.position.x).position.x
  let rightBounds = _.maxBy(points, p => p.position.x).position.x
  // add 1 to consider myself
  let width = Math.abs(leftBounds) + rightBounds + 1
  let topBounds = _.minBy(points, p => p.position.y).position.y
  let bottomBounds = _.maxBy(points, p => p.position.y).position.y
  let height = Math.abs(topBounds) + bottomBounds + 1

  let perspective = {
    x: Math.abs(leftBounds),
    y: Math.abs(topBounds)
  }
  console.log(`Perspective: ${JSON.stringify(perspective)}`)
  let sky = {
    positions: new Array(width)
        .fill()
        // fill it with an empty array since more than 1 point can exist in a
        // position
        .map((e, i) => new Array(height).fill()),
    perspective: perspective
  }
  // console.log(visualizeSky(sky))

  points.forEach(p => {
    place(p, sky, sky.perspective)
  })
  // console.log(visualizeSky(sky))
  return sky
}

export const move = (sky, tick) => {
  let pointsMoved = 0
  for (let x = 0; x < sky.positions.length; x++) {
    for (let y = 0; y < sky.positions[y].length; y++) {
      let points = sky.positions[x][y] ? sky.positions[x][y] : []
      let pointsToMove = points.length
      for (let i = 0; i < pointsToMove; i++) {
        let point = points[points.length-1]
        // if I've already moved this for this interval, don't move again
        if (point.tick == tick) { continue }
        points.pop()
        point.tick++
        console.log(`Moving point ${JSON.stringify(point)}`)
        // update the positioning
        point.position = {
          x: point.position.x + point.velocity.x,
          y: point.position.y + point.velocity.y
        }
        console.log(`New relative position: ${JSON.stringify(point.position)}`)
        // place the point
        place(point, sky)
        pointsMoved++
      }
    }
  }
  console.log(`Points moved: ${pointsMoved}`)
  return sky
}

/**
 * Puts a point in the sky relative to the perspective. Returns the point that was removed
 * as a result
 */
export const place = (point, sky) => {
  console.log(`Plotting point at: ${JSON.stringify(point.position)}`)
  let coords = {
    x: sky.perspective.x + point.position.x,
    y: sky.perspective.y + point.position.y
  }
  if (!sky.positions[coords.x][coords.y]) { sky.positions[coords.x][coords.y] = [] }
  sky.positions[coords.x][coords.y].push(point)
}

export const visualizeSky = sky => {
  let out = ''
  let map = sky.positions
  // this is a square, so assume the y is the same for everything
  for (let y = 0; y < map[0].length; y++) {
    for (let x = 0; x < map.length; x++) {
      let points = map[x][y]
      if (points && points.length) {
        // maybe differentiate the perspective here?
        out += '#'
      } else {
        // empty space
        out += '.'
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
