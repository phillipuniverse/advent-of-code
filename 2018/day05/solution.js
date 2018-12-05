var _ = require('lodash');

export const getReactedPolymerLength = input => {
  let idx = 0;
  let final = [];
  while (idx < input.length) {
    // reacting, pop it off
    if (final.length && Math.abs(final[final.length-1].charCodeAt() - input.charCodeAt(idx)) == 32) {
      final.pop();
    } else {
      final.push(input[idx]);
    }
    idx++;
  }
  return final.length;
}

export const findMinimumPolymerLength = input => {
  let minPolymerLength = Number.MAX_SAFE_INTEGER;
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    let len = getReactedPolymerLength(input.replace(new RegExp(c, 'gi'), ''));
    if (len < minPolymerLength) {
      minPolymerLength = len;
    }
  });

  return minPolymerLength;
}
