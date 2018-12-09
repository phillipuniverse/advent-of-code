var _ = require('lodash');

export const part1 = input => {
  let dependencies = parse(input)
  let toProcess = Object.keys(dependencies).filter(el => dependencies[el].parents.length == 0)
  console.log(`Start ${toProcess}`)
  let order = ''
  let processed = new Set()
  while (toProcess.length > 0) {
    toProcess.sort()
    // pull out from beginning since sorted
    let current = toProcess.shift()
    let children = dependencies[current].children
    console.log(`Processing ${current} and its children ${children}`)
    order += current
    processed.add(current)
    children.forEach(c => {
      if (dependencies[c].parents.every(p => processed.has(p))) {
        // append onto the end
        toProcess.push(c)
      }
    })
    // re-sort what I'm about to process
  }
  return order
}

export const part2 = (input, availableWorkers, delay) => {
  console.log(`Working with ${availableWorkers} workers`)
  let dependencies = parse(input)
  let toProcess = Object.keys(dependencies).filter(el => dependencies[el].parents.length == 0)
  console.log(`Start ${toProcess}`)
  let order = ''
  let processed = new Set()
  let workers = Array(availableWorkers).fill()
  let tick = 0;
  // nothing to process and nobody is working
  while (toProcess.length > 0 || workers.find(w => w != undefined)) {
    toProcess.sort()

    // If there is more to process and I have free workers, give them work
    // Have all the workers 'work' by decrementing time
    // Check if time is zero. If it is, add to processed, queue the children,
    // pull out from beginning since sorted
    // distribute to each of the workers
    console.log(`Distributing load to ${availableWorkers} workers`)
    for (let workerNumber = 0; workerNumber < availableWorkers; workerNumber++) {
      // worker not doing anything
      console.log(`Worker ${workerNumber} working on ${JSON.stringify(workers[workerNumber])}`)
      if (!workers[workerNumber]) {
        let step = toProcess.shift()
        // if there is more work, give it to a worker
        if (step) {
          console.log(`Giving ${step} to worker ${workerNumber}`)
          workers[workerNumber] = {
            step: step,
            tick: delay + (step.charCodeAt() - 64)
          }
        }
      }
    }
    console.log(`Workers: ${JSON.stringify(workers)}`)

    // now, work on the items until I have a worker that has finished
    let completedWork = undefined
    while (!completedWork) {
      // decrement time from all busy workers
      workers.forEach(w => {
        //console.log(`Looking at ${w}`)
        if (w && w.tick != 0) {
          w.tick--;
        }
      })
      completedWork = workers.find(w => w && w.tick == 0)
      tick++
    }
    // now I've finished working on something. Take that and process it
    let current = completedWork.step
    // reset the worker to get more work in a sec
    workers[workers.findIndex(w => w && w.step == current)] = undefined
    console.log(`Finished working on ${current} in : ${tick}s`)

    let children = dependencies[current].children
    console.log(`Processing ${current} and its children ${children}`)
    order += current
    processed.add(current)
    children.forEach(c => {
      if (dependencies[c].parents.every(p => processed.has(p))) {
        // append onto the end
        toProcess.push(c)
      }
    })
  }
  console.log(`Final ticks: ${tick}`)
  return {time: tick, order: order}
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
