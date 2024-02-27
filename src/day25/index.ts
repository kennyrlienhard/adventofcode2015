type Code = [number, number, number];

function getNextCode(code: Code): Code {
  const [row, col, value] = code;
  const nextValue = (value * 252533) % 33554393;

  if (row === 0) return [col + 1, 0, nextValue];

  return [row - 1, col + 1, nextValue];
}

async function partOne() {
  const FIRST_CODE = 20151125;

  const TARGET_ROW = 2981;

  const TARGET_COL = 3075;

  let code = [0, 0, FIRST_CODE] as Code;

  while (code[0] !== TARGET_ROW - 1 || code[1] !== TARGET_COL - 1) code = getNextCode(code);

  return code[2];
}

export async function startTwentyFive() {
  return Promise.all([partOne].map((puzzle) => puzzle()));
}
