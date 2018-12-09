var _ = require('lodash');
var cTable = require('console.table');


export const part1 = input => {
  let points = input.map(parse);
  let bounds = computeBounds(input);
  // left
  // right
  let board = Array(bounds.maxY + 1)
      .fill(-2)
      .map((e, i) => Array(bounds.maxX + 1).fill(-2));

  // plot the points on the board
  for (let i = 0; i < points.length; i++) {
    // plot the points
    let point = points[i]
    // fill the board with the board number
    console.log(`Point ${i} to (${point.x}, ${point.y}) `)
    board[point.y][point.x] = i;
  }
  console.log(`Plotted board: ${cTable.getTable(board)}`)
  // go through the board and mark the point with the least distance
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      let current = {x: x, y: y}
      let shortestPoint = -1;
      let dist = Number.MAX_SAFE_INTEGER
      // get the shortest distance between the points
      for (let pIdx = 0; pIdx < points.length; pIdx++) {
        let currentPointDistance = distance(current, points[pIdx]);
        if (currentPointDistance < dist) {
          dist = currentPointDistance;
          shortestPoint = pIdx;
        } else if (currentPointDistance == dist) {
          shortestPoint = -1;
        }
      }
      board[y][x] = shortestPoint;
    }
  }
  // console.log(cTable.getTable(board))
  // now that everything is placed, add up the board
  let distances = new Array(points.length).fill(0);
  _.fill(distances, 0);
  console.log(cTable.getTable(board))
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      // if I'm at the boundary, the area of this point is infinity
      // console.log(`(${y}, ${x}) is at a boundary ${isBoundary({x: x, y: y}, board)}`)
      if (isBoundary({x: x, y: y}, board) && board[y][x] != -1) {
        // console.log(`Setting ${board[y][x]} to -1`)
        distances[board[y][x]] = -1
      } else if (board[y][x] != -1 && distances[board[y][x]] != -1) {
        // the point index is stored in the board
        distances[board[y][x]]++
      }
    }
  }
  // filter the boundary points, not considering because Infinity
  console.log(`Unfiltered distances: ${distances}`)

  distances = distances.filter((el, idx) => el != -1);
  console.log(`Distances: ${distances}`)
  return distances.reduce((acc, el) => Math.max(acc, el));
}

export const isBoundary = (point, board) => {
  return point.y == 0 || point.y == board.length - 1
    || point.x == 0 || point.x == board[0].length - 1;
}

export const otherPoints = (point, allPoints) => {
  let others = allPoints.filter(p => !(p.x == point.x && p.y == point.y));
  return others;
}

export const computeBounds = coordinates => {
  let bounds = {
    maxX: -1,
    maxY: -1,
    minX: Number.MAX_SAFE_INTEGER,
    minY: Number.MAX_SAFE_INTEGER
  };
  coordinates.map(parse)
    .forEach(c => {
      bounds.maxX = c.x > bounds.maxX ? c.x : bounds.maxX;
      bounds.maxY = c.y > bounds.maxY ? c.y : bounds.maxY;
      bounds.minX = c.x < bounds.minX ? c.x : bounds.minX;
      bounds.minY = c.y < bounds.minY ? c.y : bounds.minY;
    })
  console.log(`Bounds: ${JSON.stringify(bounds)}`)
  return bounds;
}

export const parse = raw => {
  let x = parseInt(raw.substring(0, raw.indexOf(',')), 10);
  let y = parseInt(raw.substring(raw.indexOf(',') + 1), 10);
  return {
    x: x,
    y: y
  }
}

export const distance = (a, b) => {
  let dist = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  // console.log(`distance between (${a.x}, ${a.y}) and (${b.x}, ${b.y}): ${dist}`)
  return dist;
}
