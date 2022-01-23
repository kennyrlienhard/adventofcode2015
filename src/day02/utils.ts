import { getData } from '../data';

export async function loadData(trainingData = false): Promise<[number, number, number][]> {
  const parseInput = (line: string) => {
    return line.split('x').map((val) => parseInt(val, 10)) as [number, number, number];
  };
  return (await getData(2, trainingData)).map(parseInput);
}
