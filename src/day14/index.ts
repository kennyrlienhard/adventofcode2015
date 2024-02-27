import { loadData, ReindeerInterface } from './utils';

const IS_TRAINING = false;
const TIME = IS_TRAINING ? 1000 : 2503;

function move(reindeer: ReindeerInterface) {
  const timeLeftRunning = reindeer.timeLeftRunning - 1;

  return {
    ...reindeer,
    timeLeftRunning,
    timeLeftResting: timeLeftRunning === 0 ? reindeer.restTime : 0,
    resting: timeLeftRunning === 0,
    distance: (reindeer.distance += reindeer.speed),
  };
}

function rest(reindeer: ReindeerInterface) {
  const timeLeftResting = reindeer.timeLeftResting - 1;
  return {
    ...reindeer,
    timeLeftResting,
    resting: timeLeftResting > 0,
    timeLeftRunning: timeLeftResting === 0 ? reindeer.duration : 0,
  };
}

function handleRoundForReindeer(reindeer: ReindeerInterface) {
  if (reindeer.resting) return rest(reindeer);
  return move(reindeer);
}

async function partA() {
  let reindeers = await loadData(IS_TRAINING);

  for (let round = 0; round < TIME; round += 1) {
    reindeers = reindeers.map(handleRoundForReindeer);
  }

  return reindeers.map((r) => r.distance).sort((a, b) => b - a)[0];
}

async function partB() {
  let reindeers = await loadData(IS_TRAINING);

  for (let round = 0; round < TIME; round += 1) {
    reindeers = reindeers.map(handleRoundForReindeer).sort((a, b) => b.distance - a.distance);
    const [leader] = reindeers;

    reindeers = reindeers.map((r) => ({ ...r, score: r.score + (r.distance === leader.distance ? 1 : 0) }));
  }

  return reindeers.map((r) => r.score).sort((a, b) => b - a)[0];
}

export default [partA, partB];
