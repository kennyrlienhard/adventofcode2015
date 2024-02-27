import { loadData } from './utils';

function printGrid(steps: number, grid: boolean[][]) {
  console.log(`After ${steps} step:`);

  grid.forEach((line) => {
    console.log(line.map((light) => (light ? '#' : '.')).join(''));
  });

  console.log();
}

function countLights(grid: boolean[][]) {
  return grid.reduce((count, line) => count + line.reduce((acc, light) => acc + (light ? 1 : 0), 0), 0);
}

function getLight([y, x]: [number, number], grid: boolean[][], stuckOn = []) {
  try {
    const isStuck = stuckOn.length && Boolean(stuckOn.find((on) => on[0] === y && on[1] === x));
    if (isStuck) return true;

    return Boolean(grid[y][x]);
  } catch (error) {
    return false;
  }
}

function toggleLight(y: number, x: number, grid: boolean[][], stuckOn = []) {
  const isStuck = stuckOn.length && Boolean(stuckOn.find((on) => on[0] === y && on[1] === x));
  if (isStuck) return true;

  const lights = [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x + 1],
    [y, x - 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ].map((coordinates) => getLight(coordinates as [number, number], grid, stuckOn));

  const lightsOn = lights.reduce((acc, light) => acc + (light ? 1 : 0), 0);

  if (grid[y][x]) return lightsOn === 3 || lightsOn === 2;

  return lightsOn === 3;
}

function runStep(grid: boolean[][], stuckOn: [number, number][]) {
  return grid.map((line, lineIndex) => {
    return line.map((light, lightIndex) => toggleLight(lineIndex, lightIndex, grid, stuckOn));
  });
}

async function solve(withStuckOn = false) {
  const IS_TRAINING = false;
  const STEPS = IS_TRAINING ? 5 : 100;

  let grid = await loadData(IS_TRAINING);
  if (IS_TRAINING) printGrid(0, grid);

  const stuckOn = withStuckOn
    ? [
        [0, 0],
        [0, grid[0].length - 1],
        [grid.length - 1, 0],
        [grid.length - 1, grid[0].length - 1],
      ]
    : [];

  for (let round = 0; round < STEPS; round += 1) {
    grid = runStep(grid, stuckOn as [number, number][]);
    if (IS_TRAINING) printGrid(round + 1, grid);
  }

  return countLights(grid);
}

async function partA() {
  return solve();
}

async function partB() {
  return solve(true);
}

export default [partA, partB];
