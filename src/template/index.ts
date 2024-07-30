import { loadData } from './utils';

const IS_TRAINING = true;

async function partA() {
  const data = await loadData(IS_TRAINING);

  console.log(data);

  return 0;
}

async function partB() {
  const data = await loadData(IS_TRAINING);

  console.log(data);

  return 0;
}

export default [partA, partB];
