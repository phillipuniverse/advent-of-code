var _ = require('lodash');

export const part1 = inputs => {
  let board = fillBoard(inputs);
  return countOverlaps(board);
}

export const part2 = inputs => {
  let nonOverlappedIds = new Set(inputs.map(i => parseLine(i).id));
  let board = fillBoard(inputs);
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; board[x] !== undefined && y < board[x].length; y++) {
      let ids = board[x][y];
      if (ids !== undefined && ids.indexOf(',') > -1) {
        ids.split(',').forEach(id => nonOverlappedIds.delete(id));
      }
    }
  }
  return nonOverlappedIds.values().next().value;
}

export const countOverlaps = board => {
  let totalOverlapping = 0;
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; board[x] !== undefined && y < board[x].length; y++) {
      let ids = board[x][y];
      if (ids !== undefined && ids.indexOf(',') > -1) { totalOverlapping++ }
    }
  }
  return totalOverlapping;
}

export const fillBoard = inputs => {
  let board = [];
  for (const line of inputs) {
    let rect = parseLine(line);
    for (let i = rect.x; i < rect.x + rect.width; i++) {
      for (let j = rect.y; j < rect.y+rect.height; j++) {
        if (board[i] === undefined) {
          board[i] = [];
        }
        board[i][j] = board[i][j] === undefined ? rect.id : board[i][j] + ',' + rect.id;
      }
    }
  }

  return board;
}

export const parseLine = input => {
  let matched = input.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
  return {
    id: matched[1],
    x: parseInt(matched[2]),
    y: parseInt(matched[3]),
    width: parseInt(matched[4]),
    height: parseInt(matched[5]),
  }
}
