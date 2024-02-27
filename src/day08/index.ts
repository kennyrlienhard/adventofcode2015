import { getData } from '../data';

async function partA() {
  const lines = await getData(8, false);
  return lines.reduce((acc, line) => acc + (line.length - eval(line).length), 0);
}

async function partB() {
  const lines = await getData(8, false);
  return lines.reduce((acc, line) => acc + (JSON.stringify(line).length - line.length), 0);
}

export default [partA, partB];
