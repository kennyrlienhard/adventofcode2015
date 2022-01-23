import { getData } from '../data';

async function partA() {
  const IS_TRAINING = false;

  const data = (await getData(1, IS_TRAINING))[0];

  return data.split('').reduce((acc, val) => {
    if (val === '(') return acc + 1;
    if (val === ')') return acc - 1;
    return acc;
  }, 0);
}

async function partB() {
  const IS_TRAINING = false;
  const BASEMENT = -1;

  let floor = 0;
  let position = 0;

  const data = (await getData(1, IS_TRAINING))[0].split('');

  for (const [i, val] of data.entries()) {
    if (val === '(') floor += 1;
    else if (val === ')') floor -= 1;

    if (floor === BASEMENT) {
      position = i + 1;
      break;
    }
  }

  return position;
}

export async function startOne() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
