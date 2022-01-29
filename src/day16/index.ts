import { loadData } from './utils';

const LOOKING_FOR = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

async function partA() {
  const sues = await loadData();

  const result = sues.filter((s) => {
    const keys = Object.keys(s).filter((k) => k !== 'id');
    return keys.filter((k) => s[k] === LOOKING_FOR[k]).length === keys.length;
  });

  if (result.length !== 1) throw new Error('Sue not found.');

  return result[0].id;
}

async function partB() {
  const sues = await loadData();

  const result = sues.filter((s) => {
    const keys = Object.keys(s).filter((k) => k !== 'id');
    return (
      keys.filter((k) => {
        if (['cats', 'trees'].includes(k)) return s[k] > LOOKING_FOR[k];
        if (['pomeranians', 'goldfish'].includes(k)) return s[k] < LOOKING_FOR[k];
        return s[k] === LOOKING_FOR[k];
      }).length === keys.length
    );
  });

  if (result.length !== 1) throw new Error('Sue not found.');

  return result[0].id;
}

export async function startSixteen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
