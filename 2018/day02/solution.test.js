import { containsExactly } from './solution.js';

test("Exactly 2 of abcdef", () => {
  expect(containsExactly("abcdef", 2)).toEqual(false);
});

test("Exactly 3 in bababc", () => {
  expect(containsExactly("bababc", 3)).toEqual(true);
});

test("Exactly 2 in bababc", () => {
  expect(containsExactly("bababc", 2)).toEqual(true);
});
