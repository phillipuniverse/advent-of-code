var _ = require('lodash');

export const part1 = input => {
  let sorted = parseAndSort(input);

  let sleepAnalysis = [];
  let guard;
  let startSleep;
  let endSleep;
  for (const activity of sorted) {
    if (activity.guardNumber) {
      guard = activity.guardNumber;
    } else if (activity.asleep) {
      startSleep = activity.timestamp;
    } else if (activity.awake) {
      endSleep = activity.timestamp;

      // process
      let timeAsleep = endSleep.getMinutes() - startSleep.getMinutes()
      let guardAnalysis = sleepAnalysis[guard];
      if (!guardAnalysis) {
        guardAnalysis = {
          id: guard,
          sleepMarkers: new Array(60).fill(0),
          totalSleep: 0
        }
        sleepAnalysis[guard] = guardAnalysis;
      }

      for (let minute = startSleep.getMinutes(); minute < endSleep.getMinutes(); minute++) {
        guardAnalysis.sleepMarkers[minute]++;
      }
      guardAnalysis.totalSleep += timeAsleep;
    }
  }

  let snoozingGuard = sleepAnalysis.reduce((acc, cur, idx) => cur.totalSleep > acc.totalSleep ? cur : acc );
  let longestMinuteAsleep = snoozingGuard.sleepMarkers.reduce((acc, cur, idx, arr) => cur > arr[acc] ? idx : acc);
  return new Number(snoozingGuard.id) * longestMinuteAsleep;
}
export const parseAndSort = input => {
  // put everything in UTC, I don't need Node to convert it
  return input.map(parseLine)
    .sort((a, b) => a.timestamp - b.timestamp)
}

export const parseLine = line => {
  let timestamp = new Date(line.match(/\[(.+)\]/)[1] + 'Z');
  let guardMatches = line.match(/(\d+) begins shift/)
  let asleep = /asleep/.test(line);
  let awake = /wakes/.test(line);

  return {
    timestamp: timestamp,
    guardNumber: guardMatches ? guardMatches[1] : undefined,
    asleep: asleep,
    awake: awake
  };
}
