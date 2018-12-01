
export const summation = input => {
  let total = 0;
  for (const line of input) {
    let parsed = parse(line)
    let op = parsed[0]
    let val = parsed[1]
    if (op === '+') { total += new Number(val) }
    if (op === '-') { total -= new Number(val) }
  }

  return total;
}

export const parse = line => {
  let matches = line.match(/([+|-])(\d+)/)
  return matches ? matches.slice(1) : []
}
