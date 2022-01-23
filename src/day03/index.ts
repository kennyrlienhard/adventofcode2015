import { getData } from '../data';

function countHouses(path: [number, number][]) {
  return new Set(path.map((p) => p.join(','))).size;
}

function createPath(cmds: string[]) {
  const START = [0, 0];

  const path = [[...START]] as [number, number][];

  cmds.forEach((cmd) => {
    const [x, y] = path.at(-1);

    if (cmd === '^') path.push([x, y - 1]);
    else if (cmd === '>') path.push([x + 1, y]);
    else if (cmd === 'v') path.push([x, y + 1]);
    else if (cmd === '<') path.push([x - 1, y]);
  });

  return path;
}

async function partA() {
  const IS_TRAINING = false;

  const cmds = (await getData(3, IS_TRAINING))[0];

  return countHouses(createPath(cmds.split('')));
}

async function partB() {
  const IS_TRAINING = false;

  const cmds = (await getData(3, IS_TRAINING))[0];

  const cmdsSet1 = cmds.split('').filter((c, i) => i % 2 === 0);
  const cmdsSet2 = cmds.split('').filter((c, i) => i % 2 !== 0);

  return countHouses([...createPath(cmdsSet1), ...createPath(cmdsSet2)]);
}

export async function startThree() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
