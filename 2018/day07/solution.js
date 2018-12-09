var _ = require('lodash');

export const part1 = input => {
  let dependencies = parse(input)
  let toProcess = Object.keys(dependencies).filter(el => dependencies[el].parents.length == 0)
  toProcess.sort()
  console.log(`Start ${toProcess}`)
  let order = ''
  let processed = new Set()
  while (toProcess.length > 0) {
    let current = toProcess.shift()
    let children = dependencies[current].children
    console.log(`Processing ${current} and its children ${children}`)
    order += current
    processed.add(current)
    children.forEach(c => {
      if (dependencies[c].parents.every(p => processed.has(p))) {
        toProcess.push(c)
      }
    })
    // re-sort what I'm about to process
    toProcess.sort()
  }
  return order
}

export const part2 = (input, lessThanDistance) => {

}


export const parse = input => {
  let steps = {}
  input.forEach(el => {
    let step = el.match(/Step (\w) must/)[1]
    let child = el.match(/before step (\w) can/)[1]
    if (!steps[child]) {
      steps[child] = {
        parents: [],
        children: []
      }
    }
    if (!steps[step]) {
      steps[step] = {
        parents: [],
        children: []
      }
    }
    steps[child].parents.push(step)
    steps[step].children.push(child)
    steps[step].children.sort()
  })
  console.log(JSON.stringify(steps))
  return steps;
}
