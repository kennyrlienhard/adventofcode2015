import { loadData, LocationInterface } from './utils';

function getLocations(distances: LocationInterface[], where: string, path: LocationInterface[]) {
  const visitedCities = new Set(path.map((loc) => [loc.from, loc.to]).flat());

  return distances
    .filter((loc) => loc.from === where || loc.to === where)
    .map((loc) => ({ ...loc, from: loc[loc.from === where ? 'from' : 'to'], to: loc[loc.from === where ? 'to' : 'from'] }))
    .filter((loc) => !visitedCities.has(loc.to));
}

async function partA() {
  const data = await loadData(false);

  const cities = new Set(data.map((loc) => [loc.from, loc.to]).flat());

  let shortestDistance = 0;

  function walk(where: string, path: LocationInterface[]) {
    const distance = path.reduce((acc, loc) => acc + loc.distance, 0);
    const visitedCities = new Set(path.map((loc) => [loc.from, loc.to]).flat());

    if (distance < shortestDistance || shortestDistance === 0) {
      if (visitedCities.size === cities.size) {
        shortestDistance = distance;
      } else {
        getLocations(data, where, path).forEach((loc) => walk(loc.to, [...path, loc]));
      }
    }
  }

  cities.forEach((city) => {
    walk(city, []);
  });

  return shortestDistance;
}

async function partB() {
  const data = await loadData(false);

  const cities = new Set(data.map((loc) => [loc.from, loc.to]).flat());

  let longestDistance = 0;

  function walk(where: string, path: LocationInterface[]) {
    const distance = path.reduce((acc, loc) => acc + loc.distance, 0);
    const visitedCities = new Set(path.map((loc) => [loc.from, loc.to]).flat());

    if (visitedCities.size === cities.size && distance > longestDistance) {
      longestDistance = distance;
    } else {
      getLocations(data, where, path).forEach((loc) => walk(loc.to, [...path, loc]));
    }
  }

  cities.forEach((city) => {
    walk(city, []);
  });

  return longestDistance;
}

export default [partA, partB];
