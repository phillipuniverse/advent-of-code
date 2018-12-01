
export const part1 = input => {
  let frequency = 0;
  for (const line of input) {
    frequency = execute(parse(line), frequency);
  }
  return frequency;
}

export const part2 = input => {
  let twiceSeenFrequency = undefined;
  let seen = new Set();
  seen.add(0)
  let frequency = 0
  while (twiceSeenFrequency === undefined) {
    for (const line of input) {
      frequency = execute(parse(line), frequency)
      if (seen.has(frequency)) {
        twiceSeenFrequency = frequency;
        break;
      } else {
        seen.add(frequency);
      }
    }
  }
  return twiceSeenFrequency;
}

const execute = (parsed, previousFrequency) => {
  if (!parsed.length) return previousFrequency
  let op = parsed[0];
  let val = parsed[1];
  if (op === '+') { return previousFrequency + new Number(val); }
  if (op === '-') { return previousFrequency - new Number(val); }
}

export const parse = line => {
  let matches = line.match(/([+|-])(\d+)/)
  return matches ? matches.slice(1) : []
}
