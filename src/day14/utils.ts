import { getData } from '../data';

export interface ReindeerInterface {
  name: string;
  speed: number;
  duration: number;
  restTime: number;
  timeLeftResting: number;
  timeLeftRunning: number;
  noRestSince: number;
  distance: number;
  resting: boolean;
  score: number;
}

export async function loadData(trainingData = false): Promise<ReindeerInterface[]> {
  const parseInput = (line: string) => {
    const parts = line.trim().split(' ');
    const duration = parseInt(parts[6], 10);
    return {
      name: parts[0],
      speed: parseInt(parts[3], 10),
      duration,
      restTime: parseInt(parts.at(-2), 10),
      timeLeftResting: 0,
      timeLeftRunning: duration,
      noRestSince: 0,
      distance: 0,
      resting: false,
      score: 0,
    };
  };

  return (await getData(14, trainingData)).map(parseInput);
}
