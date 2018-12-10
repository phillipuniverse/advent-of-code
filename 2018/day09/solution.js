var _ = require('lodash');

export const part1 = input => {
  return playGame(parse(input))
}

export const playGame = game => {
  let marbles = [0]
  let currentMarble = 0
  let scores = Array(game.players).fill(0)
  // already set 0, next marble value is 1
  let marbleValue = 1
  let player = 0
  while (marbleValue <= game.lastMarbleWorth) {
    let position = marbles.findIndex(m => m == currentMarble)
    console.log(`Current marble ${currentMarble} position is ${position}`)
    console.log(`Handling marble ${marbleValue}`)

    // about to place the special marble, do some scoring
    if (marbleValue % 23 == 0) {
      // remove 1 item at a could-be-negative index (goes from back)
      let removed = marbles.splice(position - 7, 1)[0]
      console.log(`Removed marble ${removed}`)

      // add the current marble to the current player's score
      scores[player] += (removed + marbleValue)
      console.log(`Scores: ${scores}`)
      // new current is directly to the right of the
      // one I just removed. This just so happens to be exactly where
      // I removed the marble, now that's the new marble
      currentMarble = marbles[position - 7]
      console.log(`New current marble ${currentMarble}`)
    } else {
      // normal operation, place a marble
      let placement = nextPosition(position, marbles.length)
      console.log(`Placing marble ${marbleValue} at position ${placement}`)
      marbles.splice(placement, 0, marbleValue)
      console.log(`Current board is ${marbles}`)
      currentMarble = marbleValue
    }
    marbleValue++
    player = (player + 1) % game.players
  }
  console.log(`Final scores: ${scores}`)
  return _.max(scores)
}

export const nextPosition = (currentPosition, totalMarbles) => {
  // clockwise increases by 1
  let left = currentPosition + 1
  // if the next position goes off the end, reset to the beginning
  // by subtracting where I just got to from the length
  let maxPosition = totalMarbles - 1
  if (left > maxPosition) {
    left = totalMarbles - left
  }
  // 1 after what I just determined as the left-most marble I'm about
  // to place
  return left + 1
}

export const parse = input => {
  return {
    players: parseInt(input.match(/^(\d+) players/)[1]),
    lastMarbleWorth: parseInt(input.match(/worth (\d+) points/)[1])
  }
}
