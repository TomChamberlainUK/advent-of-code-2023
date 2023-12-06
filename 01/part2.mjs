import input from './input.mjs';

const lines = input.split('\n');
let sum = 0;

for (const unformattedLine of lines) {
  const line = formatForward(unformattedLine);
  const reverseLine = formatBackward(unformattedLine.split('').reverse().join(''));
  const firstDigit = line.match(/\d/);
  const lastDigit = reverseLine.match(/\d/);
  const number = `${firstDigit}${lastDigit}`;
  console.log(number);
  console.log('\n');
  sum += Number.parseInt(number);
}

console.log(sum);

function formatForward(line) {
  let formattedLine = line;
  const regex = /one|two|three|four|five|six|seven|eight|nine/;
  const match = line.match(regex);
  if (match) {
    switch (match[0]) {
      case 'one': formattedLine = line.replace('one', '1'); break;
      case 'two': formattedLine = line.replace('two', '2'); break;
      case 'three': formattedLine = line.replace('three', '3'); break;
      case 'four': formattedLine = line.replace('four', '4'); break;
      case 'five': formattedLine = line.replace('five', '5'); break;
      case 'six': formattedLine = line.replace('six', '6'); break;
      case 'seven': formattedLine = line.replace('seven', '7'); break;
      case 'eight': formattedLine = line.replace('eight', '8'); break;
      case 'nine': formattedLine = line.replace('nine', '9'); break;
    }
  }
  return formattedLine;
}

function formatBackward(line) {
  let formattedLine = line;
  const regex = /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/;
  const match = line.match(regex);
  if (match) {
    switch (match[0]) {
      case 'eno': formattedLine = line.replace('eno', '1'); break;
      case 'owt': formattedLine = line.replace('owt', '2'); break;
      case 'eerht': formattedLine = line.replace('eerht', '3'); break;
      case 'ruof': formattedLine = line.replace('ruof', '4'); break;
      case 'evif': formattedLine = line.replace('evif', '5'); break;
      case 'xis': formattedLine = line.replace('xis', '6'); break;
      case 'neves': formattedLine = line.replace('neves', '7'); break;
      case 'thgie': formattedLine = line.replace('thgie', '8'); break;
      case 'enin': formattedLine = line.replace('enin', '9'); break;
    }
  }
  return formattedLine;
}
