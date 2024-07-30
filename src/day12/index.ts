import { getData } from '../data';

async function run(filter: (val: unknown) => boolean) {
  const data = JSON.parse((await getData(12))[0]);

  let result = 0;

  function parse(object: unknown) {
    const values = Array.isArray(object) ? [...object] : Object.keys(object).map((k) => object[k]);

    const nextObjects = values.filter((val) => typeof val === 'object' && filter(val));

    result += values.filter((val) => typeof val === 'number').reduce((acc, val) => acc + Number(val), 0);

    nextObjects.forEach((nextObject) => {
      parse(nextObject);
    });
  }

  parse(filter(data) ? data : []);

  return result;
}

async function partA() {
  const isValid = () => true;
  return run(isValid);
}

async function partB() {
  const isValid = (val: unknown) => Array.isArray(val) || Object.keys(val).filter((k) => val[k] === 'red').length === 0;
  return run(isValid);
}

export default [partA, partB];
