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
    const cardFrequencies = new Array(cards.length).fill(1);

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const { winningNumbers, playingNumbers } = parseNumbers(card);
      let currentCardWins = 0;
      
      console.log(`Card Number: ${i + 1}`);
      console.log(`Card Frequency: ${cardFrequencies[i]}`);
      
      console.log(`Winning Numbers: ${winningNumbers.join(', ')}`);
      console.log(`Playing Numbers: ${playingNumbers.join(', ')}`);
      
      for (const number of playingNumbers) {
        if (winningNumbers.includes(number)) {
          console.log(`Winner! ${number}`);
          currentCardWins++;
        }
      }
      
      console.log(`Current Card Wins: ${currentCardWins}`);
      
      for (let j = 0; j < cardFrequencies[i]; j++) {
        for (let k = 1; k <= currentCardWins; k++) {
          if (cardFrequencies[i + k]) {
            cardFrequencies[i + k]++;
          }
        }
      }
      console.log('---');
    }

    const totalCards = cardFrequencies.reduce((accumulator, value) => accumulator + value);

    console.log(`Total Cards: ${totalCards}`);

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