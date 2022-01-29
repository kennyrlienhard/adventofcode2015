import { getData } from '../data';

export async function loadData(trainingData = false): Promise<number[]> {
  const parseInput = (line: string) => parseInt(line, 10);
  return (await getData(17, trainingData)).map(parseInput);
}
