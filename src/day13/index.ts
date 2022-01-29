import { loadData, PersonInterface } from './utils';

const ME = 'Kenny';

function permute(inputArr: string[]) {
  const result = [];

  const run = (arr: string[], m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        run(curr.slice(), m.concat(next));
      }
    }
  };

  run(inputArr);

  return result;
}

function calcHappiness(persons: string[], data: PersonInterface[]) {
  const getGain = (name: string, neighborIndex: number) => {
    if (name === ME || persons[neighborIndex] === ME) return 0;
    return data.find((p) => p.name === name && p.neighbor === persons[neighborIndex]).gain;
  };

  return persons.reduce((acc, name, i) => {
    const neighborA = i + 1 === persons.length ? 0 : i + 1;
    const neighborB = i === 0 ? persons.length - 1 : i - 1;
    return acc + getGain(name, neighborA) + getGain(name, neighborB);
  }, 0);
}

async function partA() {
  const data = await loadData();

  const arrangements = permute(Array.from(new Set(data.map((p) => p.name))));
  const happinesses = arrangements.map((arrangement) => calcHappiness(arrangement, data)).sort((a, b) => b - a);

  return happinesses[0];
}

async function partB() {
  const data = await loadData();

  const arrangements = permute([...Array.from(new Set(data.map((p) => p.name))), ME]);
  const happinesses = arrangements.map((arrangement) => calcHappiness(arrangement, data)).sort((a, b) => b - a);

  return happinesses[0];
}

export async function startThirteen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
