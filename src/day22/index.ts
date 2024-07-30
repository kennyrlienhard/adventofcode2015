interface ShopItemInterface {
  name: string;
  costs: number;
  damage: number;
  armor: number;
  heals: number;
  timer: number;
  effect: boolean;
  revenue: number;
  active: boolean;
}

enum Mode {
  Normal = 'normal',
  Hard = 'hard',
}

export const SHOP = [
  { name: 'Magic Missile', costs: 53, damage: 4, armor: 0, heals: 0, timer: 0, effect: false, revenue: 0, active: true },
  { name: 'Drain', costs: 73, damage: 2, armor: 0, heals: 2, timer: 0, effect: false, revenue: 0, active: true },
  { name: 'Shield', costs: 113, damage: 0, armor: 7, heals: 0, timer: 6, effect: true, revenue: 0, active: true },
  { name: 'Poison', costs: 173, damage: 3, armor: 0, heals: 0, timer: 6, effect: true, revenue: 0, active: true },
  { name: 'Recharge', costs: 229, damage: 0, armor: 0, heals: 0, timer: 5, effect: true, revenue: 101, active: true },
];

function pickFromShoppingCard(array: ShopItemInterface[]): ShopItemInterface {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return { ...array[0] };
}

function play(mode: Mode) {
  // const SHOP_PICKS = ['Recharge', 'Shield', 'Drain', 'Poison', 'Magic Missile'];

  const boss = { id: 'boss', points: 71, damage: 10, armor: 0, costs: null, cash: null, spending: 0, casted: [] };
  const player = { id: 'player', points: 50, damage: 0, armor: 0, costs: 0, cash: 500, spending: 0, casted: [] };

  function playerHasEnoughCash() {
    const purchasedItems = player.casted.map((item) => item.name);
    return SHOP.filter((item) => item.costs <= player.cash && !purchasedItems.includes(item.name)).length > 0;
  }

  function cast() {
    const purchasedItems = player.casted.map((item) => item.name);
    const shoppingCart = SHOP.filter((item) => item.costs <= player.cash && !purchasedItems.includes(item.name));
    const item = pickFromShoppingCard(shoppingCart);

    // const item = { ...SHOP.find((a) => SHOP_PICKS[0] === a.name) };
    // SHOP_PICKS.splice(0, 1);

    // console.log(`Player casts ${item.name}.`);

    player.casted.push(item);
    player.cash -= item.costs;
    player.spending += item.costs;

    if (item.armor) player.armor += item.armor;
  }

  function applyEffects() {
    for (const item of player.casted) {
      if (!item.active) continue;

      boss.points -= item.damage;

      player.points += item.heals;
      player.cash += item.revenue;

      item.timer -= 1;

      if (item.timer === 0) {
        item.active = false;
        if (item.armor) player.armor -= item.armor;
      }

      // if (item.revenue) {
      //   console.log(`Recharge provides ${item.revenue} mana; its timer is now ${item.timer}.`);
      // } else if (item.armor) {
      //   console.log(`Shield's timer is now ${item.timer}.`);
      // } else {
      //   console.log(`${item.name} deals ${item.damage} damage; its timer is now ${item.timer}.`);
      // }
    }

    player.casted = player.casted.filter((item) => item.active);
  }

  while (player.points > 0 && boss.points > 0 && playerHasEnoughCash()) {
    // console.log('-- Player turn --');
    // console.log(`- Player has ${player.points} hit points, ${player.armor} armor, ${player.cash} mana`);
    // console.log(`- Boss has ${boss.points} hit points`);

    if (mode === Mode.Hard) {
      player.points -= 1;
      if (player.points <= 0) break;
    }

    applyEffects();
    if (boss.points <= 0) break;

    cast();

    if (!player.casted.at(-1).effect) {
      boss.points -= player.casted.at(-1).damage;
      player.points += player.casted.at(-1).heals;
      player.casted.at(-1).active = false;

      if (boss.points <= 0) break;
    }

    // console.log();
    // console.log('-- Boss turn --');
    // console.log(`- Player has ${player.points} hit points, ${player.armor} armor, ${player.cash} mana`);
    // console.log(`- Boss has ${boss.points} hit points`);

    applyEffects();
    if (boss.points <= 0) break;

    const damage = boss.damage - player.armor < 1 ? 1 : boss.damage - player.armor;
    player.points -= damage;
    // console.log(`Boss attacks for ${boss.damage} - ${player.armor} = ${damage} damage.`);
    // console.log();
  }

  if (boss.points <= 0) return player.spending;

  throw new Error('Player lost.');
}

function solve(mode: Mode) {
  const LIMITER = 5;

  let result = Infinity;
  let noLowerBound = 0;
  // let gamesPlayed = 0;

  while ((noLowerBound < LIMITER && mode === Mode.Normal) || (result === Infinity && mode === Mode.Hard)) {
    try {
      const spending = play(mode);

      if (spending < result) {
        result = spending;
        noLowerBound = 0;
      } else {
        noLowerBound += 1;
      }
    } catch (error) {
      // console.log(error.message);
    }

    // gamesPlayed += 1;

    // if (gamesPlayed % 100_000 === 0) {
    //   console.log(`In progress, games played: ${gamesPlayed}. Current result: ${result}, noLowerBound: ${noLowerBound}`);
    // }
  }

  // console.log(`Games played: ${gamesPlayed}`);

  return result;
}

export default [() => solve(Mode.Normal), () => solve(Mode.Hard)];
