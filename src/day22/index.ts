import { SHOP, PlayerInterface, CastInterface } from './utils';

function countCast(cast: CastInterface[]) {
  return cast.reduce(
    (acc, item) => ({
      damage: acc.damage + item.damage,
      armor: acc.armor + item.armor,
      heals: acc.heals + item.heals,
      revenue: acc.revenue + item.revenue,
    }),
    { damage: 0, heals: 0, armor: 0, revenue: 0 }
  );
}

function purchase(player: PlayerInterface, item: CastInterface) {
  return {
    ...player,
    cash: player.cash - item.costs,
    costs: player.costs + item.costs,
    casted: [...player.casted, { ...item, effect: item.timer }],
  };
}

function getNextPlayers(player: PlayerInterface, boss: PlayerInterface, playerTurn: boolean) {
  const { damage, heals, armor, revenue } = countCast(player.casted);

  const nextBoss = { ...boss, points: boss.points - damage };

  const nextPlayer = {
    ...player,
    armor: player.armor + armor,
    cash: player.cash + revenue,
    casted: player.casted
      .map((item) => ({ ...item, effect: item.effect > 0 ? item.effect - 1 : 0 }))
      .filter((item) => item.effect > 0),
  };

  if (nextBoss.points <= 0) return [nextPlayer, nextBoss];

  const damagePlayerBy = playerTurn ? 0 : boss.damage - nextPlayer.armor < 1 ? 1 : boss.damage - nextPlayer.armor;
  return [{ ...nextPlayer, points: player.points - damagePlayerBy + heals }, nextBoss];
}

function getPurchaseOptions(p: PlayerInterface) {
  const casted = p.casted.map((item) => item.name);
  return [...SHOP.filter((item) => item.costs <= p.cash && !casted.includes(item.name))];
}

function getMinWinnerCostOption(player: PlayerInterface, boss: PlayerInterface) {
  let minCosts = -1;

  function play(p1: PlayerInterface, p2: PlayerInterface, playerTurn: boolean) {
    if (p2.points <= 0) {
      if (p1.costs < minCosts || minCosts === -1) {
        console.log('won', p1, p2);

        minCosts = p1.costs;
      }
    } else if (p1.points > 0) {
      if (playerTurn) {
        getPurchaseOptions(p1).forEach((item) => {
          const [nextP1, nextP2] = getNextPlayers(purchase(p1, item), p2, playerTurn);
          play(nextP1, nextP2, !playerTurn);
        });
      } else {
        const [nextP1, nextP2] = getNextPlayers(p1, p2, playerTurn);
        play(nextP1, nextP2, !playerTurn);
      }
    }
  }

  getPurchaseOptions(player).forEach((item) => {
    play(purchase(player, item), { ...boss }, false);
  });

  return minCosts;
}

function partA() {
  const boss = { points: 71, damage: 10, armor: 0, costs: null, cash: null, casted: [] };
  const player = { points: 50, damage: 0, armor: 0, costs: 0, cash: 500, casted: [] };

  return getMinWinnerCostOption(player, boss);
}

export default [partA];
