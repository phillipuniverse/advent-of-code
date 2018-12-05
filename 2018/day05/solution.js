var _ = require('lodash');

export const part1 = input => {
  let processed = input;
  let idx = 0;
  while (idx < processed.length - 1) {
    if (Math.abs(processed.charCodeAt(idx) - processed.charCodeAt(idx + 1)) == 32) {
      processed = processed.substring(0, idx) + processed.substring(idx + 2);
      idx -= 2;
    } else {
      idx++;
    }
  }
  return processed;
}
