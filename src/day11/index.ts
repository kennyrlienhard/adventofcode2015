function incrementPassword(password: string) {
  const result = password.split('');
  let add = 1;

  for (let index = password.length - 1; index >= 0; index -= 1) {
    if (add === 0) break;

    const char = password[index];
    result[index] = char === 'z' ? 'a' : String.fromCharCode(char.charCodeAt(0) + add);
    add = char === 'z' ? 1 : 0;
  }

  return result.join('');
}

function hasValidLetters(password: string) {
  const FORBIDDEN = ['i', 'o', 'l'];
  return FORBIDDEN.filter((c) => password.includes(c)).length === 0;
}

function hasPairs(password: string) {
  let pairs = 0;
  let lastPairIndex = -1;

  for (let i = 1; i < password.length; i += 1) {
    if (password[i] === password[i - 1] && lastPairIndex < i - 1) {
      pairs += 1;
      lastPairIndex = i;
    }
  }

  return pairs >= 2;
}

function hasStraightLetters(password: string) {
  for (let i = 0; i < password.length - 2; i += 1) {
    const a = password[i].charCodeAt(0);
    const b = password[i + 1].charCodeAt(0);
    const c = password[i + 2].charCodeAt(0);

    if (a + 1 === b && b + 1 === c) return true;
  }

  return false;
}

function passwordIsValid(password: string) {
  return hasPairs(password) && hasValidLetters(password) && hasStraightLetters(password);
}

function run(currentPassword: string) {
  let result = currentPassword;

  do {
    result = incrementPassword(result);
  } while (!passwordIsValid(result));

  return result;
}

function partA() {
  return run('hepxcrrq');
}

function partB() {
  return run('hepxxyzz');
}

export default [partA, partB];
