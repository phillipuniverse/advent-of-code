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
