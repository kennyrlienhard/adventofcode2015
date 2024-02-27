import crypto from 'crypto';

function createHash(value: string) {
  return crypto.createHash('md5').update(value).digest('hex');
}

function isValidHash(hash: string, startsWith: string) {
  return hash.slice(0, startsWith.length) === startsWith;
}

function run(startsWith: string) {
  const IS_TRAINING = false;
  const SECRET = IS_TRAINING ? 'pqrstuv' : 'ckczppom';

  let index = 0;
  let hash = '';

  do {
    index += 1;
    hash = createHash(`${SECRET}${index}`);
  } while (!isValidHash(hash, startsWith));

  return index;
}

function partA() {
  return run('00000');
}

function partB() {
  return run('000000');
}

export default [partA, partB];
