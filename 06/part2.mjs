import input from './input.mjs';

// const input = `Time:      7  15   30
// Distance:  9  40  200`;

(async function main() {
  try {
    const [time, distance] = parseInput(input);
    console.log(`Time: ${time}`);
    console.log(`Distance: ${distance}`);
    console.log('\n');

    let successCount = 0;

    for (let timeElapsed = 1; timeElapsed < time; timeElapsed++) {
      const speed = timeElapsed;
      const distanceTravelled = (time - timeElapsed) * speed;

      if (distanceTravelled >= distance) {
        successCount++;
      }
    }

    console.log(`Success Count: ${successCount}`);
  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  return input
    .replace(/ +/g, ' ')
    .split('\n')
    .map(line => line
      .split(' ')
      .slice(1)
      .join('')
    ).map(numberString => Number.parseInt(numberString))
}
