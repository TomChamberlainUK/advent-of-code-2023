import input from './input.mjs';

// const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

(async function main() {
  try {
    console.log(input);
    console.log('\n');

    const cards = input.split('\n');
    let totalPoints = 0;

    for (const card of cards) {
      const { winningNumbers, playingNumbers } = parseNumbers(card);
      let points = 0;

      console.log(`Winning Numbers: ${winningNumbers.join(', ')}`);
      console.log(`Playing Numbers: ${playingNumbers.join(', ')}`);

      for (const number of playingNumbers) {
        if (winningNumbers.includes(number)) {
          points === 0
            ? points = 1
            : points *= 2;
          console.log(`Winner! ${number}`);
        }
      }

      totalPoints += points

      console.log(`Points: ${points}`);
      console.log('---');
    }

    console.log(totalPoints);

  } catch (err) {
    console.error(err);
  }
})();

function parseNumbers(string) {
  const [winningNumbersString, playingNumbersString] = string.replace(/Card \d:/, '').split('|');
  return {
    winningNumbers: winningNumbersString.trim().split(' ').filter(number => number),
    playingNumbers: playingNumbersString.trim().split(' ').filter(number => number)
  }
}