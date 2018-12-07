var _ = require('lodash');

// first figure out the area that I care about
// From all the points draw a bounding box, only care about things inside

export const part1 = input => {
  let points = input.map(parse);
  let bounds = computeBounds(points);
  areas = {};
  for (point of points) {
    // filter out the current point to pass in the other ones
    computeArea(point, points)
    distance
  }
}

// export const computeArea = (point, allPoints, bounds) => {
//   let currentPoint = {x: point.x, y: point.y};
//   let area = 1;
//   // move left
//   while (currentPoint.x >= bounds.minX) {
//     let currentDistance = distance(point, current);
//     let minimumOtherDistance = otherPoints.reduce((acc, p) => acc < distance(current, p) ? acc : distance(current, p), Infinity);
//     if (currentDistance < minimumOtherDistance) {
//       // add myself
//       area++;
//       // add above and below
//       area += areaAbove(point, otherPoints(point, allPoints), bounds);
//       area += areaBelow(point, otherPoints(point, allPoints), bounds);
//     }
//
//     currentPoint.x--
//   }
//   return area;
//   // go up
// }

export const otherPoints = (point, allPoints) => {
  let others = allPoints.filter(p => !(p.x == point.x && p.y == point.y));
  return others;
}

export const areaAbove = (point, otherPoints, bounds) => {
  let current = {x: point.x, y: point.y - 1};
  let area = 0;
  console.log(`Minimum y: ${bounds.minY}`)
  while (current.y >= bounds.minY) {
    console.log(`Trying point: ${current.x}, ${current.y}`)

    let currentDistance = distance(point, current);
    otherPoints.map(o => console.log(`(${o.x}, ${o.y})`))
    let minimumOtherDistance = otherPoints.reduce((acc, p) => acc < distance(current, p) ? acc : distance(current, p), Infinity);
    console.log(`Current dist: ${currentDistance}, other minimum: ${minimumOtherDistance}`);
    if (currentDistance < minimumOtherDistance) {
      area++;
    } else {
      return area;
    }
    current.y--;
  }
  return Number.POSITIVE_INFINITY;
}

export const areaBelow = (point, otherPoints, bounds) => {
  let current = {x: point.x, y: point.y + 1};
  let area = 0;
  console.log(`Minimum y: ${bounds.maxY}`)
  while (current.y <= bounds.maxY) {
    console.log(`Trying point: ${current.x}, ${current.y}`)

    let currentDistance = distance(point, current);
    let minimumOtherDistance = otherPoints.reduce((acc, p) => acc < distance(current, p) ? acc : distance(current, p), Infinity);
    console.log(`Current dist: ${currentDistance}, other minimum: ${minimumOtherDistance}`);
    if (currentDistance < minimumOtherDistance) {
      area++;
    } else {
      return area;
    }
    current.y++;
  }
  return Number.POSITIVE_INFINITY;
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
  console.log(`distance between (${a.x}, ${a.y}) and (${b.x}, ${b.y}): ${dist}`)
  return dist;
}
