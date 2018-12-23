const _ = require('lodash')
const leftPad = require('left-pad')

export const part1And2 = (input, generations) => {
  let parsed = parse(input)
  let offset = 0
  let currentState = parsed.initialState
  console.log(`0: ${currentState}`)
  console.log(`${JSON.stringify(parsed)}`)
  let latestGen = ''
  for (let gen = 1; gen <= generations; gen++) {
    currentState = '....' + currentState + '....'
    offset += 4
    latestGen = ''
    let chars = currentState.split('')
    chars.forEach((c, idx) => {
      // padding front and back every time, only look at places where I can get
      // 5 characters next to each other
      if (idx >= 2 && idx <= chars.length - 3) {
        let key =  chars[idx-2] + chars[idx-1] + c + chars[idx+1] + chars[idx+2]
        // console.log(`Checking pattern ${key}`)
        let newPlant = parsed.patterns[key]
        latestGen += newPlant ? newPlant : '.'
      } else {
        latestGen += '.'
      }
    })

    currentState = latestGen
  }

  let total = 0
  latestGen.split('').forEach((c, idx) => {
    // substract off all the characters I added
    let offsetIndex = idx - offset
    total += (c == '#' ? offsetIndex : 0)
  })

  return {
    final: latestGen,
    total: total
  }
}

export const parse = rawLines => {
  return {
    initialState: rawLines[0].match(/initial state: (.+?)$/)[1],
    patterns: rawLines.slice(2).reduce((patterns, el) => {
      patterns[el.match(/^([.#]{5})/)[1]] = el.match(/([.#])$/)[1]
      return patterns
    }, {})
  }
}
