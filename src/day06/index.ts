import { Action, InstructionInterface, loadData } from './utils';

const LENGTH = 1000;

const IS_TRAINING = false;

function count(config: number[][]) {
  const lineReducer = (line: number[]) => line.reduce((acc, light) => acc + light, 0);
  return config.reduce((acc, line) => acc + lineReducer(line), 0);
}

function printConfig(config: number[][]) {
  config.forEach((line) => {
    console.log(line.join(''));
  });

  console.log();
}

function handleLight(instruction: InstructionInterface, config: number[][]) {
  const result = config.map((line) => [...line]);

  for (let y = instruction.from[1]; y <= instruction.to[1]; y += 1) {
    for (let x = instruction.from[0]; x <= instruction.to[0]; x += 1) {
      if (instruction.action === Action.On) result[y][x] = 1;
      else if (instruction.action === Action.Off) result[y][x] = 0;
      else if (instruction.action === Action.Toggle) result[y][x] = result[y][x] === 0 ? 1 : 0;
    }
  }

  return result;
}

function handleBrightness(instruction: InstructionInterface, config: number[][]) {
  const result = config.map((line) => [...line]);

  for (let y = instruction.from[1]; y <= instruction.to[1]; y += 1) {
    for (let x = instruction.from[0]; x <= instruction.to[0]; x += 1) {
      if (instruction.action === Action.On) result[y][x] += 1;
      else if (instruction.action === Action.Off) result[y][x] -= result[y][x] > 0 ? 1 : 0;
      else if (instruction.action === Action.Toggle) result[y][x] += 2;
    }
  }

  return result;
}

async function run(handler: (instruction: InstructionInterface, config: number[][]) => number[][]) {
  const instructions = await loadData(IS_TRAINING);
  let config = new Array(LENGTH).fill(new Array(LENGTH).fill(0));

  instructions.forEach((instruction) => {
    config = handler(instruction, config);
  });

  return count(config);
}

async function partA() {
  return run(handleLight);
}

async function partB() {
  return run(handleBrightness);
}

export default [partA, partB];
