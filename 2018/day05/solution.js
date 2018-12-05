var _ = require('lodash');

export const getReactedPolymer = input => {
  let processed = input;
  let idx = 0;
  while (idx < processed.length - 1) {
    if (Math.abs(processed.charCodeAt(idx) - processed.charCodeAt(idx + 1)) == 32) {
      processed = processed.substring(0, idx) + processed.substring(idx + 2);
      idx--;
    } else {
      idx++;
    }
  }
  return processed;
}

export const findMinimumPolymerLength = input => {
  let minPolymerLength = Number.MAX_SAFE_INTEGER;
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    let polymer = getReactedPolymer(input.replace(new RegExp(c, 'gi'), ''));
    if (polymer.length < minPolymerLength) {
      minPolymerLength = polymer.length;
    }
  });

  return minPolymerLength;
}
