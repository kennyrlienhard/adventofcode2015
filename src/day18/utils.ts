import { getData } from '../data';

export async function loadData(trainingData = false): Promise<boolean[][]> {
  const parseInput = (line: string) => line.split('').map((light) => light === '#');
  return (await getData(18, trainingData)).map(parseInput);
}
