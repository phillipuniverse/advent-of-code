import { containsExactly, countDiffs, part2, intersection } from './solution.js';

test("Exactly 2 of abcdef", () => {
  expect(containsExactly("abcdef", 2)).toEqual(false);
});

test("Exactly 3 in bababc", () => {
  expect(containsExactly("bababc", 3)).toEqual(true);
});

test("Exactly 2 in bababc", () => {
  expect(containsExactly("bababc", 2)).toEqual(true);
});

test("Differences calculated", () => {
  expect(countDiffs("abcdg", "adgdg")).toEqual(2);
});

test("Intersection works", () => {
  expect(intersection("abcdg", "adgdg")).toEqual('adg');
});

test("Intersection works", () => {
  expect(intersection("hhvsdkatysmiqjxbunezgwcdpr", "hhvsdkatysmiqjxjunezgwcdpr")).toEqual('hhvsdkatysmiqjxunezgwcdpr');
});

test("Candidate solution", () => {
  expect(part2(['abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz']))
    .toEqual('fgij');
});
