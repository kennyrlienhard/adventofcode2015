import { loadData } from './utils';

async function run(init: { a: number; b: number }) {
  const instructions = await loadData(false);
  const register = { a: init.a, b: init.b };

  let index = 0;

  while (index < instructions.length && index >= 0) {
    const [cmd, registerName, offset] = instructions[index];

    switch (cmd) {
      case 'hlf':
        register[registerName] /= 2;
        index += 1;
        break;
      case 'tpl':
        register[registerName] *= 3;
        index += 1;
        break;
      case 'inc':
        register[registerName] += 1;
        index += 1;
        break;
      case 'jmp':
        index += offset;
        break;
      case 'jie':
        index += register[registerName] % 2 === 0 ? offset : 1;
        break;
      case 'jio':
        index += register[registerName] === 1 ? offset : 1;
        break;
    }
  }

  return register.b;
}

export default [() => run({ a: 0, b: 0 }), () => run({ a: 1, b: 0 })];
