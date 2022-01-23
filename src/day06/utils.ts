import { getData } from '../data';

export enum Action {
  Toggle = 'toggle',
  On = 'turn on',
  Off = 'turn off',
}

export interface InstructionInterface {
  action: Action;
  from: [number, number];
  to: [number, number];
}

export async function loadData(trainingData = false): Promise<InstructionInterface[]> {
  const parseInput = (line: string) => {
    const toInt = (val: string) => parseInt(val, 10);

    const parts = line.split(' ');

    const action = parts.slice(0, line.includes(Action.Toggle) ? 1 : 2).join(' ') as Action;
    const from = parts[line.includes(Action.Toggle) ? 1 : 2].split(',').map(toInt) as [number, number];
    const to = parts.at(-1).split(',').map(toInt) as [number, number];

    return { action, from, to };
  };
  return (await getData(6, trainingData)).map(parseInput);
}
