import { loadData } from './utils';

const IS_TRAINING = false;
const TOTAL_LITERS = IS_TRAINING ? 25 : 150;

function getCombinations(valuesArray: number[]) {
  const combi = [];
  let temp = [];
  const slent = Math.pow(2, valuesArray.length);

  for (let i = 0; i < slent; i += 1) {
    temp = [];
    for (let j = 0; j < valuesArray.length; j += 1) {
      if (i & Math.pow(2, j)) {
        temp.push(valuesArray[j]);
      }
    }
    if (temp.length > 0) {
      combi.push(temp);
    }
  }

  return combi.sort((a, b) => a.length - b.length);
}

async function partA() {
  const allContainers = await loadData(IS_TRAINING);

  return getCombinations(allContainers).reduce((count, c) => {
    const liters = c.reduce((acc, val) => acc + val, 0);
    return count + (liters === TOTAL_LITERS ? 1 : 0);
  }, 0);
}

async function partB() {
  const allContainers = await loadData(IS_TRAINING);

  const combinations = getCombinations(allContainers)
    .filter((c) => {
      return c.reduce((acc, val) => acc + val, 0) === TOTAL_LITERS;
    }, 0)
    .sort((a, b) => a.length - b.length);

  return combinations.filter((c) => c.length === combinations[0].length).length;
}

export default [partA, partB];
