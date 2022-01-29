import { loadData, IngredientInterface } from './utils';

function getProps(weights: number[], data: { [key: string]: IngredientInterface }): { [key: string]: number } {
  const ingredients = Object.keys(data);

  return weights.reduce((acc, w, i) => {
    Object.keys(data[ingredients[i]]).forEach((k) => {
      acc[k] = (acc[k] || 0) + w * data[ingredients[i]][k];
    });
    return acc;
  }, {});
}

function getScore(weights: number[], data: { [key: string]: IngredientInterface }) {
  const props = getProps(weights, data);

  return Object.keys(props)
    .filter((k) => k !== 'calories')
    .reduce((acc, k) => acc * (props[k] > 0 ? props[k] : 0), 1);
}

async function partA() {
  const TEASPOONS = 100;
  const data = await loadData();

  let maxScore = 0;

  for (let i = 0; i <= TEASPOONS; i++) {
    for (let ii = TEASPOONS - i; ii >= 0; ii--) {
      for (let iii = TEASPOONS - i - ii; iii >= 0; iii--) {
        const iv = TEASPOONS - i - ii - iii;
        const score = getScore([i, ii, iii, iv], data);
        if (score > maxScore) maxScore = score;
      }
    }
  }

  return maxScore;
}

async function partB() {
  const TEASPOONS = 100;
  const data = await loadData();

  let maxScore = 0;

  for (let i = 0; i <= TEASPOONS; i++) {
    for (let ii = TEASPOONS - i; ii >= 0; ii--) {
      for (let iii = TEASPOONS - i - ii; iii >= 0; iii--) {
        const iv = TEASPOONS - i - ii - iii;

        const weights = [i, ii, iii, iv];
        const props = getProps(weights, data);
        const score = getScore(weights, data);

        if (score > maxScore && props.calories === 500) maxScore = score;
      }
    }
  }

  return maxScore;
}

export async function startFiveteen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
