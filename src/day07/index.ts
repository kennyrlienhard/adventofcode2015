import { Action, InstructionInterface, loadData } from './utils';

interface WireInterface {
  [key: string]: number;
}

const IS_TRAINING = false;

const MAX = 65535;

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}

function toNumber(value: string, wires: WireInterface): number {
  if (isNumeric(value)) return parseInt(value, 10);
  return wires[value];
}

function evaluateInstruction(instruction: InstructionInterface, wires: WireInterface): [boolean, number, number] {
  const x = toNumber(instruction.x, wires);
  const y = toNumber(instruction.y, wires);
  const valid = typeof x === 'number' && ([Action.Not, Action.Provide].includes(instruction.action) || typeof y === 'number');
  return [valid, x, y];
}

function handleInstruction(instruction: InstructionInterface, wires: WireInterface): [boolean, string?, number?] {
  const [valid, x, y] = evaluateInstruction(instruction, wires);
  if (!valid) return [false];

  switch (instruction.action) {
    case Action.Provide: {
      return [valid, instruction.y, x];
    }
    case Action.Or:
    case Action.And: {
      return [valid, instruction.z, instruction.action === Action.Or ? x | y : x & y];
    }
    case Action.RightShift:
    case Action.LeftShift: {
      return [valid, instruction.z, instruction.action === Action.LeftShift ? x << y : x >> y];
    }
    case Action.Not: {
      return [valid, instruction.y, ~x & MAX];
    }
    default:
      return [false];
  }
}

async function run(overwrite = {}) {
  const instructions = await loadData(IS_TRAINING);

  const wires = {} as WireInterface;

  do {
    instructions.forEach((instruction) => {
      const [valid, key, value] = handleInstruction(instruction, wires);
      if (valid) wires[key] = overwrite[key] || value;
    });
  } while (!wires.a);

  return wires.a;
}

async function partA() {
  return run();
}

async function partB() {
  const a = await run();

  return run({ b: a });
}

export default [partA, partB];
