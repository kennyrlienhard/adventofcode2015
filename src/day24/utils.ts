import { getData } from '../data';

export async function loadData(trainingData = false): Promise<number[]> {
  return (await getData(24, trainingData)).map((val) => Number(val));
}
