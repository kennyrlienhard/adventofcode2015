const IS_TRAINING = false;

const PRESENTS = IS_TRAINING ? 150 : 36000000;

function getDivisors(n: number) {
  const result = [];

  for (let i = 1; i <= Math.sqrt(n); i += 1) {
    if (n % i == 0) {
      if (n / i === i) result.push(i);
      else result.push(...[i, n / i]);
    }
  }

  return result;
}

function partA() {
  const PRESENTS_PER_HOUSE = 10;

  let house = 0;
  let presents = 0;

  do {
    house += 1;
    const divisors = getDivisors(house);
    presents = divisors.reduce((acc, d) => acc + d * PRESENTS_PER_HOUSE, 0);
  } while (presents < PRESENTS);

  return house;
}

function partB() {
  const PRESENTS_PER_HOUSE = 11;
  const MAX_HOUSES = 50;

  let house = 0;
  let presents = 0;

  do {
    const nextHouse = house + 1;
    const divisors = getDivisors(nextHouse).filter((d) => nextHouse / d <= MAX_HOUSES);
    presents = divisors.reduce((acc, d) => acc + d * PRESENTS_PER_HOUSE, 0);

    house = nextHouse;
  } while (presents < PRESENTS);

  return house;
}

export default [partA, partB];
