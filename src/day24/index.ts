import { loadData } from './utils';

const product = (arr: number[]) => arr.reduce((acc, val) => acc * val, 1);

const sum = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0);

const sort = (a: number[], b: []) => {
  if (a.length === b.length) return product(a) - product(b);
  return a.length - b.length;
};

function createGroups(total: number, arr: number[], lastIndex = arr.length) {
  let allGroups = [] as number[][];

  for (let i = lastIndex; i >= 0; i -= 1) {
    if (total - arr[i] === 0) {
      allGroups.push([arr[i]]);
    } else if (total - arr[i] > 0) {
      const subGroups = createGroups(total - arr[i], arr, i - 1);
      for (let j = 0; j < subGroups.length; j += 1) subGroups[j].push(arr[i]);
      allGroups = allGroups.concat(subGroups);
    }
  }

  if (!allGroups.length) return allGroups;

  const shortest = Math.min(...allGroups.map((g) => g.length));

  return allGroups
    .map((groups) => groups.sort((a, b) => a - b))
    .filter((a, i) => {
      if (a.length !== shortest) return false;
      return !allGroups.find((f, fi) => i > fi && a.toString() === f.toString());
    });
}

async function run(numberOfGroups: number) {
  const arr = await loadData(false);
  const total = sum(arr);

  const groups = createGroups(total / numberOfGroups, arr).sort(sort);

  return product(
    groups.find((group) => {
      const remainder = arr.filter((p) => group.indexOf(p) === -1);
      if (createGroups(total / numberOfGroups, remainder).length) return true;
      return null;
    })
  );
}

export default [() => run(3), () => run(4)];
