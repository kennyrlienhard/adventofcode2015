import { loadData, PROD_INPUT } from './utils';

const IS_TRAINING = false;
const INPUT = IS_TRAINING ? 'HOHOHO' : PROD_INPUT;

function generateMolecules(replacements: [string, string][], molecule: string, reverse = false) {
  const result = replacements.map(([a, b]) => {
    const chars = reverse ? b : a;
    const replaceWith = reverse ? a : b;

    const matches = [...molecule.matchAll(new RegExp(chars, 'g'))];
    return matches.map((match) => `${molecule.slice(0, match.index)}${replaceWith}${molecule.slice(match.index + chars.length)}`);
  });

  return [...new Set(result.flat())];
}

async function partA() {
  const replacements = await loadData(IS_TRAINING);
  const molecules = generateMolecules(replacements, INPUT);

  return molecules.length;
}

function canBeTransformedToE(molecules: string[], replacements: string[]) {
  for (let i = 0; i < molecules.length; i += 1) {
    if (replacements.includes(molecules[i])) return true;
  }

  return false;
}

async function partB() {
  const replacements = await loadData(IS_TRAINING);

  let currentMolecules = [INPUT] as string[];
  let steps = 0;

  const transformToE = replacements.filter(([val]) => val === 'e').map(([, val]) => val);

  while (!canBeTransformedToE(transformToE, currentMolecules)) {
    steps += 1;

    const nextMolecules = currentMolecules.map((molecule) => generateMolecules(replacements, molecule, true));

    currentMolecules = [...new Set([...currentMolecules, ...nextMolecules.flat()])]
      .sort((a, b) => a.length - b.length)
      .slice(0, 100);
  }

  return steps + 1;
}

export async function startNineteen() {
  return Promise.all([partA, partB].map((puzzle) => puzzle()));
}
