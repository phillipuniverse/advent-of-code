var _ = require('lodash');

export const part1 = input => {
  let metadataSum = 0
  let cursor = 0
  let nodeNum = 1
  let toProcess = []
  while (cursor < input.length) {
    // processing the current one
    if (toProcess.length) {
      let currentNode = toProcess[toProcess.length - 1]
      if (currentNode.childrenLeft == 0) {
        // no children left to process, next entries are metadata
        // so add them all up
        while (currentNode.metadataLeft > 0) {
          let md = parseInt(input[cursor])
          console.log(`Adding metadata ${md} for node ${currentNode.id}`)
          metadataSum += md;
          currentNode.metadataLeft--
          cursor++
        }
        // now this is fully processed, pop if off and restart
        toProcess.pop()
        continue
      } else {
        currentNode.childrenLeft--
      }
    }
    console.log(`Queueing node ${nodeNum} at index ${cursor}`)
    let node = {
      id: nodeNum,
      childrenLeft: parseInt(input[cursor]),
      metadataLeft: parseInt(input[cursor+1])
    }
    nodeNum++
    toProcess.push(node)
    // process the next node entry
    cursor += 2
  }
  return metadataSum
}

export const part2 = input => {
}
