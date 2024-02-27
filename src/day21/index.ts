import { ItemInterface, loadData, PlayerInterface } from '../day21/utils';

function play(p: PlayerInterface) {
  let player = { ...p };
  let boss = { points: 100, damage: 8, armor: 2, cost: null };

  let playing = 'player';

  while (player.points > 0 && boss.points > 0) {
    const attacker = playing === 'player' ? player : boss;
    const defender = playing === 'player' ? boss : player;
    const damage = attacker.damage - defender.armor < 1 ? 1 : attacker.damage - defender.armor;

    player = playing === 'player' ? player : { ...player, points: player.points - damage };
    boss = playing === 'boss' ? boss : { ...boss, points: boss.points - damage };

    playing = playing === 'player' ? 'boss' : 'player';
  }

  if (boss.points <= 0) return ['player', player, boss];
  return ['boss', player, boss];
}

function createPlayer(items: ItemInterface[]): PlayerInterface {
  return items.reduce(
    (acc, item) => ({
      ...acc,
      cost: acc.cost + item.cost,
      damage: acc.damage + item.damage,
      armor: acc.armor + item.armor,
    }),
    { points: 100, damage: 0, armor: 0, cost: 0 }
  );
}

function isValidCombination(items: ItemInterface[]) {
  const counts = items.reduce((acc, item) => ({ ...acc, [item.kind]: acc[item.kind] + 1 }), { weapon: 0, armor: 0, ring: 0 });
  return counts.weapon === 1 && counts.armor < 2 && counts.ring < 3;
}

function getCombinations(shop: ItemInterface[]) {
  const combi = [];
  let temp = [];
  const slent = Math.pow(2, shop.length);

  for (let i = 0; i < slent; i += 1) {
    temp = [];
    for (let j = 0; j < shop.length; j += 1) {
      if (i & Math.pow(2, j)) {
        temp.push(shop[j]);
      }
    }
    if (temp.length > 0 && isValidCombination(temp)) {
      combi.push(temp);
    }
  }

  return combi.sort((a, b) => a.length - b.length);
}

function getMinWinnerCostOption(options: ItemInterface[][]) {
  let minCosts = -1;

  for (const items of options) {
    const costs = items.reduce((acc, item) => acc + item.cost, 0);
    if (minCosts !== -1 && costs >= minCosts) continue;

    const [winner] = play(createPlayer(items));
    if (winner === 'player') minCosts = costs;
  }

  return minCosts;
}

function getMaxLoserCostOption(options: ItemInterface[][]) {
  let maxCosts = 0;

  for (const items of options) {
    const costs = items.reduce((acc, item) => acc + item.cost, 0);
    if (costs <= maxCosts) continue;

    const [winner] = play(createPlayer(items));
    if (winner === 'boss') maxCosts = costs;
  }

  return maxCosts;
}

async function partA() {
  const shop = await loadData();
  return getMinWinnerCostOption(getCombinations(shop));
}

async function partB() {
  const shop = await loadData();
  return getMaxLoserCostOption(getCombinations(shop));
}

export default [partA, partB];
