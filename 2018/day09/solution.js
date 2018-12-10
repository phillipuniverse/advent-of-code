var _ = require('lodash');

export const part1 = input => {
  return playGame(parse(input))
}

export const playGame = game => {
  let current = {
    val: 0
  }
  current.left = current
  current.right = current
  let head = current
  let scores = Array(game.players).fill(0)
  // already set 0, next marble value is 1
  let marbleValue = 1
  let player = 0
  while (marbleValue <= game.lastMarbleWorth) {
    console.log(`Current marble ${current.val}`)
    console.log(`Handling marble ${marbleValue}`)

    // about to place the special marble, do some scoring
    if (marbleValue % 23 == 0) {
      // remove 1 item at a could-be-negative index (goes from back)
      let removed = current
      _.times(7, (idx) => {
        removed = removed.left
      })
      // remove it by resetting pointers
      removed.left.right = removed.right
      removed.right.left = removed.left
      console.log(`Removed marble ${removed.val}`)

      // add the current marble to the current player's score
      scores[player] += (removed.val + marbleValue)
      console.log(`Scores: ${scores}`)
      // new current is directly to the right of the
      // one I just removed
      current = removed.right
      console.log(`New current marble ${current.val}`)
    } else {
      // normal operation, place a marble
      console.log(`Placing marble ${marbleValue}`)
      let leftMost = current.right
      let rightMost = current.right.right
      let placed = {
        val: marbleValue,
        left: leftMost,
        right: rightMost
      }
      leftMost.right = placed
      rightMost.left = placed
      // console.log(`Current board is: ${getBoardOutput(head)}`)
      current = placed
    }
    marbleValue++
    player = (player + 1) % game.players
  }
  console.log(`Final scores: ${scores}`)
  return _.max(scores)
}

export const getBoardOutput = head => {
  let output = `${head.val}`
  let next = head.right
  while (next.val != head.val) {
    output += `, ${next.val}`
    next = next.right
  }
  return output
}

export const parse = input => {
  return {
    players: parseInt(input.match(/^(\d+) players/)[1]),
    lastMarbleWorth: parseInt(input.match(/worth (\d+) points/)[1])
  }
}
