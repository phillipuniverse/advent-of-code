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
  let sky = new Array(width)
        .fill()
        .map((e, i) => new Array(height).fill())
  sky[perspective.x][perspective.y] = perspective
  // console.log(visualizeSky(sky))

  points.forEach(p => {
    place(p, sky, perspective)
  })
  // console.log(visualizeSky(sky))
  return sky
}

export const move = (sky, tick) => {
  let perspective = findPerspective(sky)
  for (let x = 0; x < sky.length; x++) {
    for (let y = 0; y < sky.length; y++) {
      let point = sky[x][y]
      while (point && !isPerspective(point) && point.tick != tick) {
        // console.log(`Moving point at position ${JSON.stringify(point.position)} by velocity ${JSON.stringify(point.velocity)}`)
        point.position = {
          x: point.position.x + point.velocity.x,
          y: point.position.y + point.velocity.y
        }
        point.tick++
        // console.log(`New relative position: ${JSON.stringify(point.position)}`)
        // clear out  the current point
        sky[x][y] = null
        point = place(point, sky, perspective)
      }
    }
  }
  return sky
}

export const findPerspective = sky => {
  for (let x = 0; x < sky.length; x++) {
    for (let y = 0; y < sky.length; y++) {
      if (isPerspective(sky[x][y])) { return sky[x][y] }
    }
  }
}

/**
 * Puts a point in the sky relative to the perspective. Returns the point that was removed
 * as a result
 */
export const place = (point, sky, perspective) => {
  let replacing = sky[perspective.x + point.position.x][perspective.y + point.position.y]
  sky[perspective.x + point.position.x][perspective.y + point.position.y] = point
  return replacing
}

export const visualizeSky = sky => {
  let out = ''
  // this is a square, so assume the y is the same for everything
  for (let y = 0; y < sky[0].length; y++) {
    for (let x = 0; x < sky.length; x++) {
      let point = sky[x][y]
      if (point) {
        if (isPerspective(point)) {
          out += 'P'
        } else {
          out += '#'
        }
      } else {
        // empty space
        out += '.'
      }
    }
    out += '\n'
  }
  return out.trim()
}

export const isPerspective = point => {
  return point && !point.velocity
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
