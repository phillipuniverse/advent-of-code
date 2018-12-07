var _ = require('lodash');
var cTable = require('console.table');


export const part1 = input => {
  let points = input.map(parse);
  let bounds = computeBounds(input);
  // left
  // right
  let board = _.times(bounds.maxX, -1);
  for (let i = 0; i < board.length; i++) {
    board[i] = _.times(bounds.maxY, -1);
  }

  // console.log(`Initial board: ${JSON.stringify(board)}`)
  // plot the points on the board
  for (let i = 0; i < points.length; i++) {
    // plot the points
    let point = points[i]
    let y = board[point.x];
    if (y === undefined) {
      y = [];
      board[point.x] = y;
    }
    // fill the board with the board number
    board[point.x][point.y] = i;
  }
  // console.log(`Plotted board: ${JSON.stringify(board)}`)
  // go through the board and mark the point with the least distance
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
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
      board[x][y] = shortestPoint;
    }
  }
  // console.log(cTable.getTable(board))
  // now that everything is placed, add up the board
  let distances = new Array(points.length);
  _.fill(distances, 0);
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
      // if I'm at the boundary, the area of this point is infinity
      if (isBoundary({x: x, y: y}, bounds) && board[x][y] != -1) {
        distances[board[x][y]] == Infinity
      } else if (board[x][y] != -1) {
        // the point index is stored in the board
        distances[board[x][y]]++
      }
    }
  }
  // filter the boundary points, not considering because Infinity
  distances = distances.filter((el, idx) => el != Infinity);
  console.log(`Distances: ${distances}`)
  return distances.reduce((acc, el) => Math.max(acc, el));
}

export const isBoundary = (point, bounds) => {
  let res = _.isEqual(point.x, bounds.maxX) || _.isEqual(point.x, bounds.minX)
    || _.isEqual(point.y, bounds.maxY) || _.isEqual(point.y, bounds.minY);
  return res;
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
  return bounds;
}

export const parse = raw => {
  let x = new Number(raw.substring(0, raw.indexOf(',')));
  let y = new Number(raw.substring(raw.indexOf(',') + 1));
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
