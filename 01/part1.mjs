import input from './input.mjs';

const lines = input.split('\n');
let sum = 0;

for (const line of lines) {
  const reverseLine = line.split('').reverse().join();
  const firstDigit = line.match(/\d/);
  const lastDigit = reverseLine.match(/\d/);
  const number = `${firstDigit}${lastDigit}`;
  console.log(number);
  sum += Number.parseInt(number);
}

console.log(sum);