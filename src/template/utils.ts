import { getData } from '../data';

export async function loadData(trainingData = false): Promise<number[][]> {
  const result = [];

  const data = await getData(1, trainingData);

  for (const line of data) {
    result.push(line.split(' ').map((x) => parseInt(x, 10)));
  }

  return result;
}
