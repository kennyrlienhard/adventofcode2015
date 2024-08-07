import day01 from './day01';
import day02 from './day02';
import day03 from './day03';
import day04 from './day04';
import day05 from './day05';
import day06 from './day06';
import day07 from './day07';
import day08 from './day08';
import day09 from './day09';
import day10 from './day10';
import day11 from './day11';
import day12 from './day12';
import day13 from './day13';
import day14 from './day14';
import day15 from './day15';
import day16 from './day16';
import day17 from './day17';
import day18 from './day18';
import day19 from './day19';
import day20 from './day20';
import day21 from './day21';
import day22 from './day22';
import day23 from './day23';
import day24 from './day24';
import day25 from './day25';

const PUZZLES = [
  day01,
  day02,
  day03,
  day04,
  day05,
  day06,
  day07,
  day08,
  day09,
  day10,
  day11,
  day12,
  day13,
  day14,
  day15,
  day16,
  day17,
  day18,
  day19,
  day20,
  day21,
  day22,
  day23,
  day24,
  day25,
];

const DAYS_TO_SOLVE = [22];

function printResult(result: { day: number; part: number; start: Date; end: Date; value: number }) {
  console.log(`Day ${('0' + result.day).slice(-2)}. Part ${result.part}: ${result.value}`);
  console.log(`Exucted in ${(result.end.getTime() - result.start.getTime()) / 1000}s`);
  console.log();
}

async function solvePuzzlesForDays(days: number[]) {
  for (const day of days) {
    for (let i = 0; i < PUZZLES[day - 1].length; i += 1) {
      const start = new Date();
      const value = await PUZZLES[day - 1][i]();
      printResult({ day, part: i + 1, start, end: new Date(), value });
    }
  }
}

solvePuzzlesForDays(DAYS_TO_SOLVE);
