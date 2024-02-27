import { loadData } from './utils';

function getSurface(box: [number, number, number]) {
  const [l, w, h] = box;
  return 2 * l * w + 2 * w * h + 2 * h * l;
}

function getSmallestArea(box: [number, number, number]) {
  const [a, b] = box.sort((c, d) => c - d);
  return a * b;
}

function getVolume(box: [number, number, number]) {
  const [l, w, h] = box;
  return l * w * h;
}

function getRibbonLength(box: [number, number, number]) {
  const [a, b] = box.sort((c, d) => c - d);
  return a + a + b + b + getVolume(box);
}

async function partA() {
  const IS_TRAINING = false;

  const data = await loadData(IS_TRAINING);

  let result = 0;

  data.forEach((box) => {
    result += getSurface(box) + getSmallestArea(box);
  });

  return result;
}

async function partB() {
  const IS_TRAINING = false;

  const data = await loadData(IS_TRAINING);

  let result = 0;

  data.forEach((box) => {
    result += getRibbonLength(box);
  });

  return result;
}

export default [partA, partB];
