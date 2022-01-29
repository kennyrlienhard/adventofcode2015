import { getData } from '../data';

export interface IngredientInterface {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
}

export async function loadData(trainingData = false): Promise<{ [key: string]: IngredientInterface }> {
  const ingredients = [];

  const parseInput = (line: string) => {
    const parts = line.replace(':', '').trim().split(' ');
    ingredients.push(parts[0]);
    return parts.slice(1).reduce((acc, val, i) => (i % 2 !== 0 ? { ...acc, [parts[i]]: parseInt(val, 10) } : acc), {});
  };

  const data = (await getData(15, trainingData)).map(parseInput) as IngredientInterface[];

  return ingredients.reduce((acc, ingredient, i) => ({ ...acc, [ingredient]: data[i] }), {});
}
