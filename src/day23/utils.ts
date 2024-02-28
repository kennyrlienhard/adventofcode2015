import { getData } from '../data';

type Instruction = [cmd: string, register?: string, offset?: number];

export async function loadData(trainingData = false): Promise<Instruction[]> {
  return (await getData(23, trainingData)).map((line) => {
    if (line.startsWith('jmp')) {
      const [cmd, offset] = line.split(' ');
      return [cmd, null, parseInt(offset, 10)];
    } else {
      const [instructions, offset] = line.split(', ');
      const [cmd, register] = instructions.split(' ');
      return [cmd, register, ...(offset ? [parseInt(offset, 10)] : [])] as unknown as Instruction;
    }
  });
}
