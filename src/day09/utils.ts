import { getData } from '../data';

export interface LocationInterface {
  from: string;
  to: string;
  distance: number;
}

export async function loadData(trainingData = false): Promise<LocationInterface[]> {
  const parseInput = (line: string) => {
    const from = line.split(' to ')[0];
    const to = line.split(' to ')[1].split(' ')[0];
    const distance = parseInt(line.split(' = ').at(-1), 10);
    return { from, to, distance };
  };

  return (await getData(9, trainingData)).map(parseInput);
}
