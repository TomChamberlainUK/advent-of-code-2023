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

  let minRed = Number.NEGATIVE_INFINITY;
  let minBlue = Number.NEGATIVE_INFINITY;
  let minGreen = Number.NEGATIVE_INFINITY;

  for (const round of rounds) {
    console.log(round);
    const rolls = round.split(', ');

    for (const roll of rolls) {
      const [_number, colour] = roll.split(' ');
      const number = Number.parseInt(_number);
      switch (colour) {
        case 'red':
          if (number > minRed) minRed = number;
          break;
        case 'green':
          if (number > minGreen) minGreen = number;
          break;
        case 'blue':
          if (number > minBlue) minBlue = number;
          break;
      }
    }
  }

  const power = (minRed * minGreen * minBlue)

  console.log(`minRed: ${minRed}`);
  console.log(`minGreen: ${minGreen}`);
  console.log(`minBlue: ${minBlue}`);
  console.log(`POWER!!!: ${power}`);

  
  // console.log(sumRed, sumGreen, sumBlue);
  // if (
  //   // (sumRed <= maxRed) &&
  //   // (sumGreen <= maxGreen) &&
  //   // (sumBlue <= maxBlue)
  // ) {
  //   console.log(true);
  //   sumId += id;
  // } else {
  //   console.log(false);
  // }
  sumId += power;
  console.log('\n');
}

console.log(sumId);