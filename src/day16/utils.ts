import { getData } from '../data';

export interface SueInterface {
  id: number;
  children?: number;
  cats?: number;
  samoyeds?: number;
  pomeranians?: number;
  akitas?: number;
  vizslas?: number;
  goldfish?: number;
  trees?: number;
  cars?: number;
  perfumes?: number;
}

export async function loadData(trainingData = false): Promise<SueInterface[]> {
  const parseInput = (line: string) => {
    const parts = line.split(' ');
    return {
      id: parseInt(parts[1].replace(':', ''), 10),
      ...parts
        .slice(2)
        .reduce(
          (acc, val, i) =>
            i % 2 !== 0 ? { ...acc, [parts[i + 1].replace(':', '').trim()]: parseInt(val.replace(',', '').trim(), 10) } : acc,
          {}
        ),
    };
  };

  return (await getData(16, trainingData)).map(parseInput) as SueInterface[];
}
