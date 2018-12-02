var _ = require('lodash');

/**
 * Returns true or false if str contains count duplicated characters
 * @param  String str string to check
 * @return Boolean     true or false if str contains count number of duplicated characters
 */
export const containsExactly = (str, count) => {
  let charTable = {};
  Array.from(str).forEach((char) => {incrementInTable(char, charTable)});
  return _.values(charTable).includes(count);
}

const incrementInTable = (char, table) => {
  table[char] == undefined ? table[char] = 1: ++table[char];
}

export const part2 = input => {
  let matchingSingleDifferenceIds;
  input.forEach(id => {
    input.forEach(comparingId => {
      if (countDiffs(id, comparingId) === 1) {
        matchingSingleDifferenceIds = intersection(id, comparingId);
        return;
      }
    });
  });
  return matchingSingleDifferenceIds;
}

export const intersection = (str1, str2) => {
  return Array.from(str1)
    .filter((char, idx) => char == str2.charAt(idx))
    .join('');
}

/**
 * Assumes both IDs are the same length
 */
export const countDiffs = (id, comparisonId) => {
  let diffs = 0;
  Array.from(id).forEach((char, idx) => {
    // I think this is my favorite thing about Javascript. 1 + false == 1, and
    // 1 + true == 2!
    diffs += (char != comparisonId.charAt(idx));
  });
  return diffs;
}
