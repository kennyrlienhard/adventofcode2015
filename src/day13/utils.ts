import { getData } from '../data';

export interface PersonInterface {
  name: string;
  neighbor: string;
  gain: number;
}

export async function loadData(trainingData = false): Promise<PersonInterface[]> {
  const parseInput = (line: string) => {
    const parts = line.replace('.', '').trim().split(' ');
    const gain = parseInt(`${line.includes('lose') ? '-' : ''}${line.split(' happiness ')[0].split(' ').at(-1)}`, 10);
    return { name: parts[0], neighbor: parts.at(-1), gain };
  };

  return (await getData(13, trainingData)).map(parseInput);
}
