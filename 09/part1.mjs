import input from './input.mjs';

// const input = `0 3 6 9 12 15
// 1 3 6 10 15 21
// 10 13 16 21 30 45`;

(async function main() {
  try {

    const sequences = parseInput(input);
    console.log(sequences);
    console.log('\n');
    console.log('---');
    console.log('\n');

    let extrapolatedSums = [];

    for (const sequence of sequences) {
      console.log(sequence);
      const differenceSequences = getDifferenceSequences(sequence);
      console.log(differenceSequences.join('\n'));
      console.log('\n');

      differenceSequences[[differenceSequences.length - 1]].push(0)
      
      for (let i = differenceSequences.length - 1; i >= 0; i--) {
        const currentSequence = differenceSequences[i];
        const previousSequence = differenceSequences[i - 1];
        if (!previousSequence) {
          extrapolatedSums.push(currentSequence[currentSequence.length - 1]);
          break;
        };

        console.log('currentSequence', currentSequence);
        console.log('previousSequence', previousSequence);

        previousSequence.push(
          previousSequence[previousSequence.length - 1] + currentSequence[currentSequence.length - 1]
        );
      }

      console.log('\n');
      console.log(differenceSequences.join('\n'));
    }
    const total = extrapolatedSums.reduce((accumulator, value) => accumulator += value);

    console.log(extrapolatedSums.join(', '));
    console.log(total);
    
  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  return input
    .split('\n')
    .map(sequenceString => sequenceString
      .split(' ')
      .map(numberString => Number.parseInt(numberString))
    );
}

function getDifferenceSequences(sequence, differenceSequences = [sequence]) {
  const differences = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    const difference = sequence[i + 1] - sequence[i];
    differences.push(difference);
  }
  differenceSequences.push(differences);
  return differences.every(difference => difference === 0)
    ? differenceSequences
    : getDifferenceSequences(differences, differenceSequences);
}