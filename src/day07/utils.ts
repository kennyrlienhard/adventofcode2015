import { getData } from '../data';

export enum Action {
  And = 'AND',
  Or = 'OR',
  LeftShift = 'LSHIFT',
  RightShift = 'RSHIFT',
  Not = 'NOT',
  Provide = 'Provide',
}

export interface InstructionInterface {
  action: Action;
  x: string;
  y: string;
  z?: string;
}

export async function loadData(trainingData = false): Promise<InstructionInterface[]> {
  const parseInput = (line: string) => {
    const parts = line.split(' -> ');
    const input = parts[0].split(' ');

    if (input.length === 3) {
      return { action: input[1] as Action, x: input[0], y: input[2], z: parts.at(-1) };
    }

    if (input[0] === Action.Not) {
      return { action: input[0] as Action, x: input[1], y: parts.at(-1) };
    }

    return { action: Action.Provide, x: input[0], y: parts.at(-1) };
  };
  return (await getData(7, trainingData)).map(parseInput);
}
