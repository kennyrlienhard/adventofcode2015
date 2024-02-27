const INPUT = '1113222113';

function lookAndSay(input: string) {
  let result = '';
  let sequence = '';

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];

    if (sequence.includes(char)) {
      sequence = `${sequence}${char}`;
    } else {
      if (sequence) result = `${result}${sequence.length}${sequence[0]}`;
      sequence = char;
    }
  }

  if (sequence) result = `${result}${sequence.length}${sequence[0]}`;

  return result;
}

function run(rounds: number) {
  let result = INPUT;

  for (let round = 0; round < rounds; round += 1) {
    result = lookAndSay(result);
  }

  return result.length;
}

function partA() {
  return run(40);
}

function partB() {
  return run(50);
}

export default [partA, partB];
