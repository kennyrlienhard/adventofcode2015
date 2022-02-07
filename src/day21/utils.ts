import { getData } from '../data';

export interface ItemInterface {
  name: string;
  kind: 'weapon' | 'armor' | 'ring';
  cost: number;
  damage: number;
  armor: number;
}

export interface PlayerInterface {
  points: number;
  damage: number;
  armor: number;
  cost: number;
}

const MAP_KIND = ['weapon', 'armor', 'ring'];

export async function loadData(): Promise<ItemInterface[]> {
  const input = await getData(21);
  let shopIndex = -1;
  let updateIndexOnNext = true;

  return input.reduce((acc, item) => {
    if (updateIndexOnNext) {
      updateIndexOnNext = false;
      shopIndex += 1;
      return acc;
    }

    if (!item) {
      updateIndexOnNext = true;
      return acc;
    }

    const [name, cost, damage, armor] = item.replace(/\s\s+/g, ' ').split(' ');
    return [
      ...acc,
      { name, kind: MAP_KIND[shopIndex], cost: parseInt(cost, 10), damage: parseInt(damage, 10), armor: parseInt(armor, 10) },
    ];
  }, []);
}
