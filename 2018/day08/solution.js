var _ = require('lodash');

export const part1And2 = input => {
  let metadataSum = 0
  let cursor = 0
  let nodeNum = 1
  let toProcess = []
  let tree = undefined
  let parent = undefined
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
          currentNode.metadata.push(md)
          currentNode.metadataLeft--
          cursor++
        }
        // now this is fully processed, pop if off and restart
        toProcess.pop()
        continue
      } else {
        currentNode.childrenLeft--
        parent = currentNode
      }
    }
    console.log(`Queueing node ${nodeNum} at index ${cursor}`)
    let node = {
      id: nodeNum,
      childrenLeft: parseInt(input[cursor]),
      metadataLeft: parseInt(input[cursor+1]),
      children: [],
      metadata: []
    }
    if (parent) {
      parent.children.push(node)
    }
    if (!tree) {
      tree = parent
    }
    nodeNum++
    toProcess.push(node)
    // process the next node entry
    cursor += 2
  }
  console.log(`Tree: ${JSON.stringify(tree)}`)

  // process the tree
  let totalValue = calculateValue(tree)

  return {
    metadataSum: metadataSum,
    value: totalValue
  }
}

export const calculateValue = node => {
  let sum = 0
  if (node.children.length == 0) {
    sum = _.sum(node.metadata)
  } else {
    // I have children, so metadata are indexes of the values of each one
    node.metadata.forEach(md => {
      // metadata is 1-indexed, so need to subtract
      let child = node.children[md - 1]
      if (child) {
        sum += calculateValue(child)
      }
    })
  }
  console.log(`Value of node ${node.id} is ${sum}`)
  return sum
}
