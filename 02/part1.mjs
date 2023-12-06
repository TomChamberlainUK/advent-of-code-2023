import input from './input.mjs';

const lines = input.split('\n');

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

let id = 0;

let sumId = 0;

for (const unformattedGame of lines) {
  id++;

  console.log(unformattedGame);

  const line = unformattedGame.replace(/Game [\d]+: /, '');
  const rounds = line.split('; ');

  let sumRed = 0;
  let sumBlue = 0;
  let sumGreen = 0;

  let possible = true;

  for (const round of rounds) {
    console.log(round);
    const rolls = round.split(', ');

    for (const roll of rolls) {
      const [number, colour] = roll.split(' ');
      switch (colour) {
        case 'red':
          sumRed += Number.parseInt(number);
          if (number > maxRed) possible = false;
          break;
        case 'green':
          sumGreen += Number.parseInt(number);
          if (number > maxGreen) possible = false;
          break;
        case 'blue':
          sumBlue += Number.parseInt(number);
          if (number > maxBlue) possible = false;
          break;
      }
    }
  }

  
  console.log(sumRed, sumGreen, sumBlue);
  if (
    // (sumRed <= maxRed) &&
    // (sumGreen <= maxGreen) &&
    // (sumBlue <= maxBlue)
    possible
  ) {
    console.log(true);
    sumId += id;
  } else {
    console.log(false);
  }
  console.log('\n');
}

console.log(sumId);