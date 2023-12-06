import input from './input.mjs';

// const input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

console.log(input);

const matrix = getMatrixFromString(input);

(async function main() {
  try {
    let output = 0;

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (isStar(matrix[y][x])) {
          console.log('STAR!!!');
          const numbers = getSurroundingNumbers({ matrix, x, y });
          console.log(numbers);
          if (numbers.length > 1) {
            const product = numbers.reduce((accumulator, value) => accumulator *= value);
            console.log(product);
            output += product;
          }
        }
      }
    }

    console.log(output);
  } catch (err) {
    console.error(err);
  }
})();

function getMatrixFromString(string) {
  return string
    .split('\n')
    .map(line => line.split(''));
}

function getSurroundingNumbers({ matrix, x, y }) {
  let numbers = [];
  for (let i = y - 1; i <= y + 1; i++) {
    if (i < 0 || i >= matrix.length) continue;
    let alreadyParsedThisNumber = false;
    for (let j = x - 1; j <= x + 1; j++) {
      if (i < 0 || i >= matrix[i].length) continue;
      if (isNumber(matrix[i][j])) {
        if (alreadyParsedThisNumber) continue;
        const fullNumber = getFullNumber({ matrix, x: j, y: i });
        numbers.push(fullNumber);
        alreadyParsedThisNumber = true;
      } else {
        alreadyParsedThisNumber = false;
      }
    }
  }
  return numbers;
}

function getFullNumber({ matrix, x, y }) {
  if (!isNumber(matrix[y][x])) {
    throw new Error(`Coordinates don't point to a number. x: ${x}; y: ${y} points to "${matrix[y][x]}"`);
  }
  let digits = [matrix[y][x]];
  // Get digits before target
  for (let i = x - 1; i >= 0; i--) {
    if (isNumber(matrix[y][i])) {
      digits.unshift(matrix[y][i])
    } else {
      break;
    }
  }
  // Get digits after target
  for (let i = x + 1; i < matrix[y].length; i++) {
    if (isNumber(matrix[y][i])) {
      digits.push(matrix[y][i])
    } else {
      break;
    }
  }
  return Number.parseInt(digits.join(''));
}

function isStar(char) {
  return char === '*';
}

function isNumber(char) {
  return char.match(/\d/);
}
