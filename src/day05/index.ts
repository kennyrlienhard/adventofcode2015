import { getData } from '../data';

const VOWELS = 'aeiou';
const FORBIDDEN = new Set(['ab', 'cd', 'pq', 'xy']);

function isNiceA(val: string) {
  const vowels = VOWELS.split('').reduce((acc, letter) => ({ ...acc, [letter]: 0 }), {}) as { [key: string]: number };
  let doubleLetter = false;

  for (let index = 0; index < val.length; index++) {
    const letter = val[index];

    if (index > 0 && FORBIDDEN.has(`${val[index - 1]}${letter}`)) return false;
    if (VOWELS.includes(letter)) vowels[letter] += 1;
    if (index > 0 && letter === val[index - 1]) doubleLetter = true;
  }

  const countVowels = Object.values(vowels).reduce((acc, count) => acc + count, 0);
  return countVowels >= 3 && doubleLetter;
}

function isNiceB(val: string) {
  const pairIndexes = {};
  const pairCounts = {} as { [key: string]: number };

  let trippleLetter = false;

  for (let index = 0; index < val.length; index++) {
    const letter = val[index];

    if (index > 0 && index + 1 < val.length && val[index - 1] === val[index + 1]) {
      trippleLetter = true;
    }

    if (index > 0) {
      const doubleLetter = `${letter}${val[index - 1]}`;
      const doubleLetterIndex = pairIndexes[doubleLetter] || [];

      if (!doubleLetterIndex.includes(index) && !doubleLetterIndex.includes(index - 1)) {
        pairIndexes[doubleLetter] = [...doubleLetterIndex, index, index - 1];
        pairCounts[doubleLetter] = (pairCounts[doubleLetter] || 0) + 1;
      }
    }
  }

  return Math.max(...Object.values(pairCounts)) >= 2 && trippleLetter;
}

async function run(isNice: (val: string) => boolean) {
  const IS_TRAINING = false;

  const data = await getData(5, IS_TRAINING);

  let result = 0;

  data.forEach((line) => {
    if (isNice(line)) result += 1;
  });

  return result;
}

async function partA() {
  return run(isNiceA);
}

async function partB() {
  return run(isNiceB);
}

export default [partA, partB];
