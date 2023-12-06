import input from './input.mjs';

console.log(input);
console.log('\n');

const matrix = getMatrixFromString(input);
let sum = 0;

for (let y = 0; y < matrix.length; y++) {
  const row = matrix[y];

  for (let x = 0; x < row.length; x++) {

    let number = '';
    let offset = 0;

    while (x + offset < row.length && isNumber(row[x + offset])) {
      number += row[x + offset];
      offset++;
    };

    x += (offset);

    if (number) {
      console.log(matrix[y - 1]?.join(''));
      console.log(matrix[y]?.join(''));
      console.log(matrix[y + 1]?.join(''));
      const xStart = x - offset;
      const xEnd = x;
      let isPartNumber = false;
      let counter = 0;
      for (let i = y - 1; i <= y + 1; i++) {
        if (i >= 0 && i < matrix.length) {
          for (let j = xStart - 1; j < xEnd + 1; j++) {
            if (j >= 0 && j < row.length) {
              console.log(matrix[i][j])
              counter++
              if (isSymbol(matrix[i][j])) {
                isPartNumber = true;
              }
            }
          }
        }
      }
      console.log(number);
      console.log(`Neighbour count: ${counter}`)
      if (isPartNumber) {
        console.log('is part number!!!!');
        sum += Number.parseInt(number);
      }
      console.log(`Coordinates are X: ${xStart} - ${xEnd}; Y: ${y}`);
      console.log('---');
    }
  }
}

console.log(sum);

function getMatrixFromString(string) {
  return string
    .split('\n')
    .map(line => line.split(''));
}

function isNumber(char) {
  return char.match(/\d/);
}

function isSymbol(char) {
  return (
    char !== '.' &&
    !isNumber(char)
  );
}
