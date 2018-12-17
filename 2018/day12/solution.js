const _ = require('lodash')
const leftPad = require('left-pad')

export const part1 = input => {
  let parsed = parse(input)
  // pad the front with 2 on the front and back
  let currentState = '.....' + parsed.initialState
  let offset = 5
  console.log(`0: ${currentState}`)
  let latestGen = ''
  for (let gen = 1; gen <= 20; gen++) {
    if (currentState.startsWith('#')) {
      currentState = leftPad(currentState, '.....')
      offset += 5
    }
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
    console.log(`${gen}: ${latestGen}`);

    // pad front and back for the next iteration
    if (latestGen)
    latestGen = leftPad(latestGen + '..', '..')

    currentState = latestGen
  }
  return latestGen

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
