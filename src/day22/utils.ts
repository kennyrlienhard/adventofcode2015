export const SHOP = [
  { name: 'Magic Missile', costs: 53, damage: 4, armor: 0, heals: 0, timer: 0, effect: 0, revenue: 0 },
  { name: 'Drain', costs: 73, damage: 2, armor: 0, heals: 2, timer: 0, effect: 0, revenue: 0 },
  { name: 'Shield', costs: 113, damage: 4, armor: 7, heals: 0, timer: 6, effect: 0, revenue: 0 },
  { name: 'Poison', costs: 173, damage: 3, armor: 0, heals: 0, timer: 6, effect: 0, revenue: 0 },
  { name: 'Recharge', costs: 229, damage: 4, armor: 0, heals: 0, timer: 5, effect: 0, revenue: 101 },
];

export interface CastInterface {
  name: string;
  costs: number;
  damage: number;
  armor: number;
  heals: number;
  timer: number;
  effect: number;
  revenue: number;
}

export interface PlayerInterface {
  points: number;
  armor: number;
  damage: number;
  costs: number;
  cash: number;
  casted: CastInterface[];
}
