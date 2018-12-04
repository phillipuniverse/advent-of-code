import { parseAndSort, parseLine, part1, part2 } from './solution.js';
var fs = require('fs');

test("Sorts dates", () => {
  expect(parseAndSort(['[1518-05-23 00:45]',
    '[1518-03-18 00:21]',
    '[1518-09-03 00:58]']).map(i => i.timestamp)).toEqual([new Date('1518-03-18 00:21Z'),
      new Date('1518-05-23 00:45Z'),
      new Date('1518-09-03 00:58Z')]);
});

test("Date subtraction works", () => {
  expect(new Date('1518-05-23 00:45Z').getMinutes()
      - new Date('1518-05-23 00:25Z').getMinutes()).toEqual(20);
});

test("Guard line parsed", () => {
  expect(parseLine('[1518-06-16 00:02] Guard #3413 begins shift')).toEqual({
    timestamp: new Date('1518-06-16 00:02Z'),
    guardNumber: '3413',
    asleep: false,
    awake: false
  });
});

test("Sleep line parsed", () => {
  expect(parseLine('[1518-07-15 00:36] falls asleep')).toEqual({
    timestamp: new Date('1518-07-15 00:36Z'),
    guardNumber: undefined,
    asleep: true,
    awake: false
  });
});

test("Awake line parsed", () => {
  expect(parseLine('[1518-09-10 00:38] wakes up')).toEqual({
    timestamp: new Date('1518-09-10 00:38Z'),
    guardNumber: undefined,
    asleep: false,
    awake: true
  });
});

test("Solution to part 1", () => {
  expect(part1(fs.readFileSync('testinput', 'utf8')
      .split('\n')
      .slice(0, -1))).toEqual(240)
});

test("Solution to part 2", () => {
  expect(part2(fs.readFileSync('testinput', 'utf8')
      .split('\n')
      .slice(0, -1))).toEqual(4455)
});
